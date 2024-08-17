import User from "../models/user.mjs";
import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcrypt";
import { hashPassword, comparePassword } from "../utils/helpers.mjs";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const data = matchedData(req);
  console.log(data)
  try {
    if (data.password) data.password = hashPassword(data.password)
    const user = await User.create(data);
    if (!user) return res.status(403).json({ message: "Forbidden" });

    const userResponse = {
      username: user.username,
      email: user.email,
    };

    return res.status(201).json(userResponse);
  } catch (error) {
    console.log("Error registering user: ", error);
    res
      .status(500)
      .json({ message: "A server error prevented registration", error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0)
      return res.status(404).json({ message: "No users found" });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "A server error prevented fetching users", error });
  }
};
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error getting user by id:", error);

    return res
      .status(500)
      .json({ message: "A server error prevented fetching the user" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User account has been deleted" });
  } catch (error) {
    console.error("Error deleting user account:", error);

    return res
      .status(500)
      .json({ message: "A server error prevented account deletion", error });
  }
};
