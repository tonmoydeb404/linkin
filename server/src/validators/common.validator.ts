import { ParamSchema } from "express-validator";

export const validObjectId: ParamSchema = {
  isMongoId: true,
  errorMessage: "Invalid Id",
};
