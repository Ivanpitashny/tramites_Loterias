package com.example.tramite_de_loteria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tramite_de_loteria.model.Usuario;
import com.example.tramite_de_loteria.response.UsuarioResponseRest;
import com.example.tramite_de_loteria.services.UsuarioService;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/v1")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping("/usuarios")
    public ResponseEntity<UsuarioResponseRest> obtenerUsuarios() {
        ResponseEntity<UsuarioResponseRest> response = service.obtenerUsuarios();
        return response;
    }

    @GetMapping("/usuarios/{id}")
	public ResponseEntity<UsuarioResponseRest> obtenerUsuarioPorId(@PathVariable Integer id) {
		ResponseEntity<UsuarioResponseRest> response = service.obtenerUsuarioPorId(id);
		return response;
	}

    @PostMapping("/usuarios")
    public ResponseEntity<UsuarioResponseRest> crearUsuario(@RequestBody Usuario request) {
        ResponseEntity<UsuarioResponseRest> response = service.crearUsuario(request);
        return response;
    }
    
    @PutMapping("usuarios/{id}")
    public ResponseEntity<UsuarioResponseRest> actualizarUsuario(@RequestBody Usuario request, @PathVariable Integer id) {
        ResponseEntity<UsuarioResponseRest> response = service.actualizarUsuario(request, id);
        return response;
    }

    @DeleteMapping("usuarios/{id}")
    public ResponseEntity<UsuarioResponseRest> eliminarUsuario(@PathVariable Integer id){
        ResponseEntity<UsuarioResponseRest> response = service.eliminarUsuario(id);
        return response;
    }
}
