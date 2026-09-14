import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
getDashboard,
type DashboardData,
type RecentTask,
} from "../services/dashboardService";

export default function DashboardPage() {
const [dashboard, setDashboard] =
useState<DashboardData | null>(null);

const [loading, setLoading] =
useState(true);

const [error, setError] =
useState<string | null>(null);

useEffect(() => {
async function loadDashboard() {
try {
setLoading(true);
setError(null);

    const data = await getDashboard();

    setDashboard(data);
  } catch (error) {
    console.error(
      "Failed to load dashboard:",
      error,
    );

    setError(
      "Impossible de charger le dashboard",
    );
  } finally {
    setLoading(false);
  }
}

loadDashboard();


}, []);

function getStatusLabel(
status: RecentTask["status"],
) {
switch (status) {
case "TODO":
return "À faire";

  case "IN_PROGRESS":
    return "En cours";

  case "DONE":
    return "Terminée";

  default:
    return status;
}


}

function getPriorityLabel(
priority: RecentTask["priority"],
) {
switch (priority) {
case "LOW":
return "Faible";

  case "MEDIUM":
    return "Moyenne";

  case "HIGH":
    return "Haute";

  default:
    return priority;
}


}

function getProgress() {
if (!dashboard || dashboard.tasks === 0) {
return 0;
}

return Math.round(
  (dashboard.done / dashboard.tasks) * 100,
);


}

if (loading) {
return (
<main className="dashboard-page">
<div className="status-message">
Chargement du dashboard...
</div>
</main>
);
}

if (error || !dashboard) {
return (
<main className="dashboard-page">
<div className="error-message">
{error ||
"Impossible de charger le dashboard"}
</div>
</main>
);
}

const progress = getProgress();

return (
<main className="dashboard-page">
<header className="dashboard-header">
<div>
<h1>Dashboard</h1>

      <p>
        Vue d'ensemble de votre espace
        de travail.
      </p>
    </div>

    <Link
      to="/projects"
      className="primary-button"
    >
      Voir les projets
    </Link>
  </header>

  <section className="dashboard-stats">
    <article className="dashboard-stat-card">
      <span className="dashboard-stat-label">
        Projects
      </span>

      <strong className="dashboard-stat-value">
        {dashboard.projects}
      </strong>

      <span className="dashboard-stat-description">
        Projets disponibles
      </span>
    </article>

    <article className="dashboard-stat-card">
      <span className="dashboard-stat-label">
        Tasks
      </span>

      <strong className="dashboard-stat-value">
        {dashboard.tasks}
      </strong>

      <span className="dashboard-stat-description">
        Tâches au total
      </span>
    </article>

    <article className="dashboard-stat-card">
      <span className="dashboard-stat-label">
        À faire
      </span>

      <strong className="dashboard-stat-value dashboard-stat-todo">
        {dashboard.todo}
      </strong>

      <span className="dashboard-stat-description">
        Tâches restantes
      </span>
    </article>

    <article className="dashboard-stat-card">
      <span className="dashboard-stat-label">
        Terminées
      </span>

      <strong className="dashboard-stat-value dashboard-stat-done">
        {dashboard.done}
      </strong>

      <span className="dashboard-stat-description">
        Tâches terminées
      </span>
    </article>
  </section>

  <section className="dashboard-progress-card">
    <div className="dashboard-section-header">
      <div>
        <h2>Progression globale</h2>

        <p>
          Avancement de l'ensemble des
          tâches.
        </p>
      </div>

      <strong>
        {progress}%
      </strong>
    </div>

    <div className="progress-bar">
      <div
        className="progress-bar-value"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>

    <div className="progress-details">
      <span>
        {dashboard.done} terminée
        {dashboard.done !== 1
          ? "s"
          : ""}
      </span>

      <span>
        {dashboard.inProgress} en cours
      </span>

      <span>
        {dashboard.todo} à faire
      </span>
    </div>
  </section>

  <section className="dashboard-content">
    <div className="dashboard-panel">
      <div className="dashboard-panel-header">
        <div>
          <h2>Tâches récentes</h2>

          <p>
            Les dernières tâches
            modifiées.
          </p>
        </div>

        <Link to="/projects">
          Voir tout
        </Link>
      </div>

      {dashboard.recentTasks.length ===
      0 ? (
        <div className="dashboard-empty">
          <p>
            Aucune tâche récente.
          </p>
        </div>
      ) : (
        <div className="recent-tasks-list">
          {dashboard.recentTasks.map(
            (task) => (
              <Link
                key={task.id}
                to={`/projects/${task.projectId}`}
                className="recent-task"
              >
                <div className="recent-task-main">
                  <strong>
                    {task.title}
                  </strong>

                  <span>
                    {task.projectName}
                  </span>
                </div>

                <div className="recent-task-meta">
                  <span
                    className={`status-badge ${task.status.toLowerCase()}`}
                  >
                    {getStatusLabel(
                      task.status,
                    )}
                  </span>

                  <span
                    className={`priority-badge ${task.priority.toLowerCase()}`}
                  >
                    {getPriorityLabel(
                      task.priority,
                    )}
                  </span>
                </div>
              </Link>
            ),
          )}
        </div>
      )}
    </div>

    <div className="dashboard-panel">
      <div className="dashboard-panel-header">
        <div>
          <h2>Résumé</h2>

          <p>
            État actuel de votre travail.
          </p>
        </div>
      </div>

      <div className="dashboard-summary">
        <div className="summary-row">
          <span>Projets</span>

          <strong>
            {dashboard.projects}
          </strong>
        </div>

        <div className="summary-row">
          <span>Tâches</span>

          <strong>
            {dashboard.tasks}
          </strong>
        </div>

        <div className="summary-row">
          <span>À faire</span>

          <strong>
            {dashboard.todo}
          </strong>
        </div>

        <div className="summary-row">
          <span>En cours</span>

          <strong>
            {dashboard.inProgress}
          </strong>
        </div>

        <div className="summary-row">
          <span>Terminées</span>

          <strong>
            {dashboard.done}
          </strong>
        </div>
      </div>

      <Link
        to="/projects"
        className="dashboard-action"
      >
        Gérer mes projets →
      </Link>
    </div>
  </section>
</main>


);
}