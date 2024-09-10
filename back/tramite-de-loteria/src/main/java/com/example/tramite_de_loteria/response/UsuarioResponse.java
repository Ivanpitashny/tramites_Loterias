package com.example.tramite_de_loteria.response;

import java.util.List;

import com.example.tramite_de_loteria.model.Usuario;


public class UsuarioResponse {
    private List<Usuario> usuario;

    public List<Usuario> getUsuario(){
        return usuario;
    }

    public void setUsuario(List<Usuario> usuario2){
        this.usuario = usuario2;
    }
}
