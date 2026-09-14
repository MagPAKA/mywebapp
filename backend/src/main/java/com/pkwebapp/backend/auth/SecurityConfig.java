package com.pkwebapp.backend.auth;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

@Value("${app.jwt.secret}")
private String jwtSecret;

@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

@Bean
public SecretKey jwtSecretKey() {
    return new SecretKeySpec(
        jwtSecret.getBytes(StandardCharsets.UTF_8),
        "HmacSHA256"
    );
}

@Bean
public JwtEncoder jwtEncoder(SecretKey jwtSecretKey) {
    return NimbusJwtEncoder
        .withSecretKey(jwtSecretKey)
        .build();
}

@Bean
public JwtDecoder jwtDecoder(SecretKey jwtSecretKey) {
    return NimbusJwtDecoder
        .withSecretKey(jwtSecretKey)
        .macAlgorithm(MacAlgorithm.HS256)
        .build();
}

@Bean
public SecurityFilterChain securityFilterChain(
    HttpSecurity http
) throws Exception {

    http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> {})

        .sessionManagement(session ->
            session.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS
            )
        )

        .authorizeHttpRequests(auth ->
            auth
                .requestMatchers(
                    "/api/auth/register",
                    "/api/auth/login",
                    "/actuator/**"
                )
                .permitAll()
                .anyRequest()
                .authenticated()
        )

        .oauth2ResourceServer(oauth2 ->
            oauth2.jwt(jwt -> {})
        );

    return http.build();
}


}