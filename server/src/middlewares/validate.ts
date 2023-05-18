import { validationResult } from "express-validator";
import asyncWrapper from "../helpers/asyncWrapper";

const validate = asyncWrapper(async (req, res, next) => {
  const errorResult = validationResult(req);
  if (errorResult.isEmpty()) return next();

  const errors = errorResult.formatWith((error) => error.msg).mapped();

  res.status(400).json({ errors, statusCode: 400 });
});

export default validate;
