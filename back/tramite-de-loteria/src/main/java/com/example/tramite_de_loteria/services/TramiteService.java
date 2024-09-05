package com.example.tramite_de_loteria.services;

import org.springframework.http.ResponseEntity;

import com.example.tramite_de_loteria.model.Tramite;
import com.example.tramite_de_loteria.response.TramiteResponseRest;

public interface TramiteService {
    public ResponseEntity<TramiteResponseRest> obtenerTramites();

    public ResponseEntity<TramiteResponseRest> obtenerTramitesPorId(Integer id);
    
    public ResponseEntity<TramiteResponseRest> crearTramite(Tramite tramite);

    public ResponseEntity<TramiteResponseRest> actualizarTramite(Tramite tramite, Integer id);

    public ResponseEntity<TramiteResponseRest> eliminarTramite(Integer id);
}
