import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const isEmailVerified = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { emailVerified } = req?.user;
    if (!emailVerified) throw createHttpError(400, "Email is not verified");
    next();
  } catch (error) {
    next(error);
  }
};

export default isEmailVerified;
