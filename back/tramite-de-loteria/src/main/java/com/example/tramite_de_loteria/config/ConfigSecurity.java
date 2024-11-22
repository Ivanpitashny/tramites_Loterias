package com.example.tramite_de_loteria.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.example.tramite_de_loteria.filter.JwtReqFilter;

@Configuration
@EnableWebSecurity
public class ConfigSecurity {
    @Autowired
    @Lazy
    private JwtReqFilter jwtReqFilter;
    
    // @Bean
    // public UserDetailsManager userDetailsManager(DataSource datasource) {
    //     return new JdbcUserDetailsManager(datasource);
    // }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(request -> {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:8081"); // Cambia '*' por la URL de tu front si es necesario, como "http://localhost:3000"
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        return config;
        }));
        
        http.authorizeHttpRequests( configure -> {
            configure
            // USUARIOS
            .requestMatchers(HttpMethod.GET, "/v1/usuarios").hasAnyRole("AGENCIERO","ADMINISTRADOR")
            .requestMatchers(HttpMethod.GET,"/v1/usuarios/**").hasAnyRole("AGENCIERO","ADMINISTRADOR")
            .requestMatchers(HttpMethod.POST,"/v1/usuarios").hasRole("ADMINISTRADOR") 
            .requestMatchers(HttpMethod.PUT,"/v1/usuarios/**").hasRole("ADMINISTRADOR")      
            .requestMatchers(HttpMethod.DELETE,"/v1/usuarios/**").hasRole("ADMINISTRADOR")  
            // TRAMITES
            .requestMatchers(HttpMethod.GET, "/v1/tramites").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.GET, "/v1/tramites/*/usuarios").hasAnyRole("AGENCIERO","ADMINISTRADOR")
            .requestMatchers(HttpMethod.GET, "/v1/tramites/**").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.PUT, "/v1/tramites/**").hasAnyRole("AGENCIERO","ADMINISTRADOR")
            .requestMatchers(HttpMethod.POST, "/v1/tramites").hasAnyRole("AGENCIERO","ADMINISTRADOR")
            .requestMatchers(HttpMethod.DELETE, "/v1/tramites/**").hasRole("ADMINISTRADOR")
            // CAMBIO DOMICILIO
            .requestMatchers(HttpMethod.GET, "/v1/cambioDomicilio").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.GET, "/v1/cambioDomicilio/tramite/**").hasAnyRole("AGENCIERO","ADMINISTRADOR")
            .requestMatchers(HttpMethod.GET, "/v1/cambioDomicilio/**").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.PUT, "/v1/cambioDomicilio/**").hasAnyRole("AGENCIERO","ADMINISTRADOR")
            .requestMatchers(HttpMethod.POST, "/v1/cambioDomicilio").hasAnyRole("AGENCIERO","ADMINISTRADOR")
            .requestMatchers(HttpMethod.DELETE, "/v1/cambioDomicilio/**").hasRole("ADMINISTRADOR")
            // CAMBIO TITULAR
            .requestMatchers(HttpMethod.GET, "/v1/cambioTitular").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.GET, "/v1/cambioTitular/tramite/**").hasAnyRole("AGENCIERO","ADMINISTRADOR")
            .requestMatchers(HttpMethod.GET, "/v1/cambioTitular/**").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.PUT, "/v1/cambioTitular/**").hasAnyRole("AGENCIERO","ADMINISTRADOR")
            .requestMatchers(HttpMethod.POST, "/v1/cambioTitular").hasAnyRole("AGENCIERO","ADMINISTRADOR")
            .requestMatchers(HttpMethod.DELETE, "/v1/cambioTitular/**").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.POST, "/archivos/guardar/**").hasAnyRole("AGENCIERO", "ADMINISTRADOR")
            .requestMatchers(HttpMethod.GET, "/archivos/descargar/**").hasAnyRole("AGENCIERO","ADMINISTRADOR")
            .requestMatchers(  "/v1/authenticate", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html","/error").permitAll();
        })
        .addFilterBefore(jwtReqFilter, UsernamePasswordAuthenticationFilter.class)
        .sessionManagement( (session) -> session 
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );
        http.httpBasic(Customizer.withDefaults());
        http.csrf( csrf -> csrf.disable());
        
        return http.build();
    }
    
    @Bean 
    AuthenticationManager authenticationManager(AuthenticationConfiguration 
            authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
