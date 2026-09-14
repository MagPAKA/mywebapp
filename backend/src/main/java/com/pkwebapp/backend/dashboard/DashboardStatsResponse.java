package com.pkwebapp.backend.dashboard;

import java.util.List;

public record DashboardStatsResponse(
        long projects,
        long tasks,
        long todo,
        long inProgress,
        long done,
        List<RecentTaskResponse> recentTasks
) {
}
