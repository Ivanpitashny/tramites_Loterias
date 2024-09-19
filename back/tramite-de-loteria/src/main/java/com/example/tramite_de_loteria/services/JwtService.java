package com.example.tramite_de_loteria.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import com.example.tramite_de_loteria.model.Usuario;

@Service
public class JwtService {
	
	  private static final String JWT_SECRET_KEY = "ecommerce";

	  public static final long JWT_TOKEN_VALIDITY = 1000 * 60 * 60 * (long) 1; // 1 hora
	  //public static final long JWT_TOKEN_VALIDITY = 1000 * 10L; // 10 segundos

	  public String extractUsername(String token) {
	    return extractClaim(token, Claims::getSubject);
	  }

	  public Date extractExpiration(String token) {
	    return extractClaim(token, Claims::getExpiration);
	  }

	  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
	    return claimsResolver.apply(extractAllClaims(token));
	  }

	  private Claims extractAllClaims(String token) {
	    return Jwts.parser().setSigningKey(JWT_SECRET_KEY).parseClaimsJws(token).getBody();
	  }

	  private Boolean isTokenExpired(String token) {
	    return extractExpiration(token).before(new Date());
	  }

	  public String generateToken(Usuario userDetails) {
	    Map<String, Object> claims = new HashMap<>();
	    var rol = userDetails.getAuthorities().stream().collect(Collectors.toList()).get(0);
	    claims.put("rol", rol);
		claims.put("userId", userDetails.getId());
	    return createToken(claims, userDetails.getUsername());
	  }

	  private String createToken(Map<String, Object> claims, String subject) {

	    return Jwts
	        .builder()
	        .setClaims(claims)
	        .setSubject(subject)
	        .setIssuedAt(new Date(System.currentTimeMillis()))
	        .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
	        .signWith(SignatureAlgorithm.HS256, JWT_SECRET_KEY)
	        .compact();
	  }	

	  public boolean validateToken(String token, UserDetails userDetails) {
	    final String username = extractUsername(token);
	    return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	  }

}


