package com.example.tramite_de_loteria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tramite_de_loteria.services.TipoTramiteService;


@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/v1")
public class TipoTramiteController {

    @Autowired
    private TipoTramiteService service;
}
