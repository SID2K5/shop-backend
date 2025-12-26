import Product from "../models/Product.js";
import Category from "../models/Category.js";

/**
 * GET /api/dashboard
 * Protected
 */
export const getDashboardData = async (req, res) => {
  try {
    // ---------------------------
    // Fetch active categories (IDs)
    // ---------------------------
    const activeCategories = await Category.find({ status: "Active" }).select("_id");
    const activeCategoryIds = activeCategories.map(c => c._id);

    // ---------------------------
    // Fetch products in active categories
    // ---------------------------
    const products = await Product.find({
      category: { $in: activeCategoryIds },
    });

    // ---------------------------
    // Snapshot stats
    // ---------------------------
    const totalProducts = products.length;

    const lowStock = products.filter(
      p => p.quantity > 0 && p.quantity <= 5
    ).length;

    const outOfStock = products.filter(
      p => p.quantity === 0
    ).length;

    const inventoryValue = products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    // ---------------------------
    // Today calculations
    // ---------------------------
    const today = new Date().toDateString();

    let unitsSoldToday = 0;
    let revenueToday = 0;
    const salesByProduct = {};
    const todayActivity = [];

    products.forEach(product => {
      product.stockHistory?.forEach(entry => {
        if (new Date(entry.date).toDateString() === today) {

          // SOLD
          if (entry.newQty < entry.previousQty) {
            const sold = entry.previousQty - entry.newQty;

            unitsSoldToday += sold;
            revenueToday += sold * product.price;

            salesByProduct[product.name] =
              (salesByProduct[product.name] || 0) + sold;

            todayActivity.push({
              product: product.name,
              type: "Sold",
              qty: sold,
              time: new Date(entry.date).toLocaleTimeString(),
              color: "bg-red-500",
            });
          }

          // STOCK ADDED
          if (entry.newQty > entry.previousQty) {
            todayActivity.push({
              product: product.name,
              type: "Stock Added",
              qty: entry.newQty - entry.previousQty,
              time: new Date(entry.date).toLocaleTimeString(),
              color: "bg-green-500",
            });
          }

          // LOW STOCK
          if (entry.newQty <= 5) {
            todayActivity.push({
              product: product.name,
              type: "Low Stock",
              qty: entry.newQty,
              time: new Date(entry.date).toLocaleTimeString(),
              color: "bg-yellow-500",
            });
          }
        }
      });
    });

    // ---------------------------
    // Chart data
    // ---------------------------
    const salesChart = Object.entries(salesByProduct).map(
      ([name, qty]) => ({ name, qty })
    );

    // ---------------------------
    // Final response
    // ---------------------------
    res.status(200).json({
      snapshot: {
        totalProducts,
        lowStock,
        outOfStock,
        inventoryValue,
      },
      todaySales: {
        units: unitsSoldToday,
        revenue: revenueToday,
        chartData: salesChart,
      },
      todayActivity: todayActivity.slice(-6).reverse(),
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Dashboard data fetch failed" });
  }
};
