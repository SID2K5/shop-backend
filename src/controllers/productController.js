import Product from "../models/Product.js";

/**
 * CREATE PRODUCT
 */
export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, category } = req.body;

    const product = await Product.create({
      name,
      price,
      quantity,
      category,
      stockHistory: [
        {
          previousQty: 0,
          newQty: quantity,
          date: new Date(),
        },
      ],
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET ALL PRODUCTS
 */
export const getProducts = async (req, res) => {
  const products = await Product.find()
    .populate("category", "name")
    .sort({ createdAt: -1 });

  res.json(products);
};

/**
 * GET PRODUCT BY ID (FOR HISTORY MODAL)
 */
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name");

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

/**
 * UPDATE PRODUCT (TRACK HISTORY HERE)
 */
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (
    req.body.quantity !== undefined &&
    req.body.quantity !== product.quantity
  ) {
    product.stockHistory.push({
      previousQty: product.quantity,
      newQty: req.body.quantity,
      date: new Date(),
    });
  }

  product.name = req.body.name ?? product.name;
  product.price = req.body.price ?? product.price;
  product.quantity = req.body.quantity ?? product.quantity;
  product.category = req.body.category ?? product.category;

  await product.save();
  res.json(product);
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
