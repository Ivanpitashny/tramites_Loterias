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

import com.example.tramite_de_loteria.model.CambioDomicilio;
import com.example.tramite_de_loteria.response.CambioDomicilioResponseRest;
import com.example.tramite_de_loteria.services.CambioDomicilioService;
import com.example.tramite_de_loteria.services.servicesImpl.CambioDomicilioServiceImpl;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/v1")
public class CambioDomicilioController {
    
    @Autowired
    private CambioDomicilioService service;

    @Autowired
    private CambioDomicilioServiceImpl cambioDomicilioServiceImpl;

    @GetMapping("/cambioDomicilio")
    public ResponseEntity<CambioDomicilioResponseRest> obtenerCambioDomicilio(){
        ResponseEntity<CambioDomicilioResponseRest> response = service.obtenerCambioDomicilio();
        return response;
    }

    @GetMapping("/cambioDomicilio/{id}")
    public ResponseEntity<CambioDomicilioResponseRest> obtenerCambioDomicilioPorId(@PathVariable Integer id){
        ResponseEntity<CambioDomicilioResponseRest> response = cambioDomicilioServiceImpl.obtenerCambioDomicilioPorId(id);
        return response;
    }

        @GetMapping("/cambioDomicilio/tramite/{id}")
    public ResponseEntity<CambioDomicilioResponseRest> obtenerCambioTitularPorTramiteId(@PathVariable Integer id){
        ResponseEntity<CambioDomicilioResponseRest> response = cambioDomicilioServiceImpl.obtenerCambioDomicilioPorTramite(id);
        return response;
    }

    @PostMapping("/cambioDomicilio")
    public ResponseEntity<CambioDomicilioResponseRest> crearCambioDomicilio(@RequestBody CambioDomicilio request) {
        ResponseEntity<CambioDomicilioResponseRest> response = cambioDomicilioServiceImpl.crearCambioDomicilio(request);
        return response;
    }
    
    @PutMapping("cambioDomicilio/{id}")
    public ResponseEntity<CambioDomicilioResponseRest> actualizarCambioDomicilio(@RequestBody CambioDomicilio request, @PathVariable Integer id) {
        ResponseEntity<CambioDomicilioResponseRest> response = service.actualizarCambioDomicilio(request, id);
        return response;
    }

    @DeleteMapping("cambioDomicilio/{id}")
    public ResponseEntity<CambioDomicilioResponseRest> eliminarCambioDomicilio(@PathVariable Integer id){
        ResponseEntity<CambioDomicilioResponseRest> response = service.eliminarCambioDomicilio(id);
        return response;
    }
}
