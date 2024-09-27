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

import com.example.tramite_de_loteria.dao.CambioDomicilioDao;
import com.example.tramite_de_loteria.model.CambioDomicilio;
import com.example.tramite_de_loteria.response.CambioDomicilioResponseRest;
import com.example.tramite_de_loteria.services.CambioDomicilioService;

@Service
public class CambioDomicilioServiceImpl implements CambioDomicilioService{

    private static final Logger log = LoggerFactory.getLogger(CambioDomicilioServiceImpl.class);

    @Autowired
    private CambioDomicilioDao cambioDomicilioDao;

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<CambioDomicilioResponseRest> obtenerCambioDomicilio() {
        log.info("Inicio método obtenerCambioDomicilio");
        CambioDomicilioResponseRest response = new CambioDomicilioResponseRest();

        try {
            List<CambioDomicilio> cambioDomicilioList = (List<CambioDomicilio>) cambioDomicilioDao.findAll();
            response.getCambioDomicilioResponse().setCambioDomicilio(cambioDomicilioList);
            response.setMetada("Respuesta ok", "00", "Cambios de domicilio encontrados");
        } catch (Exception e) {
            log.error("Error al obtener cambios de domicilio: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al obtener cambios de domicilio");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<CambioDomicilioResponseRest> obtenerCambioDomicilioPorId(Integer id) {
        log.info("Inicio método obtenerCambioDomicilioPorId");
        CambioDomicilioResponseRest response = new CambioDomicilioResponseRest();
        List<CambioDomicilio> list = new ArrayList<>();

        try {
            Optional<CambioDomicilio> cambioDomicilio = cambioDomicilioDao.findById(id);

            if (cambioDomicilio.isPresent()) {
                list.add(cambioDomicilio.get());
                response.getCambioDomicilioResponse().setCambioDomicilio(list);
                response.setMetada("Respuesta ok", "00", "Cambio de domicilio encontrado");
            } else {
                log.error("Cambio de domicilio no encontrado con ID: " + id);
                response.setMetada("Respuesta nok", "-1", "Cambio de domicilio no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Error al obtener cambio de domicilio por ID: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al obtener cambio de domicilio");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<CambioDomicilioResponseRest> crearCambioDomicilio(CambioDomicilio cambioDomicilio) {
        log.info("Inicio método crearCambioDomicilio");
        CambioDomicilioResponseRest response = new CambioDomicilioResponseRest();
        List<CambioDomicilio> list = new ArrayList<>();

        try {
            CambioDomicilio cambioDomicilioGuardado = cambioDomicilioDao.save(cambioDomicilio);
            list.add(cambioDomicilioGuardado);
            response.getCambioDomicilioResponse().setCambioDomicilio(list);
            response.setMetada("Respuesta ok", "00", "Cambio de domicilio creado");
        } catch (Exception e) {
            log.error("Error al crear cambio de domicilio: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al crear cambio de domicilio");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<CambioDomicilioResponseRest> actualizarCambioDomicilio(CambioDomicilio cambioDomicilio, Integer id) {
        log.info("Inicio método actualizarCambioDomicilio");
        CambioDomicilioResponseRest response = new CambioDomicilioResponseRest();

        try {
            Optional<CambioDomicilio> cambioDomicilioExistente = cambioDomicilioDao.findById(id);

            if (cambioDomicilioExistente.isPresent()) {
                CambioDomicilio cambioDomicilioActualizado = cambioDomicilioExistente.get();

                cambioDomicilioActualizado.setNuevoDomicilio(cambioDomicilio.getNuevoDomicilio());
                cambioDomicilioActualizado.setNuevoDomicilioEstado(cambioDomicilio.getNuevoDomicilioEstado());
                cambioDomicilioActualizado.setSuperficie(cambioDomicilio.getSuperficie());
                cambioDomicilioActualizado.setSuperficieEstado(cambioDomicilio.getSuperficieEstado());
                cambioDomicilioActualizado.setUbicacion(cambioDomicilio.getUbicacion());
                cambioDomicilioActualizado.setUbicacionEstado(cambioDomicilio.getUbicacionEstado());
                cambioDomicilioActualizado.setVidriera(cambioDomicilio.getVidriera());
                cambioDomicilioActualizado.setVidrieraEstado(cambioDomicilio.getVidrieraEstado());
                cambioDomicilioActualizado.setNivelSocioeconomico(cambioDomicilio.getNivelSocioeconomico());
                cambioDomicilioActualizado.setNivelSocioeconomicoEstado(cambioDomicilio.getNivelSocioeconomicoEstado());
                cambioDomicilioActualizado.setMercadoZona(cambioDomicilio.getMercadoZona());
                cambioDomicilioActualizado.setMercadoZonaEstado(cambioDomicilio.getMercadoZonaEstado());
                cambioDomicilioActualizado.setRecaudacionEstimada(cambioDomicilio.getRecaudacionEstimada());
                cambioDomicilioActualizado.setRecaudacionEstimadaEstado(cambioDomicilio.getRecaudacionEstimadaEstado());
                cambioDomicilioActualizado.setDireccion(cambioDomicilio.getDireccion());
                cambioDomicilioActualizado.setDireccionEstado(cambioDomicilio.getDireccionEstado());
                cambioDomicilioActualizado.setLocalidad(cambioDomicilio.getLocalidad());
                cambioDomicilioActualizado.setLocalidadEstado(cambioDomicilio.getLocalidadEstado());
                cambioDomicilioActualizado.setDepartamento(cambioDomicilio.getDepartamento());
                cambioDomicilioActualizado.setDepartamentoEstado(cambioDomicilio.getDepartamentoEstado());

                cambioDomicilioDao.save(cambioDomicilioActualizado);

                response.getCambioDomicilioResponse().setCambioDomicilio(List.of(cambioDomicilioActualizado));
                response.setMetada("Respuesta ok", "00", "Cambio de domicilio actualizado");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                log.error("Cambio de domicilio no encontrado con ID: " + id);
                response.setMetada("Respuesta nok", "-1", "Cambio de domicilio no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Error al actualizar cambio de domicilio: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al actualizar cambio de domicilio");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<CambioDomicilioResponseRest> eliminarCambioDomicilio(Integer id) {
        log.info("Inicio método eliminarCambioDomicilio");
        CambioDomicilioResponseRest response = new CambioDomicilioResponseRest();

        try {
            Optional<CambioDomicilio> cambioDomicilioExistente = cambioDomicilioDao.findById(id);

            if (cambioDomicilioExistente.isPresent()) {
                cambioDomicilioDao.deleteById(id);
                response.setMetada("Respuesta ok", "00", "Cambio de domicilio eliminado con éxito");
            } else {
                log.error("Cambio de domicilio no encontrado con ID: " + id);
                response.setMetada("Respuesta nok", "-1", "Cambio de domicilio no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Error al eliminar cambio de domicilio: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al eliminar cambio de domicilio");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
}
