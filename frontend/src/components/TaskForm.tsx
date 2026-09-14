import { useState } from "react";
import type { FormEvent } from "react";
import type {
Task,
TaskPriority,
TaskStatus,
} from "../types/Task";
import { createTask } from "../services/taskService";

interface TaskFormProps {
projectId: number;
onCreated: (task: Task) => void;
onCancel: () => void;
}

export default function TaskForm({
projectId,
onCreated,
onCancel,
}: TaskFormProps) {
const [title, setTitle] = useState("");
const [description, setDescription] =
useState("");

const [status, setStatus] =
useState<TaskStatus>("TODO");

const [priority, setPriority] =
useState<TaskPriority>("MEDIUM");

const [saving, setSaving] = useState(false);

const [error, setError] =
useState<string | null>(null);

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

  const task = await createTask(
    projectId,
    title.trim(),
    description.trim(),
    status,
    priority,
  );

  onCreated(task);
} catch (error) {
  console.error(
    "Failed to create task:",
    error,
  );

  setError(
    "Impossible de créer la tâche",
  );
} finally {
  setSaving(false);
}


}

return (
<article className="task-form">
<h2>Nouvelle tâche</h2>

  {error && (
    <div className="error-message">
      {error}
    </div>
  )}

  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="task-title">
        Titre
      </label>

      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
        maxLength={200}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="task-description">
        Description
      </label>

      <textarea
        id="task-description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
        maxLength={2000}
        rows={4}
      />
    </div>

    <div className="form-group">
      <label htmlFor="task-status">
        Statut
      </label>

      <select
        id="task-status"
        value={status}
        onChange={(event) =>
          setStatus(
            event.target.value as TaskStatus,
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
      <label htmlFor="task-priority">
        Priorité
      </label>

      <select
        id="task-priority"
        value={priority}
        onChange={(event) =>
          setPriority(
            event.target.value as TaskPriority,
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
        onClick={onCancel}
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
          ? "Création..."
          : "Créer la tâche"}
      </button>
    </div>
  </form>
</article>


);
}