import { checkSchema } from "express-validator";

export const categoryValidator = checkSchema({
  name: {
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: "Name must be present",
    },
    isString: {
      errorMessage: "Name must be a string",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Name must be at least 3 chars long",
    },
  },
  description: {
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: "description must be present",
    },
    isString: {
      errorMessage: "description must be a string",
    },
    isLength: {
      options: { min: 5 },
      errorMessage: "description must be at least 3 chars long",
    },
  },
});
