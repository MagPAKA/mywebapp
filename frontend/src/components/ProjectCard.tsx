import { useState } from "react";
import type { FormEvent } from "react";
import type { Project } from "../types/Project";
import { Link } from "react-router-dom";

import {
  deleteProject,
  updateProject,
} from "../services/projectService";

interface ProjectCardProps {
  project: Project;
  onUpdated: (project: Project) => void;
  onDeleted: (id: number) => void;
}

export default function ProjectCard({
  project,
  onUpdated,
  onDeleted,
}: ProjectCardProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(
    project.description || "",
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const updatedProject = await updateProject(
        project.id,
        name.trim(),
        description.trim(),
      );

      onUpdated(updatedProject);
      setEditing(false);
    } catch (error) {
      console.error("Failed to update project:", error);
      setError("Impossible de modifier le projet");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer le projet "${project.name}" ?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError(null);

      await deleteProject(project.id);

      onDeleted(project.id);
    } catch (error) {
      console.error("Failed to delete project:", error);
      setError("Impossible de supprimer le projet");
    } finally {
      setDeleting(false);
    }
  }

  function handleCancel() {
    setName(project.name);
    setDescription(project.description || "");
    setError(null);
    setEditing(false);
  }

  if (editing) {
    return (
      <article className="project-card">
        <h2>Modifier le projet</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor={`project-name-${project.id}`}>
              Name
            </label>

            <input
              id={`project-name-${project.id}`}
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={150}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={`project-description-${project.id}`}>
              Description
            </label>

            <textarea
              id={`project-description-${project.id}`}
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              maxLength={1000}
              rows={5}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article className="project-card">
      <div className="project-card-header">
       <h2>
		  <Link to={`/projects/${project.id}`}>
			{project.name}
		</Link>
</h2>

      </div>

      <p className="project-description">
        {project.description || "Aucune description"}
      </p>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="project-card-footer">
        <span>Project #{project.id}</span>

        <div className="project-card-actions">
          <button
            className="secondary-button"
            onClick={() => setEditing(true)}
            disabled={deleting}
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
