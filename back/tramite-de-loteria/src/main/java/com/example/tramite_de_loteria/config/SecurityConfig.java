package com.example.tramite_de_loteria.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;

import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.tramite_de_loteria.filter.JwtReqFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Autowired
    @Lazy
    private JwtReqFilter jwtReqFilter;

    @Bean
    public UserDetailsManager userDetailsManager(DataSource datasource) {
        JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(datasource);
        
        // Configurar las consultas SQL personalizadas
        userDetailsManager.setUsersByUsernameQuery("SELECT usr_usuario, usr_contrasenia, TRUE FROM Usuario WHERE usr_usuario = ?");
        userDetailsManager.setAuthoritiesByUsernameQuery("SELECT u.usr_usuario, r.r_nombre FROM Usuario u JOIN Rol r ON u.r_rol = r.r_id WHERE u.usr_usuario = ?");
        
        return userDetailsManager;
    }

    @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
            .authorizeHttpRequests(authorize -> authorize
                            .requestMatchers("/v1/authenticate").permitAll() // Permitir acceso sin autenticación al endpoint de autenticación
                            .requestMatchers("/v1/api/tramites").hasRole("Administrador") // Acceso solo para Administradores
                            .requestMatchers("/v1/api/consultar-tramites").hasAnyRole("Administrador", "Agenciero") // Acceso para Administradores y Agencieros
                            .anyRequest().authenticated() // Acceso para cualquier usuario autenticado
            )
            .addFilterBefore(jwtReqFilter, UsernamePasswordAuthenticationFilter.class) // Añadir filtro JWT antes del filtro de autenticación por nombre de usuario y contraseña
            .sessionManagement(session -> session
                            .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Sin sesión
            )
            .csrf(csrf -> csrf.disable()) // Deshabilitar CSRF para pruebas
            .httpBasic(withDefaults()); // Usar autenticación básica
    return http.build();
}


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
        
}
