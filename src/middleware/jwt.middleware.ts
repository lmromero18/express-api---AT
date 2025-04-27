import { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../helpers/jwt.helper";

export interface AuthenticatedRequest extends Request {
  user?: any; 
}

export const jwtMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: "Invalid session" });
      return;
    }

    const token = authHeader.split(' ')[1];

    const expired = jwtHelper.isTokenExpired(token);
    if (expired) {
      res.status(401).json({ success: false, message: "Invalid session" });
      return;
    }

    const decoded = jwtHelper.decodeToken(token, jwtHelper.publicKey);

    req.user = decoded;

    next();
  } catch (error: any) {
    console.error("JWT Validation Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid session" });
  }
};
