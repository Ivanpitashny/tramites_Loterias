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

import com.example.tramite_de_loteria.dao.UsuarioDao;
import com.example.tramite_de_loteria.model.Autorizacion;
import com.example.tramite_de_loteria.model.Usuario;
import com.example.tramite_de_loteria.response.AutorizacionResponseRest;
import com.example.tramite_de_loteria.response.UsuarioResponseRest;
import com.example.tramite_de_loteria.services.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService{

    private static final Logger log = LoggerFactory.getLogger(UsuarioServiceImpl.class);

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private AutorizacionServiceImpl autorizacionService;

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<UsuarioResponseRest> obtenerUsuarios() {
        log.info("Inicio metodo buscarUsuarios()");
        
        UsuarioResponseRest response = new UsuarioResponseRest();

        try {
            List<Usuario> usuario = (List<Usuario>) usuarioDao.findAll();
			
			response.getUsuarioResponse().setUsuario(usuario);
			
			response.setMetada("Respuesta ok", "00", "Respuesta exitosa");
			
		} catch (Exception e) {
			response.setMetada("Respuesta nok","-1", "Error al consultar usuarios");
			log.error("error al consultar usuarios: ", e.getMessage());
			e.getStackTrace();
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

    @Override
    public ResponseEntity<UsuarioResponseRest> obtenerUsuarioPorId(Integer id) {
        log.info("Inicio metodo obtenerUsuarioPorId");
		
		UsuarioResponseRest response = new UsuarioResponseRest();
		List<Usuario> list = new ArrayList<>();
		
		try {
			Optional<Usuario> usuario = usuarioDao.findById(id);
			
			if (usuario.isPresent()) {
				list.add(usuario.get());
				response.getUsuarioResponse().setUsuario(list);
				
			} else {
				log.error("Error al consultar usuario");
				response.setMetada("Respuesta nok","-1" ,"Usuario no encontrado");
				return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			log.error("Error al consultar usuario");
			response.setMetada("Respuesta nok","-1" ,"Error al consultar usuario");
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.setMetada("Respuesta ok", "00", "Respuesta exitosa");
		return new ResponseEntity<>(response, HttpStatus.OK); // devuelve 200
    }

    @Override
    public ResponseEntity<UsuarioResponseRest> crearUsuario(Usuario usuario) {
        log.info("Inicio metodo crearUsuario");
        UsuarioResponseRest response = new UsuarioResponseRest();
        List<Usuario> list = new ArrayList<>();
        try {
            
            Usuario usuarioGuardado = usuarioDao.save(usuario);
            
            if (usuarioGuardado != null) {
                list.add(usuarioGuardado);
                response.getUsuarioResponse().setUsuario(list);
                
                // creacion autorizacion
                Autorizacion autorizacion = new Autorizacion();
                autorizacion.setUsername(usuarioGuardado.getUsername());
                if (usuarioGuardado.getTipo() == 1) {
                    autorizacion.setAutorizacion("ROLE_ADMINISTRADOR");
                }else if(usuarioGuardado.getTipo() == 2){
                    autorizacion.setAutorizacion("ROLE_AGENCIERO");
                }else {
                    autorizacion.setAutorizacion("");
                }

                ResponseEntity<AutorizacionResponseRest> autorizacionResponse = autorizacionService.crearAutorizacion(autorizacion);
                
                if(autorizacionResponse.getStatusCode() != HttpStatus.OK) {
                    log.error("Error en crear la autorización para el usuario");
                    response.setMetada("Respuesta nok", "-1", "Usuario creado, pero autorización no asignada");
                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                }
            } else {
                log.error("Error en grabar usuario");
                response.setMetada("Respuesta nok","-1", "Usuario no guardado");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("Error en grabar usuario: ", e);
            response.setMetada("Respuesta nok","-1", "Error al grabar usuario");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.setMetada("Respuesta ok", "00", "Usuario Creada");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<UsuarioResponseRest> actualizarUsuario(Usuario usuario, Integer id) {
        log.info("Inicio metodo actualizarUsuario");

        UsuarioResponseRest response = new UsuarioResponseRest();
        List<Usuario> list = new ArrayList<>();

        try {
            Optional<Usuario> usuarioBuscado = usuarioDao.findById(id);

            if (usuarioBuscado.isPresent()) {
                Usuario usuarioExistente = usuarioBuscado.get();

                usuarioExistente.setUsername(usuario.getUsername());
                usuarioExistente.setPassword(usuario.getPassword());

                Usuario usuarioActualizado = usuarioDao.save(usuarioExistente);

                list.add(usuarioActualizado);
                response.getUsuarioResponse().setUsuario(list);

                response.setMetada("Respuesta ok", "00", "Usuario actualizado exitosamente");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                log.error("Usuario con id " + id + " no encontrado");
                response.setMetada("Respuesta nok", "-1", "Usuario no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Error al actualizar usuario: ", e);
            response.setMetada("Respuesta nok", "-1", "Error al actualizar usuario");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<UsuarioResponseRest> eliminarUsuario(Integer id) {
        log.info("Inicio del metodo eliminarUsuario()");

        UsuarioResponseRest response = new UsuarioResponseRest();

        try{
            usuarioDao.deleteById(id);
            response.setMetada("Respuesta Ok", "00", "Usuario Eliminado");
        } catch (Exception e){
            log.error("Error en eliminar usuario",e.getMessage());
            e.getStackTrace();
            response.setMetada("Respuesta nok", "-1", "Usuario no Eliminado");
            return new ResponseEntity<UsuarioResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.setMetada("Respuesta ok", "00", "Respuesta exitosa");
		return new ResponseEntity<UsuarioResponseRest>(response, HttpStatus.OK); // devuelve 200
    }


}
