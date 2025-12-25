import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/dashboard
 * @desc    Get dashboard statistics
 * @access  Private
 */
router.get("/", protect, getDashboardData);

export default router;
