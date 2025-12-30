import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get("/", getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product
 * @access  Public
 */
router.get("/:id", getProductById);

/**
 * @route   POST /api/products
 * @desc    Create product
 * @access  Public
 */
router.post("/", createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product
 * @access  Public
 */
router.put("/:id", updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Public
 */
router.delete("/:id", deleteProduct);

export default router;
