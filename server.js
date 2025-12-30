import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* ====== ALWAYS PARSE JSON ====== */
app.use(express.json());

/* ====== BULLETPROOF CORS ====== */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://inventory-frontend-psi-silk.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* ====== ROUTES ====== */
app.get("/", (req, res) => {
  res.json({ message: "Inventory Backend API running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* ====== START ====== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
