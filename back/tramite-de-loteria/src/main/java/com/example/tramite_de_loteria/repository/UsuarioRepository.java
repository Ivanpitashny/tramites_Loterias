package com.example.tramite_de_loteria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import com.example.tramite_de_loteria.model.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    public ResponseEntity<Usuario> getUsuario();

    public ResponseEntity<Usuario> getUsuarioPorId(Long id);

    public ResponseEntity<Usuario> crearUsuario(Usuario usuario);

    public ResponseEntity<Usuario> actualizarUsuario(Usuario usuario, Long id);

    public ResponseEntity<Usuario> borrarUsuario(Long Id);
    
}
