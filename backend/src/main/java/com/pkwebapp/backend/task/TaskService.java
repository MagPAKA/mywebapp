package com.pkwebapp.backend.task;

import com.pkwebapp.backend.project.Project;
import com.pkwebapp.backend.project.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskService(
            TaskRepository taskRepository,
            ProjectRepository projectRepository) {

        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public List<TaskResponse> findAll() {
    return taskRepository.findAll()
            .stream()
            .map(this::toResponse)
            .toList();
	}


    public List<TaskResponse> findByProjectId(Long projectId) {
    return taskRepository.findAll()
            .stream()
            .filter(task -> task.getProject().getId().equals(projectId))
            .map(this::toResponse)
            .toList();
	}



	private TaskResponse toResponse(Task task) {
		return new TaskResponse(
				task.getId(),
				task.getTitle(),
				task.getDescription(),
				task.getStatus(),
				task.getPriority(),
				task.getProject().getId(),
				task.getCreatedAt(),
				task.getUpdatedAt()
		);
	}

	public TaskResponse update(Long id, TaskUpdateRequest request) {

		Task task = taskRepository.findById(id)
				.orElseThrow(() ->
						new IllegalArgumentException(
								"Task not found: " + id));

		task.setTitle(request.getTitle());
		task.setDescription(request.getDescription());

		if (request.getStatus() != null) {
			task.setStatus(request.getStatus());
		}

		if (request.getPriority() != null) {
			task.setPriority(request.getPriority());
		}

		Task updatedTask = taskRepository.save(task);

		return toResponse(updatedTask);
	}

	public void delete(Long id) {

		if (!taskRepository.existsById(id)) {
			throw new IllegalArgumentException(
					"Task not found: " + id);
		}

		taskRepository.deleteById(id);
	}


    public TaskResponse create(
            String title,
            String description,
            TaskStatus status,
            TaskPriority priority,
            Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Project not found: " + projectId));

        Task task = new Task(
                title,
                description,
                status,
                priority,
                project);

        Task savedTask = taskRepository.save(task);

		return toResponse(savedTask);

    }
}
