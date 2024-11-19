package com.example.tramite_de_loteria.services;

import org.springframework.http.ResponseEntity;

import com.example.tramite_de_loteria.model.CambioTitular;
import com.example.tramite_de_loteria.response.CambioTitularResponseRest;

public interface CambioTitularService {
    public ResponseEntity<CambioTitularResponseRest> obtenerCambioTitular();

    public ResponseEntity<CambioTitularResponseRest> obtenerCambioTitularPorId(Integer id);
    
    public ResponseEntity<CambioTitularResponseRest> crearCambioTitular(CambioTitular cambioTitular);

    public ResponseEntity<CambioTitularResponseRest> actualizarCambioTitular(CambioTitular cambioTitular, Integer id);

    public ResponseEntity<CambioTitularResponseRest> eliminarCambioTitular(Integer id);

    public ResponseEntity<CambioTitularResponseRest> obtenerCambioTitularPorTramite(Integer id);
}
