import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

/*
  Base path: /api/categories
*/

/* ================= GET ================= */

// Get all categories
router.get("/", getCategories);

// Get single category by ID
router.get("/:id", getCategoryById);

/* ================= POST ================= */

// Create category
router.post("/", createCategory);

/* ================= PUT ================= */

// Update category
router.put("/:id", updateCategory);

/* ================= DELETE ================= */

// Delete category
router.delete("/:id", deleteCategory);

export default router;
