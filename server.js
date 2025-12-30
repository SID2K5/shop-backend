import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* ================= CORE ================= */
app.use(express.json());

/* ================= CORS (FINAL & CORRECT) ================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://inventory-frontend-psi-silk.vercel.app",
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

/* 🔥 CRITICAL: PREFLIGHT MUST RETURN 200 */
app.options("*", (req, res) => {
  res.sendStatus(200);
});

/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.json({ message: "Inventory Backend API running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* ================= START ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
