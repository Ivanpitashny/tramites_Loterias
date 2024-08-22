package com.example.tramite_de_loteria.response;

public class TokenResponse {
    private String jwToken;

	public TokenResponse(String jwToken) {
		this.jwToken = jwToken;
	}

	public String getJwToken() {
		return jwToken;
	}

	public void setJwToken(String jwToken) {
		this.jwToken = jwToken;
	}
}
