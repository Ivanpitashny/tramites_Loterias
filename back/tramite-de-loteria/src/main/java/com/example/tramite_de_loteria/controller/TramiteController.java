package com.example.tramite_de_loteria.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tramite_de_loteria.model.Tramite;
import com.example.tramite_de_loteria.repository.TramiteRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@RequestMapping("/api")
public class TramiteController {
    
    @Autowired
    private TramiteRepository repository;

    @GetMapping("/tramites")
    public List<Tramite> obtenerTramites() {
        return repository.findAll();
    }
    
    @GetMapping("/tramites/{id}")
    public Optional<Tramite> getTramiteById(@RequestParam Long id) {
        Optional<Tramite> tramite = repository.getTramitePorId(id);
        return tramite;
    }

    @PutMapping("/tramite/{id}")
    public ResponseEntity<Tramite> actualizarTramite(@RequestBody Tramite tramite, @RequestBody Long id) {
        ResponseEntity<Tramite> response = repository.actualizarTramite(tramite, id);
        return response;
    }

    @PostMapping("/tramites")
    public ResponseEntity<Tramite> crearTramite(@RequestBody Tramite entity) {
        ResponseEntity<Tramite> response = repository.crearTramite(entity);
        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Tramite> eliminarTramite(@RequestParam Long id) {
        ResponseEntity<Tramite> response = repository.borrarTramite(id);
        return response;
    }
    
    
}
