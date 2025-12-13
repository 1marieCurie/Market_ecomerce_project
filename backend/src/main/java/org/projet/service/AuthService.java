package org.projet.service;

import org.projet.dto.auth.LoginRequest;
import org.projet.dto.auth.RegisterRequest;
import org.projet.entity.User;

public interface AuthService {
    User register(RegisterRequest request);

    String login(LoginRequest request); // retourne le JWT
}
