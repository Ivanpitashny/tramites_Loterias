package com.example.tramite_de_loteria.request;

import java.io.Serializable;

public class AuthRequest implements Serializable{
    
    private String usuario;
	private String contrasenia;
	
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getContrasenia() {
		return contrasenia;
	}
	public void setContrasenia(String contrasenia) {
		this.contrasenia = contrasenia;
	}
}
