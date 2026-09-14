package com.pkwebapp.backend.auth;

import com.pkwebapp.backend.user.User;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

private final AuthService authService;

public AuthController(AuthService authService) {
    this.authService = authService;
}

@PostMapping("/register")
@ResponseStatus(HttpStatus.CREATED)
public RegisterResponse register(
    @Valid @RequestBody RegisterRequest request
) {
    User user = authService.register(request);

    return new RegisterResponse(
        user.getId(),
        user.getName(),
        user.getEmail()
    );
}

@PostMapping("/login")
public AuthResponse login(
    @Valid @RequestBody LoginRequest request
) {
    return authService.login(request);
}

public record RegisterResponse(
    Long id,
    String name,
    String email
) {
}


}