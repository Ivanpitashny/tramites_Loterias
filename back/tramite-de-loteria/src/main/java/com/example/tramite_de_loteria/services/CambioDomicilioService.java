package com.example.tramite_de_loteria.services;

import org.springframework.http.ResponseEntity;

import com.example.tramite_de_loteria.model.CambioDomicilio;
import com.example.tramite_de_loteria.response.CambioDomicilioResponseRest;

public interface CambioDomicilioService {
    public ResponseEntity<CambioDomicilioResponseRest> obtenerCambioDomicilio();

    public ResponseEntity<CambioDomicilioResponseRest> obtenerCambioDomicilioPorId(Integer id);
    
    public ResponseEntity<CambioDomicilioResponseRest> crearCambioDomicilio(CambioDomicilio cambioDomicilio);

    public ResponseEntity<CambioDomicilioResponseRest> actualizarCambioDomicilio(CambioDomicilio cambioDomicilio, Integer id);

    public ResponseEntity<CambioDomicilioResponseRest> eliminarCambioDomicilio(Integer id);
}
