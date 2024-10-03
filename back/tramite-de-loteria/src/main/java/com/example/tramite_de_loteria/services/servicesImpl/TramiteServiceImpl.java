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

import com.example.tramite_de_loteria.dao.TramiteDao;
import com.example.tramite_de_loteria.model.Tramite;
import com.example.tramite_de_loteria.response.TramiteResponseRest;
import com.example.tramite_de_loteria.services.TramiteService;

@Service
public class TramiteServiceImpl implements TramiteService{

    private static final Logger log = LoggerFactory.getLogger(UsuarioServiceImpl.class);

    @Autowired
    private TramiteDao tramiteDao;

    @Override
    public ResponseEntity<TramiteResponseRest> obtenerTramites() {
        log.info("Inicio metodo buscarUsuarios()");
        
        TramiteResponseRest response = new TramiteResponseRest();

        try {
            List<Tramite> tramite = (List<Tramite>) tramiteDao.findAll();
			
			response.getTramiteResponse().setTramite(tramite);
			
			response.setMetada("Respuesta ok", "00", "Respuesta exitosa");
			
		} catch (Exception e) {
			response.setMetada("Respuesta nok","-1", "Error al consultar tramites");
			log.error("error al consultar tramites: ", e.getMessage());
			e.getStackTrace();
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<TramiteResponseRest> obtenerTramitesPorId(Integer id) {
        log.info("Inicio metodo obtenerTramitesPorId");
		
		TramiteResponseRest response = new TramiteResponseRest();
		List<Tramite> list = new ArrayList<>();
		
		try {
			Optional<Tramite> tramite = tramiteDao.findById(id);
			
			if (tramite.isPresent()) {
				list.add(tramite.get());
				response.getTramiteResponse().setTramite(list);
				
			} else {
				log.error("Error al consultar tramite");
				response.setMetada("Respuesta nok","-1" ,"Tramite no encontrado");
				return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			log.error("Error al consultar usuario");
			response.setMetada("Respuesta nok","-1" ,"Error al consultar tramite");
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.setMetada("Respuesta ok", "00", "Respuesta exitosa");
		return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<TramiteResponseRest> obtenerTramitesPorIdUsuario(Integer usuarioId) {
        log.info("Inicio metodo obtenerTramitesPorIdUsuario");
        
        TramiteResponseRest response = new TramiteResponseRest();
        
        try {
            List<Tramite> tramites = tramiteDao.findByUsuarioId(usuarioId);
            
            if (!tramites.isEmpty()) {
                response.getTramiteResponse().setTramite(tramites);
                response.setMetada("Respuesta ok", "00", "Tramites encontrados");
            } else {
                log.info("No se encontraron tramites para el usuario con id " + usuarioId);
                response.setMetada("Respuesta ok", "01", "No se encontraron trámites para el usuario");
            }
            
        } catch (Exception e) {
            log.error("Error al consultar tramites por usuario", e);
            response.setMetada("Respuesta nok", "-1", "Error al consultar tramites por usuario");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @Override
    public ResponseEntity<TramiteResponseRest> crearTramite(Tramite tramite) {
        log.info("Inicio metodo crear Tramite");
        TramiteResponseRest response = new TramiteResponseRest();
        List<Tramite> list = new ArrayList<>();
        
        try {
            Tramite tramiteGuardado = tramiteDao.save(tramite);
            if (tramiteGuardado != null) {
                list.add(tramiteGuardado);
                response.getTramiteResponse().setTramite(list);
            }
        } catch (Exception e) {
            log.error("Error en grabar Tramite: ", e);
            response.setMetada("Respuesta nok","-1", "Error al grabar Tramite");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.setMetada("Respuesta ok", "00", "Tramite Creado");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<TramiteResponseRest> actualizarTramite(Tramite tramite, Integer id) {
        log.info("Inicio metodo actualizarTramite");
        TramiteResponseRest response = new TramiteResponseRest();

        try {
            Optional<Tramite> tramiteExistente = tramiteDao.findById(id);
            
            if (tramiteExistente.isPresent()) {
                Tramite tramiteActualizado = tramiteExistente.get();
                
                tramiteActualizado.setTipo(tramite.getTipo());
                tramiteActualizado.setEstado(tramite.getEstado());
                tramiteActualizado.setFechaInicio(tramite.getFechaInicio());
                tramiteActualizado.setFechaFin(tramite.getFechaFin());
                tramiteActualizado.setUsuarioId(tramite.getUsuarioId());
                
                tramiteDao.save(tramiteActualizado);
                
                response.getTramiteResponse().setTramite(List.of(tramiteActualizado));
                response.setMetada("Respuesta ok", "00", "Tramite actualizado");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                log.error("Tramite no encontrado con ID: " + id);
                response.setMetada("Respuesta nok", "-1", "Tramite no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Error al actualizar tramite: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al actualizar tramite");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<TramiteResponseRest> eliminarTramite(Integer id) {
        log.info("Inicio metodo eliminarTramite");
        TramiteResponseRest response = new TramiteResponseRest();

        try {
            Optional<Tramite> tramiteExistente = tramiteDao.findById(id);
            
            if (tramiteExistente.isPresent()) {
                tramiteDao.deleteById(id);
                response.setMetada("Respuesta ok", "00", "Tramite eliminado con éxito");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                log.error("Tramite no encontrado con ID: " + id);
                response.setMetada("Respuesta nok", "-1", "Tramite no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Error al eliminar tramite: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al eliminar tramite");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
