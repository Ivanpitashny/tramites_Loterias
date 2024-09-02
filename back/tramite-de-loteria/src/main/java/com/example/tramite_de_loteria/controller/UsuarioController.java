package com.example.tramite_de_loteria.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tramite_de_loteria.model.Usuario;
import com.example.tramite_de_loteria.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;





@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository repository;

    @GetMapping
    public List<Usuario> obtenerUsuarios(){
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@RequestParam Long id) {
        ResponseEntity<Usuario>  usuario = repository.getUsuarioPorId(id);
        return usuario;
    }
    
    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario request) {
        ResponseEntity<Usuario> response = repository.crearUsuario(request);
        return response;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Usuario usuario, @RequestBody Long id) {
        ResponseEntity<Usuario> response =repository.actualizarUsuario(usuario, id);
        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Usuario> borrarUsuario(@RequestParam Long id){
        ResponseEntity<Usuario> response = repository.borrarUsuario(id);
        return response;
    }
    
}
