// src/routes/stockHistoryRoutes.js
import express from "express";
import {
  addStockHistory,
  getStockHistoryByProduct,
} from "../controllers/stockHistoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
  @route   POST /api/stock-history/:productId
  @desc    Add stock history entry
  @access  Private
*/
router.post("/:productId", protect, addStockHistory);

/*
  @route   GET /api/stock-history/:productId
  @desc    Get stock history for a specific product
  @access  Private
*/
router.get("/:productId", protect, getStockHistoryByProduct);

export default router;
