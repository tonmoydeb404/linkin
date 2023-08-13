import { checkSchema } from "express-validator";
import { isValidObjectId } from "mongoose";
import { userRoles } from "../models/User";
import * as userService from "../services/user";

export const getUser = checkSchema(
  {
    user_id: {
      custom: {
        options: (value) => {
          if (!isValidObjectId(value)) {
            throw new Error("Invalid user id");
          }
          return true;
        },
      },
      isString: true,
    },
  },
  ["params"]
);

export const postUser = checkSchema(
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
      toLowerCase: true,
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
    role: {
      optional: true,
      isLength: {
        options: { min: 1 },
        errorMessage: "User role should be at least 1 character long",
      },
      isIn: {
        options: [userRoles],
        errorMessage: "Invalid roles",
      },
    },
  },
  ["body"]
);

export const patchUser = checkSchema(
  {
    username: {
      errorMessage: "Invalid username",
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage:
          "Username should be at least minimum 3 chars & maximum 50 chars",
      },
      toLowerCase: true,
      custom: {
        options: async (value) => {
          const user = await userService.getUserByProperty("username", value);
          if (user) throw new Error("Username already in use");
        },
      },
      trim: true,
      optional: true,
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
      optional: true,
    },
  },
  ["body"]
);

export const putUserRole = checkSchema(
  {
    role: {
      exists: {
        errorMessage: "user role is required.",
      },
      isLength: {
        options: { min: 1 },
        errorMessage: "User role should be at least 1 character long",
      },
      isIn: {
        options: [userRoles],
        errorMessage: "Invalid role",
      },
    },
  },
  ["body"]
);
