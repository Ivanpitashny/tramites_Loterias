package com.example.tramite_de_loteria.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/archivos")
public class CargaDeArchivoController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Guardar un archivo en la base de datos.
     */
    @PostMapping("/guardar")
    public ResponseEntity<String> guardarArchivoEnBD(@RequestParam("archivo") MultipartFile archivo) {
        if (archivo.isEmpty()) {
            return ResponseEntity.badRequest().body("No se ha seleccionado ningún archivo.");
        }

        // Validar tipo de archivo (solo por ejemplo, ajusta según tus necesidades)
        String tipoArchivo = archivo.getContentType();
        if (!"application/pdf".equals(tipoArchivo) && !"image/jpeg".equals(tipoArchivo)) {
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                    .body("Tipo de archivo no soportado. Solo se permiten PDF e imágenes JPEG.");
        }

        try {
            String nombreArchivo = archivo.getOriginalFilename();
            byte[] datosArchivo = archivo.getBytes();

            jdbcTemplate.update(
                "INSERT INTO archivos (nombre, tipo, datos) VALUES (?, ?, ?)",
                nombreArchivo, tipoArchivo, datosArchivo
            );

            return ResponseEntity.ok("Archivo guardado correctamente en la base de datos.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al guardar el archivo.");
        }
    }

    /**
     * Descargar un archivo por ID.
     */
    @GetMapping("/descargar/{id}")
    public ResponseEntity<byte[]> descargarArchivo(@PathVariable Long id) {
        try {
            Map<String, Object> archivo = jdbcTemplate.queryForMap(
                "SELECT nombre, tipo, datos FROM archivos WHERE id = ?",
                id
            );

            String nombreArchivo = (String) archivo.get("nombre");
            String tipoArchivo = (String) archivo.get("tipo");
            byte[] datosArchivo = (byte[]) archivo.get("datos");

            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"" + nombreArchivo + "\"")
                    .contentType(MediaType.parseMediaType(tipoArchivo))
                    .body(datosArchivo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }
}
