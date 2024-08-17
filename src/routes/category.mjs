import { Router } from "express";
import { categoryValidator } from "../validators/categoryValidator.mjs";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
} from "../controllers/categories.mjs";

const router = Router();

router.post("/", categoryValidator, createCategory);
router.patch("/:id", categoryValidator, updateCategory);
router.delete("/:id", deleteCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);

export default router;
