import Product from "../models/product.mjs";
import { validationResult, matchedData } from "express-validator";
import { sendStockAlert } from "../utils/alerts.mjs";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return res.status(404).json({ message: "No products were found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error prevented products from being fetched" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json(product);
  } catch (error) {
    console.log("Error fetching product by id:", error);

    return res
      .status(500)
      .json({ message: "An error prevented the operation" });
  }
};

export const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const data = matchedData(req);
  if (req.file) {
    data.image = req.file.path;
  } else {
    return res.status(400).json({ message: "Image is required" });
  }
  try {
    const product = await Product.create(data);
    if (!product) return res.status(403).json({ message: "Forbidden" });
    return res.status(201).json(product);
  } catch (error) {
    console.log("Error creating product ", error);
    return res.status(500).json({
      message: "A server error prevented this product from being added",
    });
  }
};

export const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const data = matchedData(req);
  const allowedFields = [
    "name",
    "price",
    "quantity",
    "description",
    "category",
  ];

  const isValidUpdateOperation = Object.keys(data).every((key) =>
    allowedFields.includes(key)
  );

  if (!isValidUpdateOperation)
    return res.status(403).json({ message: "Invalid update operation" });

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.keys(data).forEach((key) => {
      product[key] = data[key];
    });
    await product.save();

    res.status(200).json({ Message: "Product has been updated", product });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "A server error occurred", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product has been deleted", product });
  } catch (error) {
    console.error("Error deleting product:", error);

    return res
      .status(500)
      .json({ message: "A server error prevented deletion", error });
  }
};

export const updateProductQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantityChange, action } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (action === "add") {
      product.quantity += Math.abs(quantityChange);
    } else if (action === "sell") {
      product.quantity -= Math.abs(quantityChange);
      if (product.quantity < 0) {
        return res
          .status(400)
          .json({ message: "Insufficient quantity to actualize the sale" });
      }
    } else {
      return res.status(400).json({ message: "Invalid stock update action" });
    }
    if (product.quantity < product.stockThreshold) {
      sendStockAlert(product);
    }
    await product.save();
    return res
      .status(200)
      .json({ message: "Product quantity updated successfully", product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "A server error occurred", error: error.message });
  }
};
