import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import axios from 'axios';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase App for server-side persistence
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import fs from 'fs';

const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
let db: any = null;

if (fs.existsSync(firebaseConfigPath)) {
  const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));
  const firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "J-Nexus Professional Payment Gateway" });
  });

  // --- FLUTTERWAVE INTEGRATION ---
  
  app.post("/api/payment/flutterwave/initialize", async (req, res) => {
    const { amount, email, name, productId } = req.body;
    const tx_ref = `NEX-${Date.now()}`;

    try {
      const response = await axios.post("https://api.flutterwave.com/v3/payments", {
        tx_ref,
        amount,
        currency: "USD",
        redirect_url: `${process.env.APP_URL}/payment/verify`,
        customer: { email, name },
        customizations: {
          title: "J-Nexus Health Licensing",
          description: `Access to ${productId}`,
          logo: "https://ais-dev-u623wbyc4jhlkbcpcsri3e-370276376511.europe-west2.run.app/logo.png"
        }
      }, {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
        }
      });

      res.json(response.data);
    } catch (error) {
      console.error("Flutterwave Init Error:", error);
      res.status(500).json({ error: "Failed to initialize payment" });
    }
  });

  // Flutterwave Webhook
  app.post("/api/webhooks/flutterwave", async (req, res) => {
    const signature = req.headers["verif-hash"];
    if (signature !== process.env.FLW_WEBHOOK_SECRET) {
      return res.status(401).send("Unauthorized");
    }

    const { status, tx_ref, amount, id, customer } = req.body;

    if (status === "successful") {
      // 1. Verify transaction with Flutterwave server-side (Double Check)
      try {
        const verifyResponse = await axios.get(`https://api.flutterwave.com/v3/transactions/${id}/verify`, {
          headers: { Authorization: `Bearer ${process.env.FLW_SECRET_KEY}` }
        });

        if (verifyResponse.data.data.status === "successful" && verifyResponse.data.data.amount >= amount) {
          // Extract productId from customizations description if possible, or use meta
          const description = verifyResponse.data.data.meta?.productId || "unknown";

          // 2. Grant Access in DB
          if (db) {
            const ordersRef = collection(db, "orders");
            await addDoc(ordersRef, {
              userId: customer.email, 
              userEmail: customer.email,
              email: customer.email,
              tx_ref,
              amount,
              gateway: "flutterwave",
              status: "verified",
              timestamp: serverTimestamp(),
              verified: true,
              productId: description
            });
          }
          console.log(`[PAYMENT VERIFIED] FLW ID: ${id}`);
        }
      } catch (err) {
        console.error("FLW Webhook Verification Failed:", err);
      }
    }

    res.status(200).send("OK");
  });

  // --- LEMON SQUEEZY INTEGRATION ---

  app.post("/api/payment/lemonsqueezy/create-checkout", async (req, res) => {
    const { productId, email } = req.body;

    try {
      const response = await axios.post("https://api.lemonsqueezy.com/v1/checkouts", {
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: { 
              email,
              custom: { productId }
            }
          },
          relationships: {
            store: { data: { type: "stores", id: process.env.LEMON_SQUEEZY_STORE_ID } },
            variant: { data: { type: "variants", id: productId } }
          }
        }
      }, {
        headers: {
          Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json"
        }
      });

      res.json({ checkout_url: response.data.data.attributes.url });
    } catch (error) {
      console.error("Lemon Squeezy Init Error:", error);
      res.status(500).json({ error: "Failed to create checkout" });
    }
  });

  // Lemon Squeezy Webhook
  app.post("/api/webhooks/lemonsqueezy", async (req, res) => {
    const rawBody = JSON.stringify(req.body);
    const hmac = crypto.createHmac("sha256", process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || "");
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(req.get("x-signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      return res.status(401).send("Unauthorized");
    }

    const { meta, data } = req.body;
    const eventName = meta.event_name;

    if (eventName === "order_created" && data.attributes.status === "paid") {
      const email = data.attributes.user_email;
      const amount = data.attributes.total / 100;
      const productId = meta.custom_data?.productId || data.attributes.variant_id;

      if (db) {
        await addDoc(collection(db, "orders"), {
          email,
          userEmail: email,
          amount,
          gateway: "lemonsqueezy",
          status: "verified",
          timestamp: serverTimestamp(),
          verified: true,
          orderId: data.id,
          productId
        });
      }
      console.log(`[PAYMENT VERIFIED] LEMON ORDER: ${data.id}`);
    }

    res.status(200).send("OK");
  });

  // Access check endpoint
  app.get("/api/access/check", async (req, res) => {
    const { email, productId } = req.query;
    if (!email || !db) return res.status(400).json({ access: false });

    try {
      const ordersRef = collection(db, "orders");
      let q;
      // We check for any verified payment by this email for the specific product 
      // OR if productId is not provided, we check if they have ANY verified payment (general access)
      if (productId) {
        q = query(ordersRef, 
          where("userEmail", "==", email),
          where("status", "==", "verified"),
          where("productId", "==", productId)
        );
      } else {
        q = query(ordersRef, 
          where("userEmail", "==", email),
          where("status", "==", "verified")
        );
      }
      const snapshot = await getDocs(q);
      
      res.json({ access: !snapshot.empty, count: snapshot.size });
    } catch (error) {
      console.error("Access Check Error:", error);
      res.status(500).json({ access: false });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`J-Nexus Health server running on http://localhost:${PORT}`);
  });
}

startServer();
