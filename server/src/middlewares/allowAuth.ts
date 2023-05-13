import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { UserRole } from "../types/user.type";

const allowAuth =
  (allowedRoles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { roles } = req?.user;
      if (!roles) throw createHttpError(401, "Unauthorized access");

      const isAllowed =
        roles.findIndex((role) => allowedRoles.includes(role)) !== -1;

      if (!isAllowed)
        throw createHttpError(
          401,
          "You don't have the access to perform this task"
        );

      next();
    } catch (error) {
      next(error);
    }
  };

export default allowAuth;
