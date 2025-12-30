import Category from "../models/Category.js";

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Private
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error.message);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

/**
 * @desc    Get category by ID
 * @route   GET /api/categories/:id
 * @access  Private
 */
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Get category error:", error.message);
    res.status(400).json({ message: "Invalid category ID" });
  }
};

/**
 * @desc    Create new category
 * @route   POST /api/categories
 * @access  Admin
 */
export const createCategory = async (req, res) => {
  try {
    const name = req.body.name?.trim();

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Normalize name (case-insensitive)
    const exists = await Category.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });

    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      status: req.body.status || "Active",
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("Create category error:", error.message);
    res.status(500).json({ message: "Failed to create category" });
  }
};

/**
 * @desc    Update category (rename / toggle)
 * @route   PUT /api/categories/:id
 * @access  Admin
 */
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (req.body.name !== undefined) {
      category.name = req.body.name.trim();
    }

    if (req.body.status !== undefined) {
      category.status = req.body.status;
    }

    const updated = await category.save();
    res.json(updated);
  } catch (error) {
    console.error("Update category error:", error.message);
    res.status(500).json({ message: "Failed to update category" });
  }
};

/**
 * @desc    Delete category
 * @route   DELETE /api/categories/:id
 * @access  Admin
 */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete category error:", error.message);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
