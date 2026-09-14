import { useState } from "react";
import type { FormEvent } from "react";

import { createProject } from "../services/projectService";
import type { Project } from "../types/Project";

interface ProjectFormProps {
  onCreated: (project: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm({
  onCreated,
  onCancel,
}: ProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    try {
      setCreating(true);
      setError(null);

      const project = await createProject(
        name.trim(),
        description.trim(),
      );

      onCreated(project);
    } catch (error) {
      console.error("Failed to create project:", error);
      setError("Impossible de créer le projet");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="project-form-container">
      <h2>Create a project</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="project-name">
            Name
          </label>

          <input
            id="project-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={150}
            required
            placeholder="Project name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="project-description">
            Description
          </label>

          <textarea
            id="project-description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            maxLength={1000}
            placeholder="Project description"
            rows={5}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
            disabled={creating}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={creating}
          >
            {creating ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
