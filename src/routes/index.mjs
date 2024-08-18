import { Router } from "express";
import categoryRouter from "./category.mjs";
import productRouter from "./product.mjs";
import userRouter from "./user.mjs";
import authRouter from "./auth.mjs";

const router = Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
