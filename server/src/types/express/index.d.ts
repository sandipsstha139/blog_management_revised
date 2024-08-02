import { Role } from "../types/roles";

declare global {
  namespace Express {
    interface Request {
      user?: {
        roles: Role;
      };
    }
  }
}
