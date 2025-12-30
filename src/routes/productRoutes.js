import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Private
 */
router.get("/", protect, getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product
 * @access  Private
 */
router.get("/:id", protect, getProductById);

/**
 * @route   POST /api/products
 * @desc    Create product
 * @access  Admin
 */
router.post("/", protect, admin, createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product
 * @access  Admin
 */
router.put("/:id", protect, admin, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Admin
 */
router.delete("/:id", protect, admin, deleteProduct);

export default router;
