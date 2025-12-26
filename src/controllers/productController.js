import Product from "../models/Product.js";

/**
 * CREATE PRODUCT
 */
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET ALL PRODUCTS
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🔥 GET PRODUCT BY ID (FOR HISTORY MODAL)
 */
export const getProductById = async (req, res) => {
  try {
    console.log("📦 FETCH PRODUCT HISTORY", req.params.id);

    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .lean(); // IMPORTANT

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ensure history always exists
    product.stockHistory = product.stockHistory || [];

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🔥 UPDATE PRODUCT (TRACK STOCK HISTORY)
 */
export const updateProduct = async (req, res) => {
  try {
    console.log("🔥 UPDATE PRODUCT HIT", req.params.id, req.body);

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔥 TRACK STOCK CHANGE
    if (
      req.body.quantity !== undefined &&
      req.body.quantity !== product.quantity
    ) {
      product.stockHistory.push({
        previousQty: product.quantity,
        newQty: req.body.quantity
      });
    }

    product.name = req.body.name ?? product.name;
    product.price = req.body.price ?? product.price;
    product.quantity = req.body.quantity ?? product.quantity;
    product.category = req.body.category ?? product.category;

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
