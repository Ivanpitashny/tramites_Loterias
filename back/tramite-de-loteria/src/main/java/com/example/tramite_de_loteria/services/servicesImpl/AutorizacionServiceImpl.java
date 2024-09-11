package com.example.tramite_de_loteria.services.servicesImpl;

import java.util.List;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.tramite_de_loteria.dao.AutorizacionDao;
import com.example.tramite_de_loteria.model.Autorizacion;
import com.example.tramite_de_loteria.response.AutorizacionResponseRest;
import com.example.tramite_de_loteria.services.AutorizacionService;

@Service
public class AutorizacionServiceImpl implements AutorizacionService{

    private static final Logger log = LoggerFactory.getLogger(AutorizacionServiceImpl.class);

    @Autowired
    private AutorizacionDao autorizacionDao;

    @Override
    public List<Autorizacion> obtenerAutorizacion(String username) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResponseEntity<AutorizacionResponseRest> crearAutorizacion(Autorizacion autorizacion) {
        log.info("Inicio Metodo de creacion de autorizacion");
        AutorizacionResponseRest response = new AutorizacionResponseRest();
        List<Autorizacion> list = new ArrayList<>();

        try {

            if ("ROLE_ADMINISTRADOR" == autorizacion.getAutorizacion().trim() || 
                            "ROLE_AGENCIERO" == autorizacion.getAutorizacion().trim()) {

                Autorizacion autorizacionGuardada = autorizacionDao.save(autorizacion);

                if (autorizacionGuardada != null) {
                    list.add(autorizacionGuardada);
                    response.getAutorizacionResponse().setAutorizacion(list);
                } else {
                    log.error("Autorizacion No Guardada");
                    response.setMetada("Respuesta Erronea", "-1", "Autorizacion no grabada");
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                    }
                } else {
                log.error("Rol no permitido: " + autorizacion.getAutorizacion());
                response.setMetada("Respuesta Erronea", "-1", "Rol no permitido");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }          
        } catch (Exception e) {
            log.error("Error en crear la Autorizacion",e);
            response.setMetada("Respuesta Erronea", "-1", "Error en Creacion de Autorizacion");
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.setMetada("Respuesta ok", "00", "Autorizacion Creada");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
