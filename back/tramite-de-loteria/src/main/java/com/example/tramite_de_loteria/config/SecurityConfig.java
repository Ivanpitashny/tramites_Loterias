package com.example.tramite_de_loteria.config;

import javax.sql.DataSource;

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
			return new JdbcUserDetailsManager(datasource);
		}

		@Bean
		public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
			
			http.authorizeHttpRequests( configure -> {
				configure
					.requestMatchers("/v1/api/usuarios", "/v1/authenticate", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll();
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

        
}
