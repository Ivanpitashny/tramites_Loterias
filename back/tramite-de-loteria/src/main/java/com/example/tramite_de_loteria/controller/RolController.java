package com.example.tramite_de_loteria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tramite_de_loteria.model.Rol;
import com.example.tramite_de_loteria.repository.RolRepository;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api")
public class RolController {
    
    @Autowired
    private RolRepository repository;

    @GetMapping("/rol")
    public List<Rol> ObtenerRoles() {
        return repository.findAll();
    }

    
    
}
