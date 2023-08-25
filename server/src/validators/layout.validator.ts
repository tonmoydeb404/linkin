import { checkSchema } from "express-validator";
import { layoutStyles, layoutThemes } from "../models/Layout";

export const patchLayout = checkSchema({
  defaultTheme: {
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
  color: {
    optional: true,
    isHexColor: {
      errorMessage: "Invalid color",
    },
  },
});
