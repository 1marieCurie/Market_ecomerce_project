package org.projet.dto.auth;

import java.util.Set;

public class JwtResponse {

    private String token;        // stores the JWT token
    private String type;         // "Bearer" for HTTP Authorization header
    private String username;     // username of authenticated user
    private Set<String> roles;   // set of role names

    // Constructeur par défaut nécessaire pour Jackson
    public JwtResponse() {}

    // Constructeur complet
    public JwtResponse(String token, String type, String username, Set<String> roles) {
        this.token = token;
        this.type = type;
        this.username = username;
        this.roles = roles;
    }

    // Constructeur pratique pour ton AuthServiceImpl
    public JwtResponse(String token, String username, Set<String> roles) {
        this.token = token;
        this.type = "Bearer";
        this.username = username;
        this.roles = roles;
    }

    // Getters & setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
