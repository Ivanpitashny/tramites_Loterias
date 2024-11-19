package com.example.tramite_de_loteria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tramite_de_loteria.model.CambioTitular;
import com.example.tramite_de_loteria.response.CambioTitularResponseRest;
import com.example.tramite_de_loteria.services.CambioTitularService;
import com.example.tramite_de_loteria.services.servicesImpl.CambioTitularServiceImpl;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/v1")
public class CambioTiularController {
    @Autowired
    private CambioTitularService service;

    @Autowired
    private CambioTitularServiceImpl cambioTitularServiceImpl;

    @GetMapping("/cambioTitular")
    public ResponseEntity<CambioTitularResponseRest> obtenercambioTitular(){
        ResponseEntity<CambioTitularResponseRest> response = service.obtenerCambioTitular();
        return response;
    }

    @GetMapping("/cambioTitular/{id}")
    public ResponseEntity<CambioTitularResponseRest> obtenerCambioTitularPorId(@PathVariable Integer id){
        ResponseEntity<CambioTitularResponseRest> response = cambioTitularServiceImpl.obtenerCambioTitularPorId(id);
        return response;
    }

    @GetMapping("/cambioTitular/tramite/{id}")
    public ResponseEntity<CambioTitularResponseRest> obtenerCambioTitularPorTramiteId(@PathVariable Integer id){
        ResponseEntity<CambioTitularResponseRest> response = cambioTitularServiceImpl.obtenerCambioTitularPorTramite(id);
        return response;
    }

    @PostMapping("/cambioTitular")
    public ResponseEntity<CambioTitularResponseRest> crearCambioTitular(@RequestBody CambioTitular request) {
        ResponseEntity<CambioTitularResponseRest> response = cambioTitularServiceImpl.crearCambioTitular(request);
        return response;
    }
    
    @PutMapping("cambioTitular/{id}")
    public ResponseEntity<CambioTitularResponseRest> actualizarCambioTitular(@RequestBody CambioTitular request, @PathVariable Integer id) {
        ResponseEntity<CambioTitularResponseRest> response = service.actualizarCambioTitular(request, id);
        return response;
    }

    @DeleteMapping("cambioTitular/{id}")
    public ResponseEntity<CambioTitularResponseRest> eliminarCambioTitular(@PathVariable Integer id){
        ResponseEntity<CambioTitularResponseRest> response = service.eliminarCambioTitular(id);
        return response;
    }
}
