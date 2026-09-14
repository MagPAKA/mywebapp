package com.pkwebapp.backend.exception;

import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.HashMap;

import com.pkwebapp.backend.project.ProjectNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProjectNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, Object> handleProjectNotFound(
            ProjectNotFoundException exception) {

        return Map.of(
                "timestamp", LocalDateTime.now(),
                "status", 404,
                "error", "Not Found",
                "message", exception.getMessage()
        );
    }
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public Map<String, Object> handleValidationException(
			MethodArgumentNotValidException exception) {

		Map<String, String> errors = new HashMap<>();

		exception.getBindingResult()
				.getFieldErrors()
				.forEach(error ->
						errors.put(error.getField(), error.getDefaultMessage())
				);

		return Map.of(
				"timestamp", LocalDateTime.now(),
				"status", 400,
				"error", "Validation Failed",
				"message", "Invalid request",
				"errors", errors
		);
	}

}
