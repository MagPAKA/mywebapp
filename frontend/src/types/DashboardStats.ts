export interface RecentTask {
  id: number;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  projectId: number;
  projectName: string;
  updatedAt: string;
}

export interface DashboardStats {
  projects: number;
  tasks: number;
  todo: number;
  inProgress: number;
  done: number;
  recentTasks: RecentTask[];
}
