package com.example.tramite_de_loteria.dao;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.tramite_de_loteria.model.CambioDomicilio;

public interface CambioDomicilioDao extends CrudRepository<CambioDomicilio, Integer>{
    
        Optional<CambioDomicilio> findByTramiteId(Integer tramiteId);
}
