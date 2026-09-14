package com.pkwebapp.backend.task;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public List<TaskResponse> getTasks()
	{
        return taskService.findAll();
    }

    @GetMapping("/projects/{projectId}/tasks")
    public List<TaskResponse> getProjectTasks(
            @PathVariable Long projectId) {

        return taskService.findByProjectId(projectId);
    }

    @PostMapping("/projects/{projectId}/tasks")
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponse createTask(
            @PathVariable Long projectId,
            @Valid @RequestBody TaskCreateRequest request) {

        return taskService.create(
                request.getTitle(),
                request.getDescription(),
                request.getStatus(),
                request.getPriority(),
                projectId);
    }
	
	@DeleteMapping("/tasks/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteTask(@PathVariable Long id) {
		taskService.delete(id);
	}

	
	@PutMapping("/tasks/{id}")
	public TaskResponse updateTask(
			@PathVariable Long id,
			@Valid @RequestBody TaskUpdateRequest request) {

		return taskService.update(id, request);
	}

}
