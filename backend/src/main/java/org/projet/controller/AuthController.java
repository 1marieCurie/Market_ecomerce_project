package org.projet.controller;

import org.projet.dto.auth.LoginRequest;
import org.projet.dto.auth.RegisterRequest;
import org.projet.dto.auth.JwtResponse;
import org.projet.entity.User;
import org.projet.service.AuthService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    // Constructor injection 
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        User user = authService.register(request);

        // Return JSON instead of plain text
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "User registered successfully",
            "userId", user.getId()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginRequest request) {
        JwtResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
