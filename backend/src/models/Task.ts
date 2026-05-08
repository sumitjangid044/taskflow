/**
 * Task type that matches the Prisma schema
 * Database structure and validation is now handled by Prisma
 */
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface ITask {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
  assignedToId?: string;
  projectId: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}
