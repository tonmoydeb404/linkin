import { AuthPayload } from "../auth.type";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: AuthPayload;
    }
  }
}
