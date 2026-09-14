package com.pkwebapp.backend.dashboard;

import com.pkwebapp.backend.project.ProjectRepository;
import com.pkwebapp.backend.task.Task;
import com.pkwebapp.backend.task.TaskRepository;
import com.pkwebapp.backend.task.TaskStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public DashboardService(
            ProjectRepository projectRepository,
            TaskRepository taskRepository) {

        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    public DashboardStatsResponse getStats() {

        long projects = projectRepository.count();

        long tasks = taskRepository.count();

        long todo =
                taskRepository.countByStatus(TaskStatus.TODO);

        long inProgress =
                taskRepository.countByStatus(
                        TaskStatus.IN_PROGRESS
                );

        long done =
                taskRepository.countByStatus(
                        TaskStatus.DONE
                );

        List<RecentTaskResponse> recentTasks =
                taskRepository
                        .findTop5ByOrderByUpdatedAtDesc()
                        .stream()
                        .map(this::toRecentTaskResponse)
                        .toList();

        return new DashboardStatsResponse(
                projects,
                tasks,
                todo,
                inProgress,
                done,
                recentTasks
        );
    }

    private RecentTaskResponse toRecentTaskResponse(
            Task task) {

        return new RecentTaskResponse(
                task.getId(),
                task.getTitle(),
                task.getStatus(),
                task.getPriority(),
                task.getProject().getId(),
                task.getProject().getName(),
                task.getUpdatedAt()
        );
    }
}
