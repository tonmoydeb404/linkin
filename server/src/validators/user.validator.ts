import { checkSchema } from "express-validator";
import { isValidObjectId } from "mongoose";
import { userRoles, userVerifiedStatus } from "../models/User";
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
        errorMessage: "Invalid roles.",
      },
    },
    verifiedStatus: {
      optional: true,
      isIn: {
        options: [userVerifiedStatus],
        errorMessage: "Invalid verified status.",
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
      notEmpty: {
        errorMessage: "user role is required.",
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
      notEmpty: {
        errorMessage: "Old password is required!",
      },
    },
  },
  ["body"]
);

export const putVerifiedStatus = checkSchema(
  {
    verified_status: {
      notEmpty: {
        errorMessage: "verification status is required.",
      },
      isIn: {
        options: [userVerifiedStatus],
        errorMessage: "Invalid verification status",
      },
    },
  },
  ["body"]
);
