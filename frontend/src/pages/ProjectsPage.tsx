import { useEffect, useState } from "react";
import type { Project } from "../types/Project";
import { getProjects } from "../services/projectService";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";


export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);

      const data = await getProjects();

      setProjects(data);
      setError(null);
    } catch (error) {
      console.error("Failed to load projects:", error);
      setError("Impossible de charger les projets");
    } finally {
      setLoading(false);
    }
  }
function handleProjectUpdated(updatedProject: Project) {
  setProjects((currentProjects) =>
    currentProjects.map((project) =>
      project.id === updatedProject.id
        ? updatedProject
        : project,
    ),
  );
}


	function handleProjectDeleted(id: number) {
	  setProjects((currentProjects) =>
		currentProjects.filter((project) => project.id !== id),
	  );
	}

  function handleProjectCreated(project: Project) {
    setProjects((currentProjects) => [
      ...currentProjects,
      project,
    ]);

    setShowForm(false);
  }

  return (
    <div className="projects-page">
      <header className="page-header">
        <div>
          <h1>Projects</h1>
          <p>
            Gérez vos projets et votre travail d'équipe.
          </p>
        </div>

        {!showForm && (
          <button
            className="primary-button"
            onClick={() => setShowForm(true)}
          >
            + New Project
          </button>
        )}
      </header>

      {showForm && (
        <ProjectForm
          onCreated={handleProjectCreated}
          onCancel={() => setShowForm(false)}
        />
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading && (
        <div className="status-message">
          Chargement des projets...
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="empty-state">
          <h2>Aucun projet</h2>
          <p>
            Commencez par créer votre premier projet.
          </p>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <div className="projects-grid">
          {projects.map((project) => (
		  <ProjectCard
		  key={project.id}
		  project={project}
		  onUpdated={handleProjectUpdated}
		  onDeleted={handleProjectDeleted}	
		/>

				))}
        </div>
      )}
    </div>
  );
}
