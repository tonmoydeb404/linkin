import { checkSchema } from "express-validator";
import socialSites from "../config/social-sites";

export const getSocial = checkSchema(
  {
    social_id: {
      isMongoId: {
        errorMessage: "Invalid social id",
      },
      notEmpty: {
        errorMessage: "Social id is required.",
      },
    },
  },
  ["params"]
);

export const postSocial = checkSchema(
  {
    site: {
      errorMessage: "Invalid social sitename",
      isString: true,
      isIn: {
        options: [socialSites],
        errorMessage: "Social sitename not supported",
      },
    },
    url: {
      errorMessage: "Invalid social URL",
      isURL: true,
    },
  },
  ["body"]
);

export const patchSocial = checkSchema(
  {
    site: {
      errorMessage: "Invalid social sitename",
      optional: true,
      isString: true,
      isIn: {
        options: [socialSites],
        errorMessage: "Social sitename not supported",
      },
    },
    url: {
      errorMessage: "Invalid social URL",
      isURL: true,
      optional: true,
    },
  },
  ["body"]
);
