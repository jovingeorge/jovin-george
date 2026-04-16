import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Stripe initialization (Lazy)
  let stripe: Stripe | null = null;
  const getStripe = () => {
    if (!stripe && process.env.STRIPE_SECRET_KEY) {
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
    return stripe;
  };

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "J-Nexus Health" });
  });

  // Mock PaymentIntent for demo purposes
  app.post("/api/create-payment-intent", async (req, res) => {
    const { amount, tier } = req.body;
    
    try {
      const stripeClient = getStripe();
      if (stripeClient) {
        const paymentIntent = await stripeClient.paymentIntents.create({
          amount: amount * 100, // amount in cents
          currency: 'usd',
          metadata: { tier },
        });
        res.json({ clientSecret: paymentIntent.client_secret });
      } else {
        // Fallback for demo if no key provided
        res.json({ 
          clientSecret: "demo_secret_" + Math.random().toString(36).substring(7),
          message: "Demo mode: STRIPE_SECRET_KEY not configured" 
        });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
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
