import type { Task, TasksRepository } from "../core/TasksRepository";

export class PocketBaseTasksRepo implements TasksRepository {
  private readonly baseURL: string;
  private readonly authToken: string;
  private readonly userId: string;

  constructor(baseURL: string, authToken: string, userId: string) {
    this.baseURL = baseURL;
    this.authToken = authToken;
    this.userId = userId;
  }

  private headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.authToken}`,
    };
  }

  private mapRecord(record: any): Task {
    return {
      id: record.id,
      title: record.title,
      status: record.status,
      dueAt: record.dueAt ?? undefined,
      meta: record.meta ?? undefined,
      createdAt: record.created,
      updatedAt: record.updated,
    };
  }

  async listMine(): Promise<Task[]> {
    const url = new URL("/api/collections/tasks/records", this.baseURL);
    url.searchParams.set("filter", `user='${this.userId}'`);
    url.searchParams.set("sort", "-updated");
    const res = await fetch(url, { headers: this.headers() });
    if (!res.ok) {
      throw new Error(`Failed to list tasks: ${res.status}`);
    }
    const data = await res.json();
    return (data.items ?? []).map((item: any) => this.mapRecord(item));
  }

  async create(input: {
    title: string;
    dueAt?: string;
    meta?: Record<string, unknown>;
  }): Promise<Task> {
    const body = {
      title: input.title,
      status: "open",
      dueAt: input.dueAt,
      meta: input.meta,
      user: this.userId,
    };
    const res = await fetch(`${this.baseURL}/api/collections/tasks/records`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Failed to create task: ${res.status}`);
    }
    const data = await res.json();
    return this.mapRecord(data);
  }

  async update(
    id: string,
    patch: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>,
  ): Promise<Task> {
    const res = await fetch(
      `${this.baseURL}/api/collections/tasks/records/${id}`,
      {
        method: "PATCH",
        headers: this.headers(),
        body: JSON.stringify(patch),
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to update task: ${res.status}`);
    }
    const data = await res.json();
    return this.mapRecord(data);
  }

  async remove(id: string): Promise<void> {
    const res = await fetch(
      `${this.baseURL}/api/collections/tasks/records/${id}`,
      {
        method: "DELETE",
        headers: this.headers(),
      },
    );
    if (!res.ok) {
      throw new Error(`Failed to delete task: ${res.status}`);
    }
  }
}
