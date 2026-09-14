import type { Project } from "../types/Project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card-header">
        <h2>{project.name}</h2>
      </div>

      <p className="project-description">
        {project.description || "Aucune description"}
      </p>

      <div className="project-card-footer">
        <span>Project #{project.id}</span>
      </div>
    </article>
  );
}
