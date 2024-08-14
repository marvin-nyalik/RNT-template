import Category from "../models/category.mjs";
import { validationResult, matchedData } from "express-validator";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, unable to fetch categories." });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, unable to fetch the category." });
  }
};

export const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);

  try {
    const category = await Category.create(data);
    return res.status(201).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, unable to create the category." });
  }
};

export const updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const allowedFields = ["name", "description"];
  const data = matchedData(req);

  const validUpdateOperation = Object.keys(data).every((key) =>
    allowedFields.includes(key)
  );

  if (!validUpdateOperation) {
    return res
      .status(400)
      .json({ message: "Invalid fields in update operation." });
  }

  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    Object.keys(data).forEach((key) => (category[key] = data[key]));
    await category.save();

    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, unable to update the category." });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res
      .status(200)
      .json({ message: "Category deleted successfully.", category });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, unable to delete the category." });
  }
};
