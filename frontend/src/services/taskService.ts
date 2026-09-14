import type { Task, TaskPriority, TaskStatus } from "../types/Task";

const API_URL =
  import.meta.env.VITE_API_URL;


export async function getProjectTasks(
  projectId: number,
): Promise<Task[]> {
  const response = await fetch(
    `${API_URL}/projects/${projectId}/tasks`,
  );

  if (!response.ok) {
    throw new Error("Unable to fetch tasks");
  }

  return response.json();
}

export async function createTask(
  projectId: number,
  title: string,
  description: string,
  status: TaskStatus,
  priority: TaskPriority,
): Promise<Task> {
  const response = await fetch(
    `${API_URL}/projects/${projectId}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status,
        priority,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Unable to create task");
  }

  return response.json();
}

export async function updateTask(
  taskId: number,
  title: string,
  description: string,
  status: TaskStatus,
  priority: TaskPriority,
): Promise<Task> {
  const response = await fetch(
    `${API_URL}/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status,
        priority,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Unable to update task");
  }

  return response.json();
}

export async function deleteTask(
  taskId: number,
): Promise<void> {
  const response = await fetch(
    `${API_URL}/tasks/${taskId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Unable to delete task");
  }
}
