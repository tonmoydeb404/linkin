import { ParamSchema, checkSchema } from "express-validator";
import { isValidObjectId } from "mongoose";
import { userRoles } from "../models/User";
import * as userService from "../services/user";

const usernameSchema: ParamSchema = {
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

      const user = await userService.getUserByProperty("username", value);
      if (user) throw new Error("Username already in use");
    },
  },
  trim: true,
  toLowerCase: true,
};
const passwordSchema: ParamSchema = {
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
    username: usernameSchema,
    password: passwordSchema,
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

export const putPassword = checkSchema(
  {
    old_password: {
      exists: {
        errorMessage: "Old password is required!",
      },
    },
    new_password: passwordSchema,
  },
  ["body"]
);

export const putUsername = checkSchema(
  {
    username: usernameSchema,
    password: {
      exists: {
        errorMessage: "Old password is required!",
      },
      trim: true,
    },
  },
  ["body"]
);
