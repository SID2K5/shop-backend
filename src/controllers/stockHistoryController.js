import Product from "../models/Product.js";

/**
 * @desc   Add stock history entry when product quantity changes
 * @route  POST /api/stock-history/:productId
 * @access Private
 */
export const addStockHistory = async (req, res) => {
  try {
    const { productId } = req.params;
    const { newQty } = req.body;

    if (newQty === undefined) {
      return res.status(400).json({ message: "New quantity is required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const previousQty = product.quantity;

    // Push history entry
    product.stockHistory.push({
      previousQty,
      newQty,
      date: new Date(),
    });

    // Update product quantity
    product.quantity = newQty;

    await product.save();

    res.status(200).json({
      message: "Stock history updated successfully",
      product,
    });
  } catch (error) {
    console.error("Stock history error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get stock history for a product
 * @route  GET /api/stock-history/:productId
 * @access Private
 */
export const getStockHistoryByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).select(
      "name stockHistory"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      product: product.name,
      history: product.stockHistory,
    });
  } catch (error) {
    console.error("Fetch stock history error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
