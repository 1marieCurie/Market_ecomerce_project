package org.projet.dto.auth;

import java.util.Set;

public class JwtResponse {
    private String token;    // stores the JWT token
    private String type = "Bearer"; // fixed to "Bearer" for HTTP Authorization header
    private String username;  // the username of the authenticated user
    private Set<String> roles; // the set of role names for the user.

    public JwtResponse(String token, String username, Set<String> roles) {
        this.token = token;
        this.username = username;
        this.roles = roles;
    }

    // getters & setters
    public String getToken() {
        return token;
    }

    public String getType() {
        return type;
    }

    public String getUsername() {
        return username;
    }

    public Set<String> getRoles() {
        return roles;
    }
}
