package com.pkwebapp.backend.dashboard;

import com.pkwebapp.backend.task.TaskPriority;
import com.pkwebapp.backend.task.TaskStatus;

import java.time.LocalDateTime;

public record RecentTaskResponse(
        Long id,
        String title,
        TaskStatus status,
        TaskPriority priority,
        Long projectId,
        String projectName,
        LocalDateTime updatedAt
) {
}
