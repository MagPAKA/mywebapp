package com.pkwebapp.backend.project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProjectCreateRequest {

    @NotBlank(message = "Le nom du projet est obligatoire")
    @Size(max = 150, message = "Le nom ne peut pas dépasser 150 caractères")
    private String name;

    @Size(max = 1000, message = "La description ne peut pas dépasser 1000 caractères")
    private String description;

    public ProjectCreateRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
