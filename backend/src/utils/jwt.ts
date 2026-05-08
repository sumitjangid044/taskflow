import jwt from "jsonwebtoken";

import { env } from "../config/env";

export const signToken = (userId: string): string => {
  const expiresIn = env.JWT_EXPIRES_IN as NonNullable<jwt.SignOptions["expiresIn"]>;

  return jwt.sign({ sub: userId }, env.JWT_SECRET, {
    expiresIn,
  });
};
