import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(createHttpError(404, "Requested content not found"));
};

export const defaultError = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorStatus = error?.status || 500;
  const errorMessage = error?.status
    ? error.message
    : "something wents to wrong";
  const errorResponse = {
    errors: {
      common: errorMessage,
    },
    statusCode: errorStatus,
  };

  console.log(error);

  return res.status(errorStatus).json(errorResponse);
};
