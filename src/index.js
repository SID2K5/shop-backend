import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Load env vars
dotenv.config();

// Connect DB
connectDB();

// Init app
const app = express();

/* ================= CORS (FINAL LOCK) ================= */
app.use(
  cors({
    origin: "https://shop-frontend-pearl.vercel.app",
    credentials: true,
  })
);

/* ================= MIDDLEWARES ================= */
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Inventory Backend API running 🚀" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Global error handler (safe fallback)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Server Error",
    error: err.message,
  });
});

// Start server (DEPLOYMENT SAFE)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
