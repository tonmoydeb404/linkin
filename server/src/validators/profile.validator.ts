import { checkSchema } from "express-validator";
import isImageURL from "image-url-validator";

// profile update validator
export const patchProfile = checkSchema(
  {
    firstName: {
      errorMessage: "Invalid first name",
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage:
          "First name should be at least minimum 3 chars & maximum 50 chars",
      },
      trim: true,
      optional: true,
    },
    lastName: {
      errorMessage: "Invalid last name",
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage:
          "Last name should be at least minimum 3 chars & maximum 50 chars",
      },
      trim: true,
      optional: true,
    },
    avatar: {
      isURL: {
        errorMessage: "Invalid avatar url",
      },
      trim: true,
      optional: true,
      custom: {
        options: (value) => {
          if (!isImageURL(value)) throw new Error("Invalid image url");

          return true;
        },
      },
    },
    bio: {
      errorMessage: "Invalid Bio",
      isLength: {
        options: { min: 10, max: 400 },
        errorMessage:
          "Bio should be at least minimum 10 chars & maximum 400 chars",
      },
      trim: true,
      optional: true,
    },
  },
  ["body"]
);

// profile create validator
export const postProfile = checkSchema(
  {
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
    avatar: {
      isURL: {
        errorMessage: "Invalid avatar url",
      },
      trim: true,
      optional: {
        options: {
          values: "falsy",
        },
      },
      custom: {
        options: (value) => {
          if (!isImageURL(value)) throw new Error("Invalid image url");

          return true;
        },
      },
    },
    bio: {
      errorMessage: "Invalid Bio",
      isLength: {
        options: { min: 10, max: 400 },
        errorMessage:
          "Bio should be at least minimum 10 chars & maximum 400 chars",
      },
      trim: true,
      optional: {
        options: {
          values: "falsy",
        },
      },
    },
  },
  ["body"]
);
