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
 * GET all products (✅ populate category)
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
 * UPDATE product (stock history preserved)
 */
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (
    typeof req.body.quantity === "number" &&
    req.body.quantity !== product.quantity
  ) {
    product.stockHistory.push({
      previousQty: product.quantity,
      newQty: req.body.quantity,
      date: new Date(),
    });
  }

  Object.assign(product, req.body);

  const updated = await product.save();
  res.json(updated);
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
