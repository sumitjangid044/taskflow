import { NextFunction, Request, Response } from "express";

import { env } from "../config/env";
import { getCurrentUser, loginUser, registerUser } from "../services/auth.service";

const setAuthCookie = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const result = await registerUser({ name, email, password, role });
    setAuthCookie(res, result.token);

    res.status(201).json({
      message: "Account created successfully",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    setAuthCookie(res, result.token);

    res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await getCurrentUser(userId);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const logout = (_req: Request, res: Response): void => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
