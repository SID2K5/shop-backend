import Product from "../models/Product.js";

/**
 * CREATE product
 */
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET all products
 */
export const getProducts = async (req, res) => {
  const products = await Product.find()
    .populate("category", "name")
    .sort({ createdAt: -1 });

  res.json(products);
};

/**
 * GET product by ID
 */
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name"
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

/**
 * UPDATE product (✅ SINGLE SOURCE OF TRUTH for stock history)
 */
export const updateProduct = async (req, res) => {
  try {
    const { name, price, quantity, category } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Track quantity change
    if (
      quantity !== undefined &&
      Number(quantity) !== Number(product.quantity)
    ) {
      product.stockHistory.push({
        previousQty: product.quantity,
        newQty: quantity,
      });

      product.quantity = quantity;
    }

    // Update remaining fields safely
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE product
 */
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();
  res.json({ message: "Product deleted successfully" });
};
