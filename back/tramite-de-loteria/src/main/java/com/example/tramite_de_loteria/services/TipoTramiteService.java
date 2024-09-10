package com.example.tramite_de_loteria.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tramite_de_loteria.model.TipoTramite;

import com.example.tramite_de_loteria.repository.TipoTramiteRespository;

@Service
public class TipoTramiteService {

    @Autowired
    private TipoTramiteRespository tipoTramiteRepository;
    
    public List<TipoTramite> obtenerTodosLosTiposTramites(){
        return tipoTramiteRepository.findAll();
    }
}
