package com.example.tramite_de_loteria.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.tramite_de_loteria.model.Autorizacion;
import com.example.tramite_de_loteria.response.AutorizacionResponseRest;

public interface AutorizacionService {

    public List<Autorizacion> obtenerAutorizacion(String username);

    public ResponseEntity<AutorizacionResponseRest> crearAutorizacion(Autorizacion autorizacion);

}
