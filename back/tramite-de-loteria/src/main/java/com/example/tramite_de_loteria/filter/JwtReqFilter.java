package com.example.tramite_de_loteria.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import com.example.tramite_de_loteria.services.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtReqFilter extends OncePerRequestFilter{
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");
        System.out.println("Authorization Header: " + authorizationHeader); // Log para el encabezado de autorización

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtService.extractUsername(jwt);

            // Logs para verificar el token y el nombre de usuario
            System.out.println("JWT Token: " + jwt);
            System.out.println("Extracted Username: " + username);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // Log para verificar los detalles del usuario
            System.out.println("User Details: " + userDetails);

            if (jwtService.validateToken(jwt, userDetails)) {

                System.out.println("User Authorities: " + userDetails.getAuthorities());

                // Log para verificar la validez del token
                System.out.println("Token is valid");

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                // Log para cuando el token no es válido
                System.out.println("Token is invalid");
            }
        }

        // Continuar con la cadena de filtros
        chain.doFilter(request, response);
    }

}
