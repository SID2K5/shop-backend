import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


/* ================= ENV ================= */
dotenv.config();

/* ================= DB ================= */
connectDB();

/* ================= APP ================= */
const app = express();

/* ================= CORS (FINAL – DEV + PROD SAFE) ================= */
const allowedOrigins = [
  "https://shop-frontend-pearl.vercel.app", // production frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server & tools (Postman, curl)
      if (!origin) return callback(null, true);

      // Allow all localhost ports
      if (origin.startsWith("http://localhost")) {
        return callback(null, true);
      }

      // Allow production frontend
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/* ================= MIDDLEWARES ================= */
app.use(express.json());

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.json({ message: "Inventory Backend API running 🚀" });
});

/* ================= API ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);


/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    message: err.message || "Server Error",
  });
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
