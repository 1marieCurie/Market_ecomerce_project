package org.projet.service.impl;

import org.projet.dto.auth.JwtResponse;
import org.projet.dto.auth.LoginRequest;
import org.projet.dto.auth.RegisterRequest;
import org.projet.entity.User;
import org.projet.exception.UserAlreadyExistsException;
import org.projet.entity.Role;
import org.projet.repository.UserRepository;
import org.projet.repository.RoleRepository;
import org.projet.service.AuthService;
import org.projet.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // bean defined in SecurityConfig

    @Autowired
    private JwtUtils jwtUtils; // Injection Spring

    @Override
    public User register(RegisterRequest request) {
        // verify if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already in use"); // here i just created a custom class
                                                                          // (exception/UserAlreadyExistsException) for
                                                                          // managing this type of exceptions
        }

        // We shall add simple checks for requiered fields to prevent storing invalid or
        // empty users alright :
        if (request.getUsername() == null || request.getUsername().isEmpty()) {
            throw new IllegalArgumentException("Username is required");
        }

        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }

        // create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        // If request.getActive() is null, you might unintentionally store a null
        // instead of true/false.
        // so better we do :
        user.setActive(request.getActive() != null ? request.getActive() : true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        // assign ROLE_USER by default
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.getRoles().add(userRole);

        return userRepository.save(user); // we finally save the user
    }

    @Override
    public JwtResponse login(LoginRequest request) {
        // verify if email exists
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        // verify password
        // you respected the anonymisation, good work girl
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtils.generateToken(user.getEmail());

        // Construct and return a JwtResponse
        return new JwtResponse(
                token,
                user.getUsername(),
                user.getRoles()
                        .stream()
                        .map(Role::getName)
                        .collect(Collectors.toSet()));
    }

}
