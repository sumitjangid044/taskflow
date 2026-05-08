/**
 * Comment type that matches the Prisma schema
 * Database structure and validation is now handled by Prisma
 */
export interface IComment {
  id: string;
  message: string;
  userId: string;
  taskId: string;
  createdAt: Date;
}
