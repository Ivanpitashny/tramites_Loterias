package com.example.tramite_de_loteria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tramite_de_loteria.model.Usuario;
import com.example.tramite_de_loteria.repository.UsuarioRepository;


@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/v1")
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository repository;

    @GetMapping("/usuarios")
    public List<Usuario> obtenerUsuarios(){
        return repository.findAll();
    }
}
