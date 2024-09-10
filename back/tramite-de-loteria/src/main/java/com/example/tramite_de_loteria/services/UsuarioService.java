package com.example.tramite_de_loteria.services;

import org.springframework.http.ResponseEntity;

import com.example.tramite_de_loteria.model.Usuario;
import com.example.tramite_de_loteria.response.UsuarioResponseRest;

public interface UsuarioService {

    public ResponseEntity<UsuarioResponseRest> obtenerUsuarios();

    public ResponseEntity<UsuarioResponseRest> obtenerUsuarioPorId(Integer id);
    
    public ResponseEntity<UsuarioResponseRest> crearUsuario(Usuario usuario);

    public ResponseEntity<UsuarioResponseRest> actualizarUsuario(Usuario usuario, Integer id);

    public ResponseEntity<UsuarioResponseRest> eliminarUsuario(Integer id);
}
