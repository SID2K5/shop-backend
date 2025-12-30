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

/* ================= CORS — MUST BE FIRST ================= */
app.use(
  cors({
    origin: "https://inventory-frontend-psi-silk.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* 🔥 PRE-FLIGHT HANDLER (NO CRASH GUARANTEED) */
app.options("*", (req, res) => {
  res.sendStatus(200);
});

/* ================= BODY PARSER ================= */
app.use(express.json());

/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.json({ message: "Inventory Backend API running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
