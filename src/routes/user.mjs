import { Router } from "express";
import {
  getUsers,
  getUserById,
  registerUser,
  deleteUser,
} from "../controllers/users.mjs";
import { userValidator } from "../validators/userValidator.mjs";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", registerUser);
router.delete("/delete-account/:id", deleteUser);

export default router;
