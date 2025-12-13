package org.projet.service;

import org.projet.dto.auth.JwtResponse;
import org.projet.dto.auth.LoginRequest;
import org.projet.dto.auth.RegisterRequest;
import org.projet.entity.User;

public interface AuthService {
    User register(RegisterRequest request); // register user

    JwtResponse login(LoginRequest request); // return JWT
}
