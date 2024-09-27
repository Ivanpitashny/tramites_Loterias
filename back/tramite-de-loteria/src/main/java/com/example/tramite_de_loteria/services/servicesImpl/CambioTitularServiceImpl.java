package com.example.tramite_de_loteria.services.servicesImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.tramite_de_loteria.dao.CambioTitularDao;
import com.example.tramite_de_loteria.model.CambioTitular;
import com.example.tramite_de_loteria.response.CambioTitularResponseRest;
import com.example.tramite_de_loteria.services.CambioTitularService;

@Service
public class CambioTitularServiceImpl implements CambioTitularService{

    private static final Logger log = LoggerFactory.getLogger(CambioTitularServiceImpl.class);

    @Autowired
    private CambioTitularDao cambioTitularDao;

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<CambioTitularResponseRest> obtenerCambioTitular() {
        log.info("Inicio método obtenerCambioTitular");
        CambioTitularResponseRest response = new CambioTitularResponseRest();
            
        try {
            List<CambioTitular> cambioTitularList = (List<CambioTitular>) cambioTitularDao.findAll();
            response.getCambioTitularResponse().setCambioTitular(cambioTitularList);
            response.setMetada("Respuesta ok", "00", "Cambios de titular encontrados");
        } catch (Exception e) {
            log.error("Error al obtener cambios de titular: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al obtener cambios de titular");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
            
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<CambioTitularResponseRest> obtenerCambioTitularPorId(Integer id) {
        log.info("Inicio método obtenerCambioTitularPorId");
        CambioTitularResponseRest response = new CambioTitularResponseRest();
        List<CambioTitular> list = new ArrayList<>();
            
        try {
            Optional<CambioTitular> cambioTitular = cambioTitularDao.findById(id);
                
            if (cambioTitular.isPresent()) {
                list.add(cambioTitular.get());
                response.getCambioTitularResponse().setCambioTitular(list);
                response.setMetada("Respuesta ok", "00", "Cambio de titular encontrado");
            } else {
                log.error("Cambio de titular no encontrado con ID: " + id);
                response.setMetada("Respuesta nok", "-1", "Cambio de titular no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Error al obtener cambio de titular por ID: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al obtener cambio de titular");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
            
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<CambioTitularResponseRest> crearCambioTitular(CambioTitular cambioTitular) {
        log.info("Inicio método crearCambioTitular");
        CambioTitularResponseRest response = new CambioTitularResponseRest();
        List<CambioTitular> list = new ArrayList<>();
            
        try {
            CambioTitular cambioTitularGuardado = cambioTitularDao.save(cambioTitular);
            list.add(cambioTitularGuardado);
            response.getCambioTitularResponse().setCambioTitular(list);
            response.setMetada("Respuesta ok", "00", "Cambio de titular creado");
        } catch (Exception e) {
            log.error("Error al crear cambio de titular: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al crear cambio de titular");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
            
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<CambioTitularResponseRest> actualizarCambioTitular(CambioTitular cambioTitular, Integer id) {
        log.info("Inicio método actualizarCambioTitular");
        CambioTitularResponseRest response = new CambioTitularResponseRest();
            
        try {
            Optional<CambioTitular> cambioTitularExistente = cambioTitularDao.findById(id);
                
            if (cambioTitularExistente.isPresent()) {
                CambioTitular cambioTitularActualizado = cambioTitularExistente.get();
                    
                cambioTitularActualizado.setNuevoTitular(cambioTitular.getNuevoTitular());
                cambioTitularActualizado.setNuevoTitularEstado(cambioTitular.getNuevoTitularEstado());
                cambioTitularActualizado.setDniNuevoTitular(cambioTitular.getDniNuevoTitular());
                cambioTitularActualizado.setDniNuevoTitularEstado(cambioTitular.getDniNuevoTitularEstado());
                cambioTitularActualizado.setCertificadoConducta(cambioTitular.getCertificadoConducta());
                cambioTitularActualizado.setCertificadoConductaEstado(cambioTitular.getCertificadoConductaEstado());
                cambioTitularActualizado.setCertificadoRegistroDeudores(cambioTitular.getCertificadoRegistroDeudores());
                cambioTitularActualizado.setCertificadoRegistroDeudoresEstado(cambioTitular.getCertificadoRegistroDeudoresEstado());
                cambioTitularActualizado.setNotaLibreDeuda(cambioTitular.getNotaLibreDeuda());
                cambioTitularActualizado.setNotaLibreDeudaEstado(cambioTitular.getNotaLibreDeudaEstado());
                cambioTitularActualizado.setContratoSocial(cambioTitular.getContratoSocial());
                cambioTitularActualizado.setContratoSocialEstado(cambioTitular.getContratoSocialEstado());
                cambioTitularActualizado.setEstatuto(cambioTitular.getEstatuto());
                cambioTitularActualizado.setEstatutoEstado(cambioTitular.getEstatutoEstado());
                cambioTitularActualizado.setObjetoSocial(cambioTitular.getObjetoSocial());
                cambioTitularActualizado.setObjetoSocialEstado(cambioTitular.getObjetoSocialEstado());
                cambioTitularActualizado.setCuentaBancaria(cambioTitular.getCuentaBancaria());
                cambioTitularActualizado.setCuentaBancariaEstado(cambioTitular.getCuentaBancariaEstado());

                cambioTitularDao.save(cambioTitularActualizado);

                response.getCambioTitularResponse().setCambioTitular(List.of(cambioTitularActualizado));
                response.setMetada("Respuesta ok", "00", "Cambio de titular actualizado");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                log.error("Cambio de titular no encontrado con ID: " + id);
                response.setMetada("Respuesta nok", "-1", "Cambio de titular no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Error al actualizar cambio de titular: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al actualizar cambio de titular");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<CambioTitularResponseRest> eliminarCambioTitular(Integer id) {
        log.info("Inicio método eliminarCambioTitular");
        CambioTitularResponseRest response = new CambioTitularResponseRest();
            
        try {
            Optional<CambioTitular> cambioTitularExistente = cambioTitularDao.findById(id);
                
            if (cambioTitularExistente.isPresent()) {
                cambioTitularDao.deleteById(id);
                response.setMetada("Respuesta ok", "00", "Cambio de titular eliminado con éxito");
            } else {
                log.error("Cambio de titular no encontrado con ID: " + id);
                response.setMetada("Respuesta nok", "-1", "Cambio de titular no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Error al eliminar cambio de titular: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al eliminar cambio de titular");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
            
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
        
}
