import { checkSchema } from "express-validator";
import * as linkService from "../services/link.service";

export const getLink = checkSchema(
  {
    link_id: {
      isMongoId: {
        errorMessage: "Invalid link id",
      },
      notEmpty: {
        errorMessage: "Link id is required.",
      },
    },
  },
  ["params"]
);

export const postLink = checkSchema(
  {
    title: {
      isString: true,
      trim: true,
      isLength: {
        options: { min: 3 },
        errorMessage: "Title should be at least 3 chars long",
      },
    },
    slug: {
      errorMessage: "Invalid slug",
      optional: {
        options: {
          values: "falsy",
        },
      },
      trim: true,
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage:
          "Slug should be at least minimum 3 chars & maximum 50 chars",
      },
      custom: {
        options: async (value) => {
          const link = await linkService.getByProperty("slug", value);
          if (link) throw new Error("slug already in use");
        },
      },
      default: undefined,
    },
    url: {
      errorMessage: "Invalid link URL",
      isURL: true,
    },
    icon: {
      errorMessage: "Invalid icon URL",
      optional: {
        options: {
          values: "falsy",
        },
      },
      isURL: true,
      default: undefined,
    },
  },
  ["body"]
);

export const patchLink = checkSchema(
  {
    title: {
      isString: true,
      trim: true,
      isLength: {
        options: { min: 3 },
        errorMessage: "Title should be at least 3 chars long",
      },
      optional: {
        options: {
          values: "falsy",
        },
      },
      default: undefined,
    },
    url: {
      errorMessage: "Invalid link URL",
      isURL: true,
      optional: {
        options: {
          values: "falsy",
        },
      },
      default: undefined,
    },
    icon: {
      errorMessage: "Invalid icon URL",
      optional: {
        options: {
          values: "falsy",
        },
      },
      isURL: true,
      default: undefined,
    },
  },
  ["body"]
);
