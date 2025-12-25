import Category from "../models/Category.js";

/**
 * GET all categories
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

/**
 * GET category by ID
 */
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch {
    res.status(400).json({ message: "Invalid category ID" });
  }
};

/**
 * CREATE category
 */
export const createCategory = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const status = req.body.status || "Active";

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name, status });
    res.status(201).json(category);
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
};

/**
 * UPDATE category (TOGGLE WORKS)
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
    console.error("Update category error:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

/**
 * DELETE category
 */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();
    res.json({ message: "Category deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete category" });
  }
};
