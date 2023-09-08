import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import * as userServices from "../services/user.service";

const confirmPassword = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { confirmPassword, user_id } = matchedData(req);
    if (!user_id) throw createHttpError(401, "Unauthorized access");

    const user = await userServices
      .getByProperty("_id", user_id)
      .select("password");

    const isMatch = await user.comparePassword(confirmPassword);

    if (!isMatch) throw createHttpError(401, "Authorization Error");

    next();
  } catch (error) {
    next(error);
  }
};

export default confirmPassword;
