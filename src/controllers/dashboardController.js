import Product from "../models/Product.js";
import Category from "../models/Category.js";

/**
 * GET /api/dashboard
 * Protected
 */
export const getDashboardData = async (req, res) => {
  try {
    // 1️⃣ Get ACTIVE category IDs
    const activeCategories = await Category.find({ status: "Active" }).select("_id");
    const activeCategoryIds = activeCategories.map(c => c._id);

    // 2️⃣ Get products belonging to those categories
    const products = await Product.find({
      category: { $in: activeCategoryIds },
    });

    // 3️⃣ Snapshot stats
    const totalProducts = products.length;

    const lowStock = products.filter(
      p => p.quantity > 0 && p.quantity < 5
    ).length;

    const outOfStock = products.filter(p => p.quantity === 0).length;

    const inventoryValue = products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    // 4️⃣ Today stats
    const todayStr = new Date().toDateString();

    let unitsSoldToday = 0;
    let revenueToday = 0;
    const salesByProduct = {};
    const todayActivity = [];

    for (const product of products) {
      for (const entry of product.stockHistory || []) {
        if (new Date(entry.date).toDateString() !== todayStr) continue;

        // Sold
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

        // Stock added
        if (entry.newQty > entry.previousQty) {
          todayActivity.push({
            product: product.name,
            type: "Stock Added",
            qty: entry.newQty - entry.previousQty,
            time: new Date(entry.date).toLocaleTimeString(),
            color: "bg-green-500",
          });
        }

        // Low stock warning
        if (entry.newQty > 0 && entry.newQty < 5) {
          todayActivity.push({
            product: product.name,
            type: "Low Stock",
            qty: entry.newQty,
            time: new Date(entry.date).toLocaleTimeString(),
            color: "bg-yellow-500",
          });
        }
      }
    }

    // 5️⃣ Chart
    const salesChart = Object.entries(salesByProduct).map(
      ([name, qty]) => ({ name, qty })
    );

    // 6️⃣ Response
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
