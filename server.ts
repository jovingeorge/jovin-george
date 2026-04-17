import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "J-Nexus Health" });
  });

  // PayPal Mock Order Endpoint
  app.post("/api/create-paypal-order", async (req, res) => {
    const { amount, product } = req.body;
    
    // In a real app, you'd use the PayPal SDK here
    // For now, we simulate a successful order ID generation
    const orderId = "PP-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    res.json({ 
      orderId,
      status: "CREATED",
      message: "PayPal order initiated successfully",
      links: [
        { rel: "approve", href: "https://www.paypal.com/checkoutnow?token=" + orderId }
      ]
    });
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
