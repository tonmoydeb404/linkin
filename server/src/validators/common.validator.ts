import { ParamSchema, checkSchema } from "express-validator";
import * as userService from "../services/user.service";

export const usernameSchema: ParamSchema = {
  errorMessage: "Invalid username",
  isLength: {
    options: { min: 3, max: 50 },
    errorMessage:
      "Username should be at least minimum 3 chars & maximum 50 chars",
  },
  custom: {
    options: async (value) => {
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        throw new Error(
          "Username can only contain letters, numbers, and underscores."
        );
      }

      const user = await userService.getByProperty("username", value);
      if (user) throw new Error("Username already in use");
    },
  },
  trim: true,
  toLowerCase: true,
};
export const passwordSchema: ParamSchema = {
  isStrongPassword: {
    errorMessage:
      "Password should be at least 6 chars long and should contain at least 1 lowercase, 1 uppercase, 1 number & 1 special symbol.",
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
  },
};
export const emailSchema: ParamSchema = {
  errorMessage: "Invalid email",
  isEmail: true,
  custom: {
    options: async (value) => {
      const user = await userService.getByProperty("email", value);
      if (user) throw new Error("Email already in use");
    },
  },
};

export const confirmPasswordValidator = checkSchema(
  {
    confirmPassword: {
      notEmpty: {
        errorMessage: "Password is required!",
      },
    },
  },
  ["body"]
);
