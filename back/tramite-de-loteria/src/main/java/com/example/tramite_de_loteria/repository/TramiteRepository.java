package com.example.tramite_de_loteria.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import com.example.tramite_de_loteria.model.Tramite;


public interface TramiteRepository extends JpaRepository<Tramite, Integer>{

    Optional<Tramite> getTramitePorId(Long id);

    ResponseEntity<Tramite> getTramitePorNombre();

    ResponseEntity<Tramite> actualizarTramite(Tramite tramite, Long id);

    ResponseEntity<Tramite> borrarTramite(Long id);

    ResponseEntity<Tramite> crearTramite(Tramite tramite);
    
}
