import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
  Base path: /api/categories
*/

/* ================= GET ================= */

// Get all categories
router.get("/", protect, getCategories);

// Get single category by ID
router.get("/:id", protect, getCategoryById);

/* ================= POST ================= */

// Create category (Admin only)
router.post("/", protect, admin, createCategory);

/* ================= PUT ================= */

// Update category (Admin only)
router.put("/:id", protect, admin, updateCategory);

/* ================= DELETE ================= */

// Delete category (Admin only)
router.delete("/:id", protect, admin, deleteCategory);

export default router;
