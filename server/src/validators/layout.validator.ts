import { checkSchema } from "express-validator";
import { layoutStyles, layoutThemes } from "../models/Layout";

// update layout validator
export const patchLayout = checkSchema({
  theme: {
    optional: true,
    isIn: {
      options: [layoutThemes],
      errorMessage: "Invalid theme",
    },
  },
  style: {
    optional: true,
    isIn: {
      options: [layoutStyles],
      errorMessage: "Invalid style",
    },
  },
  primaryColor: {
    optional: true,
    isHexColor: {
      if: (value: null) => value !== null,
      errorMessage: "Invalid color",
    },
  },
  contentColor: {
    optional: true,
    isHexColor: {
      if: (value: null) => value !== null,
      errorMessage: "Invalid color",
    },
  },
});

// create layout validator
export const postLayout = checkSchema({
  theme: {
    optional: true,
    isIn: {
      options: [layoutThemes],
      errorMessage: "Invalid theme",
    },
  },
  style: {
    optional: true,
    isIn: {
      options: [layoutStyles],
      errorMessage: "Invalid style",
    },
  },
  primaryColor: {
    optional: true,
    isHexColor: {
      if: (value: null) => value !== null,
      errorMessage: "Invalid color",
    },
  },
  contentColor: {
    optional: true,
    isHexColor: {
      if: (value: null) => value !== null,
      errorMessage: "Invalid color",
    },
  },
});
