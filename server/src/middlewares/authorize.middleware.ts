import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { UserRole } from "../types/user.type";

const authorize =
  (allowedRoles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { role } = req?.user;
      if (!role) throw createHttpError(401, "Unauthorized access");

      const isAllowed = allowedRoles.includes(role);

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

export default authorize;
