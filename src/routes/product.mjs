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
router.patch("/", productValidator, updateProduct);
router.post("/image", upload.single("avatar"), (req, res) => {
  res.json(req.file);
});
router.delete("/:id", deleteProduct);

export default router;
