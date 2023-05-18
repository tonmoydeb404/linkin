import { checkSchema } from "express-validator";
import * as userService from "../services/user";

export const register = checkSchema(
  {
    username: {
      errorMessage: "Invalid username",
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage:
          "Username should be at least minimum 3 chars & maximum 50 chars",
      },
      custom: {
        options: async (value) => {
          const user = await userService.getUserByProperty("username", value);
          if (user) throw new Error("Username already in use");
        },
      },
      trim: true,
    },
    password: {
      isLength: {
        options: { min: 6 },
        errorMessage: "Passoword should be at least 6 chars long",
      },
    },
    email: {
      errorMessage: "Invalid email",
      isEmail: true,
      custom: {
        options: async (value) => {
          const user = await userService.getUserByProperty("email", value);
          if (user) throw new Error("Email already in use");
        },
      },
    },
    firstName: {
      errorMessage: "Invalid first name",
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage:
          "First name should be at least minimum 3 chars & maximum 50 chars",
      },
      trim: true,
    },
    lastName: {
      errorMessage: "Invalid last name",
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage:
          "Last name should be at least minimum 3 chars & maximum 50 chars",
      },
      trim: true,
    },
  },
  ["body"]
);

export const login = checkSchema(
  {
    email: {
      errorMessage: "Invalid email",
      isEmail: true,
    },
  },
  ["body"]
);
