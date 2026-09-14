package com.pkwebapp.backend.auth;

import com.pkwebapp.backend.user.User;
import com.pkwebapp.backend.user.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthService {

private final UserRepository userRepository;
private final PasswordEncoder passwordEncoder;
private final JwtEncoder jwtEncoder;

public AuthService(
    UserRepository userRepository,
    PasswordEncoder passwordEncoder,
    JwtEncoder jwtEncoder
) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtEncoder = jwtEncoder;
}

public User register(RegisterRequest request) {

    String email = request.email()
        .trim()
        .toLowerCase();

    if (userRepository.existsByEmail(email)) {
        throw new IllegalArgumentException(
            "Un utilisateur existe déjà avec cet email"
        );
    }

    User user = new User(
        request.name().trim(),
        email,
        passwordEncoder.encode(request.password())
    );

    return userRepository.save(user);
}

public AuthResponse login(LoginRequest request) {

    String email = request.email()
        .trim()
        .toLowerCase();

    User user = userRepository
        .findByEmail(email)
        .orElseThrow(() ->
            new IllegalArgumentException(
                "Email ou mot de passe incorrect"
            )
        );

    if (!passwordEncoder.matches(
        request.password(),
        user.getPassword()
    )) {
        throw new IllegalArgumentException(
            "Email ou mot de passe incorrect"
        );
    }

    Instant now = Instant.now();

    JwtClaimsSet claims = JwtClaimsSet.builder()
        .issuer("taskflow")
        .subject(user.getId().toString())
        .issuedAt(now)
        .expiresAt(now.plusSeconds(86400))
        .claim("email", user.getEmail())
        .claim("name", user.getName())
        .claim("role", user.getRole())
        .build();

    String token = jwtEncoder
        .encode(
            JwtEncoderParameters.from(claims)
        )
        .getTokenValue();

    return new AuthResponse(
        token,
        user.getId(),
        user.getName(),
        user.getEmail()
    );
}


}