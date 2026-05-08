/**
 * Project type that matches the Prisma schema
 * Database structure and validation is now handled by Prisma
 */
export interface IProject {
  id: string;
  title: string;
  description?: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}
