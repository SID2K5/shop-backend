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
 * UPDATE product (🔥 HISTORY ALWAYS TRACKED)
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const oldQty = Number(product.quantity);
    const newQty = Number(req.body.quantity);

    // ✅ FORCE numeric comparison
    if (!Number.isNaN(newQty) && oldQty !== newQty) {
      product.stockHistory.push({
        previousQty: oldQty,
        newQty: newQty,
        date: new Date(),
      });

      product.quantity = newQty;
    }

    if (req.body.name !== undefined) product.name = req.body.name;
    if (req.body.price !== undefined)
      product.price = Number(req.body.price);
    if (req.body.category !== undefined)
      product.category = req.body.category;

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
