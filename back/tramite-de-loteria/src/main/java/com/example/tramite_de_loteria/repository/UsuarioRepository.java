package com.example.tramite_de_loteria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tramite_de_loteria.model.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
    
}
