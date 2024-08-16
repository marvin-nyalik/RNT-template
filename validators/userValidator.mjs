import { checkSchema } from "express-validator";
import User from "../models/user.mjs";

const checkEmailExists = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return Promise.reject("Email already in use");
  }
  return true;
};

export const userValidator = () => checkSchema({
  username: {
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: "Username must be present",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Username must be at least 3 chars long",
    },
  },
  email: {
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: "Email must be present",
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
    custom: {
      options: checkEmailExists,
      errorMessage: "Email already in use",
    },
  },
  password: {
    optional: true,
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: "Password must be present",
    },
    isString: {
      errorMessage: "Password must be a string",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 chars long",
    },
  },
  googleId: {
    optional: true,
    isString: {
      errorMessage: "Google ID must be a string",
    },
    custom: {
      options: async (googleId) => {
        const user = await User.findOne({ googleId });
        if (user) {
          return Promise.reject("Google ID already in use");
        }
        return true;
      },
      errorMessage: "Google ID already in use",
    },
  },
  firstName: {
    optional: true,
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: "First name must be present",
    },
    isString: {
      errorMessage: "First name must be a string",
    },
  },
  lastName: {
    optional: true,
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: "Last name must be present",
    },
    isString: {
      errorMessage: "Last name must be a string",
    },
  },
});
