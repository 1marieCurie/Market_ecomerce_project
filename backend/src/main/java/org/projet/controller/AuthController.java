package org.projet.controller;

import org.projet.dto.*;
import org.projet.entity.User;
import org.projet.security.JwtUtils;
import org.projet.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        User user = authService.register(request.getUsername(), request.getEmail(), request.getPassword());
        return ResponseEntity.ok("User registered with id: " + user.getId());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        // Vérifier si user existe
        User user = authService.userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Vérifier password
        if (!authService.passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Générer JWT
        String token = jwtUtils.generateToken(user.getEmail());

        // Retourner JWT + username + roles
        return ResponseEntity.ok(new JwtResponse(
                token,
                user.getUsername(),
                user.getRoles().stream().map(r -> r.getName()).collect(Collectors.toSet())));
    }
}
