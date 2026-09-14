import type { Project } from "../types/Project";

const API_URL = "http://localhost:8082/api";

function getAuthHeaders(): HeadersInit {
const token = localStorage.getItem("token");

return {
"Content-Type": "application/json",
"Authorization": "Bearer " + token,
};
}

export async function getProjects(): Promise<Project[]> {
const response = await fetch(
API_URL + "/projects",
{
method: "GET",
headers: getAuthHeaders(),
},
);

if (!response.ok) {
throw new Error(
"Failed to load projects: HTTP " + response.status,
);
}

const data = await response.json();

if (Array.isArray(data)) {
return data;
}

if (Array.isArray(data.content)) {
return data.content;
}

return [];
}

export async function getProject(
id: number,
): Promise<Project> {
const response = await fetch(
API_URL + "/projects/" + id,
{
method: "GET",
headers: getAuthHeaders(),
},
);

if (!response.ok) {
throw new Error(
"Failed to load project: HTTP " + response.status,
);
}

return response.json();
}

export async function createProject(
name: string,
description: string,
): Promise<Project> {
const response = await fetch(
API_URL + "/projects",
{
method: "POST",
headers: getAuthHeaders(),
body: JSON.stringify({
name,
description,
}),
},
);

if (!response.ok) {
throw new Error(
"Failed to create project: HTTP " + response.status,
);
}

return response.json();
}

export async function updateProject(
id: number,
name: string,
description: string,
): Promise<Project> {
const response = await fetch(
API_URL + "/projects/" + id,
{
method: "PUT",
headers: getAuthHeaders(),
body: JSON.stringify({
name,
description,
}),
},
);

if (!response.ok) {
throw new Error(
"Failed to update project: HTTP " + response.status,
);
}

return response.json();
}

export async function deleteProject(
id: number,
): Promise<void> {
const response = await fetch(
API_URL + "/projects/" + id,
{
method: "DELETE",
headers: getAuthHeaders(),
},
);

if (!response.ok) {
throw new Error(
"Failed to delete project: HTTP " + response.status,
);
}
}