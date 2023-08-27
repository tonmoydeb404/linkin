import { checkSchema } from "express-validator";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "./common.validator";

// register validator
export const postRegister = checkSchema(
  {
    username: usernameSchema,
    password: passwordSchema,
    email: emailSchema,
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

// login validator
export const postLogin = checkSchema(
  {
    email: {
      isEmail: {
        errorMessage: "Invalid email",
      },
      notEmpty: {
        errorMessage: "Email is required",
      },
    },
    password: {
      notEmpty: {
        errorMessage: "Password is required",
      },
    },
  },
  ["body"]
);

// reset password validator
export const putPasswordReset = checkSchema(
  {
    password: passwordSchema,
    token: {
      notEmpty: {
        errorMessage: "Token is required!",
      },
    },
  },
  ["body"]
);

// request for reset password validator
export const postPasswordReset = checkSchema(
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

// verify email validator
export const putEmailVerification = checkSchema(
  {
    token: {
      notEmpty: {
        errorMessage: "Token is required!",
      },
    },
  },
  ["body"]
);
