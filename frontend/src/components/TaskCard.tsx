import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import type {
Task,
TaskPriority,
TaskStatus,
} from "../types/Task";

import {
deleteTask,
updateTask,
} from "../services/taskService";

interface TaskCardProps {
task: Task;
onUpdated: (task: Task) => void;
onDeleted: (id: number) => void;
}

export default function TaskCard({
task,
onUpdated,
onDeleted,
}: TaskCardProps) {
const [editing, setEditing] =
useState(false);

const [title, setTitle] =
useState(task.title);

const [description, setDescription] =
useState(task.description || "");

const [status, setStatus] =
useState<TaskStatus>(task.status);

const [priority, setPriority] =
useState<TaskPriority>(task.priority);

const [saving, setSaving] =
useState(false);

const [deleting, setDeleting] =
useState(false);

const [error, setError] =
useState<string | null>(null);

useEffect(() => {
setTitle(task.title);
setDescription(task.description || "");
setStatus(task.status);
setPriority(task.priority);
}, [task]);

async function handleSubmit(
event: FormEvent<HTMLFormElement>,
) {
event.preventDefault();

if (!title.trim()) {
  setError("Le titre est obligatoire");
  return;
}

try {
  setSaving(true);
  setError(null);

  const updatedTask =
    await updateTask(
      task.id,
      title.trim(),
      description.trim(),
      status,
      priority,
    );

  onUpdated(updatedTask);
  setEditing(false);
} catch (error) {
  console.error(
    "Failed to update task:",
    error,
  );

  setError(
    "Impossible de modifier la tâche",
  );
} finally {
  setSaving(false);
}


}

async function handleDelete() {
const confirmed = window.confirm(
  "Voulez-vous vraiment supprimer la tâche " +
    task.title +
    " ?",
);


if (!confirmed) {
  return;
}

try {
  setDeleting(true);
  setError(null);

  await deleteTask(task.id);

  onDeleted(task.id);
} catch (error) {
  console.error(
    "Failed to delete task:",
    error,
  );

  setError(
    "Impossible de supprimer la tâche",
  );
} finally {
  setDeleting(false);
}


}

function handleCancel() {
setTitle(task.title);
setDescription(
task.description || "",
);
setStatus(task.status);
setPriority(task.priority);

setError(null);
setEditing(false);


}

function getStatusLabel(
value: TaskStatus,
) {
switch (value) {
case "TODO":
return "À faire";

  case "IN_PROGRESS":
    return "En cours";

  case "DONE":
    return "Terminée";

  default:
    return value;
}


}

function getPriorityLabel(
value: TaskPriority,
) {
switch (value) {
case "LOW":
return "Faible";

  case "MEDIUM":
    return "Moyenne";

  case "HIGH":
    return "Haute";

  default:
    return value;
}


}

if (editing) {
return (
<article className="task-card">
<h3>Modifier la tâche</h3>

    {error && (
      <div className="error-message">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label
          htmlFor={`task-title-${task.id}`}
        >
          Titre
        </label>

        <input
          id={`task-title-${task.id}`}
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(
              event.target.value,
            )
          }
          maxLength={200}
          required
        />
      </div>

      <div className="form-group">
        <label
          htmlFor={`task-description-${task.id}`}
        >
          Description
        </label>

        <textarea
          id={`task-description-${task.id}`}
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value,
            )
          }
          maxLength={2000}
          rows={4}
        />
      </div>

      <div className="form-group">
        <label
          htmlFor={`task-status-${task.id}`}
        >
          Statut
        </label>

        <select
          id={`task-status-${task.id}`}
          value={status}
          onChange={(event) =>
            setStatus(
              event.target
                .value as TaskStatus,
            )
          }
        >
          <option value="TODO">
            À faire
          </option>

          <option value="IN_PROGRESS">
            En cours
          </option>

          <option value="DONE">
            Terminée
          </option>
        </select>
      </div>

      <div className="form-group">
        <label
          htmlFor={`task-priority-${task.id}`}
        >
          Priorité
        </label>

        <select
          id={`task-priority-${task.id}`}
          value={priority}
          onChange={(event) =>
            setPriority(
              event.target
                .value as TaskPriority,
            )
          }
        >
          <option value="LOW">
            Faible
          </option>

          <option value="MEDIUM">
            Moyenne
          </option>

          <option value="HIGH">
            Haute
          </option>
        </select>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={handleCancel}
          disabled={saving}
        >
          Annuler
        </button>

        <button
          type="submit"
          className="primary-button"
          disabled={saving}
        >
          {saving
            ? "Enregistrement..."
            : "Enregistrer"}
        </button>
      </div>
    </form>
  </article>
);


}

return (
<article className="task-card">
<div className="task-card-header">
<div>
<h3>{task.title}</h3>

      <p>
        {task.description ||
          "Aucune description"}
      </p>
    </div>
  </div>

  {error && (
    <div className="error-message">
      {error}
    </div>
  )}

  <div className="task-card-meta">
    <span
      className={`status-badge ${task.status.toLowerCase()}`}
    >
      {getStatusLabel(task.status)}
    </span>

    <span
      className={`priority-badge ${task.priority.toLowerCase()}`}
    >
      {getPriorityLabel(
        task.priority,
      )}
    </span>
  </div>

  <div className="task-card-footer">
    <span>
      Task #{task.id}
    </span>

    <div className="task-card-actions">
      <button
        className="secondary-button"
        onClick={() =>
          setEditing(true)
        }
        disabled={deleting}
      >
        Modifier
      </button>

      <button
        className="delete-button"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting
          ? "Suppression..."
          : "Supprimer"}
      </button>
    </div>
  </div>
</article>


);
}