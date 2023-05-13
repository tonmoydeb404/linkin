import { NextFunction, Request, Response } from "express";

const asyncWrapper =
  (fn: (req?: Request, res?: Response, next?: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default asyncWrapper;
