package com.pkwebapp.backend.auth;

public record AuthResponse(
String token,
Long id,
String name,
String email
) {
}