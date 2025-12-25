import express from "express";
import {
  addStockHistory,
  getStockHistoryByProduct,
} from "../controllers/stockHistoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
  @route   POST /api/stock-history
  @desc    Add stock history entry (sell / add stock)
  @access  Private
*/
router.post("/", protect, addStockHistory);

/*
  @route   GET /api/stock-history/:productId
  @desc    Get stock history for a specific product
  @access  Private
*/
router.get("/:productId", protect, getStockHistoryByProduct);

export default router;
