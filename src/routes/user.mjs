import { Router } from "express";
import {
  getUsers,
  getUserById,
  registerUser,
  deleteUser,
} from "../controllers/users.mjs";
import { userValidator } from "../../validators/userValidator.mjs";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/signup", userValidator, registerUser);
router.delete("/delete-account/:id", deleteUser);

export default router;
