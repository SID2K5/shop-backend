// src/routes/productRoutes.js
import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products
 */
router.get("/", protect, getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product
 */
router.get("/:id", protect, getProductById);

/**
 * @route   POST /api/products
 * @desc    Create product
 */
router.post("/", protect, createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product
 */
router.put("/:id", protect, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product (safe)
 */
router.delete("/:id", protect, deleteProduct);

export default router;
