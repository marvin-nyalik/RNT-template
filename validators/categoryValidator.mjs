import { checkSchema } from "express-validator";

export const categoryValidator = checkSchema({
  name: {
    isString: {
      errorMessage: "Name must be a string",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Name must be at least 3 chars long",
    },
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: "Name must be present",
    },
  },
});
