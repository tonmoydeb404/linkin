import { checkSchema } from "express-validator";
import { isValidObjectId } from "mongoose";
import { verifyToken } from "../helpers/token";
import * as userService from "../services/user";
import { passwordSchema } from "./common.validator";

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

export const postPasswordReset = checkSchema(
  {
    password: passwordSchema,
    token: {
      notEmpty: {
        errorMessage: "Token is required!",
      },
      custom: {
        options: async (value, { req }) => {
          try {
            // verify the token
            const payload = verifyToken(value);
            // check payload is a valid object id or not
            if (
              typeof payload !== "object" ||
              !payload?.id ||
              !isValidObjectId(payload.id)
            ) {
              throw new Error("Invalid token payload");
            }

            // check for the user
            const user = userService.getUserByProperty("_id", payload.id);
            if (!user) throw new Error("User not exists!");

            // assign id to the req token
            req.body.id = payload.id;
            return true;
          } catch (error) {
            throw new Error("Invalid token");
          }
        },
      },
    },
  },
  ["body"]
);

export const postPasswordResetRequest = checkSchema(
  {
    email: {
      notEmpty: {
        errorMessage: "Email address is required",
      },
      isEmail: {
        errorMessage: "Enter a valid email address!",
      },
    },
  },
  ["body"]
);
