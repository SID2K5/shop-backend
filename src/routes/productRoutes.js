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
 * @access  Private
 */
router.get("/", protect, getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product (WITH stockHistory)
 * @access  Private
 */
router.get("/:id", protect, getProductById);

/**
 * @route   POST /api/products
 * @desc    Create product
 * @access  Private
 */
router.post("/", protect, createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product + track stock history
 * @access  Private
 */
router.put("/:id", protect, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Private
 */
router.delete("/:id", protect, deleteProduct);

export default router;
