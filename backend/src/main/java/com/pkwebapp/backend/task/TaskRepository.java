package com.pkwebapp.backend.task;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pkwebapp.backend.task.TaskStatus;


public interface TaskRepository extends JpaRepository<Task, Long> {

    long countByStatus(TaskStatus status);
	List<Task> findTop5ByOrderByUpdatedAtDesc();

}


