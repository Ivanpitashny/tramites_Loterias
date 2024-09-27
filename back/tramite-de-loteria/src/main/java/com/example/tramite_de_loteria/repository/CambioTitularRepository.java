package com.example.tramite_de_loteria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tramite_de_loteria.model.CambioTitular;

public interface CambioTitularRepository extends JpaRepository<CambioTitular, Integer> {
    
}
