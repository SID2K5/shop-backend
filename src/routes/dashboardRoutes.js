import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";

const router = express.Router();

/**
 * @route   GET /api/dashboard
 * @desc    Get dashboard statistics
 * @access  Public
 */
router.get("/", getDashboardData);

export default router;
