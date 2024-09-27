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

import com.example.tramite_de_loteria.model.Tramite;
import com.example.tramite_de_loteria.response.TramiteResponseRest;
import com.example.tramite_de_loteria.services.TramiteService;
import com.example.tramite_de_loteria.services.servicesImpl.TramiteServiceImpl;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/v1")
public class TramiteController {
    
    @Autowired
    private TramiteService service;

    @Autowired
    private TramiteServiceImpl tramiteServiceImpl;
    
    @GetMapping("/tramites")
    public ResponseEntity<TramiteResponseRest> obtenerTramites(){
        ResponseEntity<TramiteResponseRest> response = service.obtenerTramites();
        return response;
    }

    @GetMapping("/tramites/{id}")
    public ResponseEntity<TramiteResponseRest> obtenerTramitesPorId(@PathVariable Integer id){
        ResponseEntity<TramiteResponseRest> response = tramiteServiceImpl.obtenerTramitesPorId(id);
        return response;
    }

    @GetMapping("/tramites/{id}/usuarios")
    public ResponseEntity<TramiteResponseRest> obtenerTramitesPorIdUsuario(@PathVariable("id") Integer usuarioId){
        ResponseEntity<TramiteResponseRest> response = tramiteServiceImpl.obtenerTramitesPorIdUsuario(usuarioId);
        return response;
    }

    @PostMapping("/tramites")
    public ResponseEntity<TramiteResponseRest> crearTramite(@RequestBody Tramite request) {
        ResponseEntity<TramiteResponseRest> response = tramiteServiceImpl.crearTramite(request);
        return response;
    }
    
    @PutMapping("tramites/{id}")
    public ResponseEntity<TramiteResponseRest> actualizartramite(@RequestBody Tramite request, @PathVariable Integer id) {
        ResponseEntity<TramiteResponseRest> response = service.actualizarTramite(request, id);
        return response;
    }

    @DeleteMapping("tramites/{id}")
    public ResponseEntity<TramiteResponseRest> eliminartramite(@PathVariable Integer id){
        ResponseEntity<TramiteResponseRest> response = service.eliminarTramite(id);
        return response;
    }
    
}
