package com.pkwebapp.backend.project;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

   @GetMapping
	public Page<Project> getProjects(Pageable pageable) {
		return projectService.findAll(pageable);
	}

	
	@PutMapping("/{id}")
	public Project updateProject(
			@PathVariable Long id,
			@Valid @RequestBody ProjectUpdateRequest request) {

		return projectService.update(id, request);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteProject(@PathVariable Long id) {
		projectService.delete(id);
	}


	@GetMapping("/{id}")
	public Project getProject(@PathVariable Long id) {
		return projectService.findById(id);
	}

    @PostMapping
    public Project createProject(
            @Valid @RequestBody ProjectCreateRequest request) {

        return projectService.create(request);
    }
}
