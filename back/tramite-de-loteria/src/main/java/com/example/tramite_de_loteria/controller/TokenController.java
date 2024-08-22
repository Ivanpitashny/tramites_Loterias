package com.example.tramite_de_loteria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tramite_de_loteria.request.AuthRequest;
import com.example.tramite_de_loteria.response.TokenResponse;
import com.example.tramite_de_loteria.services.JwtService;

@RestController
@RequestMapping("/v1")
public class TokenController {
    @Autowired
	private AuthenticationManager authenticacionManager;
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Autowired
	private JwtService jwtService;
	
	@PostMapping("/authenticate")
	public ResponseEntity<TokenResponse> authenticate(@RequestBody AuthRequest request){
		authenticacionManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getUsuario(), request.getContrasenia()));
		final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsuario());
		final String jwt = jwtService.generateToken(userDetails);
		return ResponseEntity.ok(new TokenResponse(jwt));
		
	}
}
