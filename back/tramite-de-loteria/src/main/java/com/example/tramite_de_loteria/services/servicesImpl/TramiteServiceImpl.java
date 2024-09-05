package com.example.tramite_de_loteria.services.servicesImpl;

import java.util.List;

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
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'obtenerTramitesPorId'");
    }

    @Override
    public ResponseEntity<TramiteResponseRest> crearTramite(Tramite tramite) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'crearTramite'");
    }

    @Override
    public ResponseEntity<TramiteResponseRest> actualizarTramite(Tramite tramite, Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'actualizarTramite'");
    }

    @Override
    public ResponseEntity<TramiteResponseRest> eliminarTramite(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'eliminarTramite'");
    }
    
}
