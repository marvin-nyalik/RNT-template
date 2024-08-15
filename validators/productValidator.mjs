import { checkSchema } from "express-validator";
import Category from "../src/models/category.mjs";

const checkCategoryExists = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    return Promise.reject("Category does not exist");
  }
  return true;
};

export const productValidator = (isUpdate = false) => checkSchema({
  name: {
    escape: true,
    trim: true,
    optional: isUpdate,
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
    optional: isUpdate,
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
  quantity: {
    optional: isUpdate,
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
    optional: isUpdate,
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
    optional: isUpdate,
    notEmpty: {
      errorMessage: "Category must be present",
    },
    custom: {
      options: checkCategoryExists,
      errorMessage: "Invalid/Non-existent category",
    },
  },
});
