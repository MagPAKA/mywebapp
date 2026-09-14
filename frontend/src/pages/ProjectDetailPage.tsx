import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import type { Project } from "../types/Project";
import type { Task } from "../types/Task";

import { getProject } from "../services/projectService";
import { getProjectTasks } from "../services/taskService";

import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

export default function ProjectDetailPage() {
const { id } = useParams();

const [project, setProject] =
useState<Project | null>(null);

const [tasks, setTasks] =
useState<Task[]>([]);

const [loading, setLoading] =
useState(true);

const [tasksLoading, setTasksLoading] =
useState(true);

const [error, setError] =
useState<string | null>(null);

const [tasksError, setTasksError] =
useState<string | null>(null);

const [showTaskForm, setShowTaskForm] =
useState(false);

useEffect(() => {
async function loadProject() {
if (!id) {
setError(
"Identifiant du projet manquant",
);

    setLoading(false);
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const data =
      await getProject(Number(id));

    setProject(data);
  } catch (error) {
    console.error(
      "Failed to load project:",
      error,
    );

    setError(
      "Impossible de charger le projet",
    );
  } finally {
    setLoading(false);
  }
}

loadProject();


}, [id]);

useEffect(() => {
async function loadTasks() {
if (!id) {
return;
}

  try {
    setTasksLoading(true);
    setTasksError(null);

    const data =
      await getProjectTasks(Number(id));

    setTasks(data);
  } catch (error) {
    console.error(
      "Failed to load tasks:",
      error,
    );

    setTasksError(
      "Impossible de charger les tâches",
    );
  } finally {
    setTasksLoading(false);
  }
}

loadTasks();


}, [id]);

function handleTaskCreated(task: Task) {
setTasks((currentTasks) => [
...currentTasks,
task,
]);

setShowTaskForm(false);


}

function handleTaskUpdated(
updatedTask: Task,
) {
setTasks((currentTasks) =>
currentTasks.map((task) =>
task.id === updatedTask.id
? updatedTask
: task,
),
);
}

function handleTaskDeleted(id: number) {
setTasks((currentTasks) =>
currentTasks.filter(
(task) => task.id !== id,
),
);
}

const todoTasks = tasks.filter(
(task) => task.status === "TODO",
);

const inProgressTasks = tasks.filter(
(task) =>
task.status === "IN_PROGRESS",
);

const doneTasks = tasks.filter(
(task) => task.status === "DONE",
);

if (loading) {
return <main>Chargement...</main>;
}

if (error) {
return (
<main>
<p>{error}</p>

    <Link to="/projects">
      Retour aux projets
    </Link>
  </main>
);


}

if (!project) {
return (
<main>
<p>Projet introuvable</p>

    <Link to="/projects">
      Retour aux projets
    </Link>
  </main>
);


}

return (
<main className="project-detail-page">
<div className="project-detail-back">
<Link to="/projects">
← Retour aux projets
</Link>
</div>

  <header className="page-header">
    <div>
      <h1>{project.name}</h1>

      <p>
        {project.description ||
          "Aucune description"}
      </p>
    </div>
  </header>

  <section className="project-info">
    <span>
      Project #{project.id}
    </span>

    <span>
      Créé le{" "}
      {new Date(
        project.createdAt,
      ).toLocaleString()}
    </span>

    <span>
      Modifié le{" "}
      {new Date(
        project.updatedAt,
      ).toLocaleString()}
    </span>
  </section>

  <section className="project-tasks">
    <header className="section-header">
      <div>
        <h2>Tasks</h2>

        <p>
          Organisez les tâches de votre
          projet.
        </p>
      </div>

      {!showTaskForm && (
        <button
          className="primary-button"
          onClick={() =>
            setShowTaskForm(true)
          }
        >
          + Nouvelle tâche
        </button>
      )}
    </header>

    {showTaskForm && (
      <TaskForm
        projectId={project.id}
        onCreated={handleTaskCreated}
        onCancel={() =>
          setShowTaskForm(false)
        }
      />
    )}

    {tasksError && (
      <div className="error-message">
        {tasksError}
      </div>
    )}

    {tasksLoading && (
      <div className="status-message">
        Chargement des tâches...
      </div>
    )}

    {!tasksLoading &&
      !tasksError &&
      tasks.length === 0 && (
        <div className="empty-state">
          <h3>Aucune tâche</h3>

          <p>
            Commencez par créer votre
            première tâche.
          </p>
        </div>
      )}

    {!tasksLoading &&
      tasks.length > 0 && (
        <div className="kanban-board">
          <section className="kanban-column">
            <header className="kanban-column-header">
              <div>
                <h3>À faire</h3>
                <span>
                  {todoTasks.length}
                </span>
              </div>
            </header>

            <div className="kanban-column-content">
              {todoTasks.length === 0 ? (
                <p className="kanban-empty">
                  Aucune tâche
                </p>
              ) : (
                todoTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdated={
                      handleTaskUpdated
                    }
                    onDeleted={
                      handleTaskDeleted
                    }
                  />
                ))
              )}
            </div>
          </section>

          <section className="kanban-column">
            <header className="kanban-column-header">
              <div>
                <h3>En cours</h3>
                <span>
                  {inProgressTasks.length}
                </span>
              </div>
            </header>

            <div className="kanban-column-content">
              {inProgressTasks.length ===
              0 ? (
                <p className="kanban-empty">
                  Aucune tâche
                </p>
              ) : (
                inProgressTasks.map(
                  (task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdated={
                        handleTaskUpdated
                      }
                      onDeleted={
                        handleTaskDeleted
                      }
                    />
                  ),
                )
              )}
            </div>
          </section>

          <section className="kanban-column">
            <header className="kanban-column-header">
              <div>
                <h3>Terminées</h3>
                <span>
                  {doneTasks.length}
                </span>
              </div>
            </header>

            <div className="kanban-column-content">
              {doneTasks.length === 0 ? (
                <p className="kanban-empty">
                  Aucune tâche
                </p>
              ) : (
                doneTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdated={
                      handleTaskUpdated
                    }
                    onDeleted={
                      handleTaskDeleted
                    }
                  />
                ))
              )}
            </div>
          </section>
        </div>
      )}
  </section>
</main>


);
}