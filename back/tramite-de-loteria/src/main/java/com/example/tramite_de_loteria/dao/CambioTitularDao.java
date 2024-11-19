package com.example.tramite_de_loteria.dao;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.tramite_de_loteria.model.CambioTitular;

public interface CambioTitularDao extends CrudRepository<CambioTitular, Integer>{
    
    Optional<CambioTitular> findByTramiteId(Integer tramiteId);
}
