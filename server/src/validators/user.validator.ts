import { checkSchema } from "express-validator";
import { isValidObjectId } from "mongoose";
import { userRoles } from "../models/User";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "./common.validator";

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
    email: emailSchema,
    role: {
      optional: true,
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
      ...usernameSchema,
      optional: true,
    },
    email: {
      ...emailSchema,
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

export const postEmailVerification = checkSchema(
  {
    token: {
      notEmpty: {
        errorMessage: "Token is required!",
      },
    },
  },
  ["body"]
);
