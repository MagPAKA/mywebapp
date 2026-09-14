const API_URL = "http://localhost:8082/api";

export interface RecentTask {
id: number;
title: string;
status: string;
priority: string;
projectId: number;
projectName: string;
updatedAt: string;
}

export interface DashboardData {
projects: number;
tasks: number;
todo: number;
inProgress: number;
done: number;
recentTasks: RecentTask[];
}

export async function getDashboard(): Promise<DashboardData> {
const token = localStorage.getItem("token");

const response = await fetch(
API_URL + "/dashboard",
{
method: "GET",
headers: {
"Content-Type": "application/json",
"Authorization": "Bearer " + token,
},
},
);

if (!response.ok) {
throw new Error(
"Failed to load dashboard: HTTP " + response.status,
);
}

return response.json();
}