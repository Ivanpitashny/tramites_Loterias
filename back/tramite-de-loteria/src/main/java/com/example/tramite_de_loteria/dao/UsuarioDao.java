package com.example.tramite_de_loteria.dao;

import org.springframework.data.repository.CrudRepository;

import com.example.tramite_de_loteria.model.Usuario;

public interface UsuarioDao extends CrudRepository<Usuario, Integer>{

    Usuario findByUsername(String username);
    
}
