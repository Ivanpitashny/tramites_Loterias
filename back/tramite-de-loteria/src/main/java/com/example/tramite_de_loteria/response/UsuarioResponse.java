package com.example.tramite_de_loteria.response;

import java.util.List;

import com.example.tramite_de_loteria.model.Usuario;

public class UsuarioResponse {

    private List<Usuario> usuarios;

    public List<Usuario> getUsuarios(){
        return usuarios;
    }

    public void setUsuarios(List<Usuario> usuario){
        this.usuarios = usuario;
    }

}
