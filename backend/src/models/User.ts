import { Role } from "../constants/roles";

/**
 * User type that matches the Prisma schema
 * Database structure and validation is now handled by Prisma
 */
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
