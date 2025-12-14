package org.projet.config;

import org.projet.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration // to mention to spring that this is a configuration class
@EnableWebSecurity // to activate spring security
public class SecurityConfig {

    // we inject our JwtAuthenticationFilter
    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors()
                .and()
                .csrf().disable() // disable the csrf for simplicity of API REST
                .authorizeHttpRequests()
                .requestMatchers("/api/auth/**", "/public/**").permitAll() // public routes
                .requestMatchers("/error").permitAll() //permit error route
                .requestMatchers("/api/categories/**").permitAll() //allow categories
                .requestMatchers("/api/products/**").permitAll() //public product endpoints for the user
                .requestMatchers("/api/admin/**").hasRole("ADMIN") // admin routes, only routes begining by /admin are
                                                               // accessible by admins, it takes ADMIN by default, not ROLE_ADMIN 
                .anyRequest().authenticated() // all the rest of routes need an authentication
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // we don't use sessions,
                                                                                             // each request must be
                                                                                             // authenticated
                                                                                             // independently

        // Add JwtAuthfilter before the UsernamePasswordAuthenticationFilter (classic
        // login filter)
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build(); // returns the configured SecurityFilterChain bean so Spring Security can use
                             // it.

    }
}
