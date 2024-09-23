package com.example.tramite_de_loteria.dao;

import java.util.List; 
import org.springframework.data.repository.CrudRepository;

import com.example.tramite_de_loteria.model.Tramite;

public interface TramiteDao extends CrudRepository<Tramite, Integer> {

    List<Tramite> findByUsuarioId(Integer usuarioId);

}
