package com.example.tramite_de_loteria.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tramite_de_loteria.model.Usuario;
import com.example.tramite_de_loteria.request.AuthRequest;
import com.example.tramite_de_loteria.response.TokenResponse;
import com.example.tramite_de_loteria.services.JwtService;
import com.example.tramite_de_loteria.services.servicesImpl.UsuarioServiceImpl;



@RestController
@RequestMapping("/v1")
public class TokenController {
    @Autowired
	private AuthenticationManager authenticacionManager;
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Autowired
    private UsuarioServiceImpl usuarioService; 
	
	@Autowired
	private JwtService jwtService;

	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody AuthRequest request) {
		try {
			// Autenticación
			authenticacionManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getUsuario(), request.getContrasenia()));
			
			// Cargar detalles del usuario y generar el token JWT
			final Usuario userDetails = (Usuario) usuarioService.loadUserByUsername(request.getUsuario());
			final String jwt = jwtService.generateToken(userDetails);
			
			// Devolver respuesta exitosa con el token JWT
			return ResponseEntity.ok(new TokenResponse(jwt));
		} catch (Exception e) {
			// En caso de error, devolver estado UNAUTHORIZED y un mensaje de error
			Map<String, String> errorResponse = Collections.singletonMap("error", "Credenciales inválidas");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
		}
	}
	
}
