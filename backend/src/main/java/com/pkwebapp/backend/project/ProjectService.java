package com.pkwebapp.backend.project;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> findAll() {
        return projectRepository.findAll();
    }
	
	public Page<Project> findAll(Pageable pageable) {
    return projectRepository.findAll(pageable);
	}

	
	public Project update(Long id, ProjectUpdateRequest request) {

		Project project = findById(id);

		project.setName(request.getName());
		project.setDescription(request.getDescription());

		return projectRepository.save(project);
	}

	public void delete(Long id) {
		Project project = findById(id);

		projectRepository.delete(project);
	}

	public Project findById(Long id) {
		return projectRepository.findById(id)
				.orElseThrow(() -> new ProjectNotFoundException(id));
	}

    public Project create(ProjectCreateRequest request) {

        Project project = new Project();

        project.setName(request.getName());
        project.setDescription(request.getDescription());

        return projectRepository.save(project);
    }
}
