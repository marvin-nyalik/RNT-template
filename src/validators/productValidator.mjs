import { checkSchema } from "express-validator";
import Category from "../models/category.mjs";

const checkCategoryExists = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    return Promise.reject("Category does not exist");
  }
  return true;
};

export const productValidator = checkSchema({
  name: {
    escape: true,
    trim: true,
    required: true,
    notEmpty: {
      errorMessage: "Name must be present",
    },
    isString: {
      errorMessage: "Name must be a string",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Name must be at least 3 chars long",
    },
  },
  price: {
    required: true,
    notEmpty: {
      errorMessage: "Price must be set",
    },
    isNumeric: {
      errorMessage: "Price must be a number",
    },
    isFloat: {
      options: { min: 0 },
      errorMessage: "Price must be a positive number",
    },
    toFloat: true,
  },
  stockThreshold: {
    required: true,
    notEmpty: {
      errorMessage: "Stock threshold must be set",
    },
    isNumeric: {
      errorMessage: "Stock threshold must be a number",
    },
    isFloat: {
      options: { min: 10 },
      errorMessage: "Stock threshold must be a positive number",
    },
    toFloat: true,
  },
  quantity: {
    required: true,
    notEmpty: {
      errorMessage: "Quantity must be set",
    },
    isNumeric: {
      errorMessage: "Quantity must be a number",
    },
    isInt: {
      options: { min: 0 },
      errorMessage: "Quantity must be a positive whole number",
    },
    toInt: true,
  },
  description: {
    escape: true,
    trim: true,
    required: true,
    notEmpty: {
      errorMessage: "Description must be present",
    },
    isString: {
      errorMessage: "Description must be a string",
    },
    isLength: {
      options: { max: 500 },
      errorMessage: "Description cannot exceed 500 chars",
    },
  },
  category: {
    required: true,
    notEmpty: {
      errorMessage: "Category must be present",
    },
    custom: {
      options: checkCategoryExists,
      errorMessage: "Invalid/Non-existent category",
    },
  },
});
