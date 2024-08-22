package com.example.tramite_de_loteria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tramite_de_loteria.model.Tramite;
import com.example.tramite_de_loteria.repository.TramiteRepository;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api")
public class TramiteController {
    
    @Autowired
    private TramiteRepository repository;

    @GetMapping("/tramites")
    public List<Tramite> obtenerTramites() {
        return repository.findAll();
    }
    
}
