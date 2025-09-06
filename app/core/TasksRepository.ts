/* eslint-disable no-unused-vars */
export type TaskStatus = "open" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  dueAt?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TasksRepository {
  listMine(): Promise<Task[]>;
  create(input: {
    title: string;
    dueAt?: string;
    meta?: Record<string, unknown>;
  }): Promise<Task>;
  update(
    id: string,
    patch: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>,
  ): Promise<Task>;
  remove(id: string): Promise<void>;
}
