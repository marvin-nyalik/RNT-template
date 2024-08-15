import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/products.mjs";
import { productValidator } from "../../validators/productValidator.mjs";
import { upload } from "../middlewares/upload.mjs";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), productValidator, createProduct);
router.patch("/:id", productValidator(true), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
