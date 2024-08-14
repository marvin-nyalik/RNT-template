import { Router } from "express";
import categoryRouter from "./category.mjs";
import productRouter from "./product.mjs";

const router = Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);

export default router;
