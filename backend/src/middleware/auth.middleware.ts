import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { ROLES, Role } from "../constants/roles";
import { env } from "../config/env";

interface JwtPayload {
  sub: string;
  role: Role;
}

const getTokenFromRequest = (req: Request): string | null => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1] ?? null;
  }

  if (typeof req.cookies?.token === "string") {
    return req.cookies.token;
  }

  return null;
};

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const token = getTokenFromRequest(req);

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Missing token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = { userId: decoded.sub, role: decoded.role };
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const authorize = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      return;
    }

    next();
  };
};

export const adminOnly = authorize(ROLES.ADMIN);
