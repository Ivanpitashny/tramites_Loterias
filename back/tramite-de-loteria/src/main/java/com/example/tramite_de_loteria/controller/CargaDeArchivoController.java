package com.example.tramite_de_loteria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/archivos")
public class CargaDeArchivoController {
    private static final Logger logger = LoggerFactory.getLogger(CargaDeArchivoController.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String DIRECTORIO_ARCHIVOS = "back/tramite-de-loteria/src/main/java/com/example/tramite_de_loteria/assets";

    /**back\tramite-de-loteria\src\main\java\com\example\tramite_de_loteria\assets
     * Guardar un archivo en el sistema de archivos y registrar en la base de datos.
     */
    @PostMapping("/guardar/{tramiteId}")
    public ResponseEntity<Map<String, String>> guardarArchivoEnBD(@RequestParam("archivo") MultipartFile archivo, @RequestParam("tipoArchivo") String tipoArchivo, @PathVariable Long tramiteId) {
        Map<String, String> response = new HashMap<>();
        if (archivo.isEmpty()) {
            logger.error("No se ha seleccionado ningún archivo.");
            response.put("error", "No se ha seleccionado ningún archivo.");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            String currentDir = System.getProperty("user.dir");
            String uploadDir = currentDir + File.separator + DIRECTORIO_ARCHIVOS;

            File directorio = new File(uploadDir);
            if (!directorio.exists()) {
                if (!directorio.mkdirs()) {
                    logger.error("No se pudo crear el directorio: " + uploadDir);
                    response.put("error", "No se pudo crear el directorio: " + uploadDir);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                }
            }

            // Ruta completa del archivo
            String rutaArchivo = uploadDir + File.separator + archivo.getOriginalFilename();
            archivo.transferTo(new File(rutaArchivo));

            // Actualizar la tabla cambio_titular con la ruta del archivo
            String columna = "";
            switch (tipoArchivo) {
                case "conductaFile":
                    columna = "ct_certificado_conducta";
                    break;
                case "deudoresFile":
                    columna = "ct_certificado_registro_deudores";
                    break;
                case "libreDeudaFile":
                    columna = "ct_nota_libre_deuda";
                    break;
                default:
                    logger.error("Tipo de archivo no válido: " + tipoArchivo);
                    response.put("error", "Tipo de archivo no válido.");
                    return ResponseEntity.badRequest().body(response);
            }

            logger.info("Actualizando la tabla cambio_titular. Columna: " + columna + ", Ruta: " + rutaArchivo + ", Tramite ID: " + tramiteId);
            int rowsUpdated = jdbcTemplate.update(
                "UPDATE cambio_titular SET " + columna + " = ? WHERE t_id = ?",
                rutaArchivo,
                tramiteId
            );

            if (rowsUpdated == 0) {
                logger.error("No se encontró el tramite con ID: {}", tramiteId);
                response.put("error", "No se encontró el tramite con ID: " + tramiteId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            // Codificar la ruta del archivo antes de enviarla en la respuesta
            String encodedFilePath = java.net.URLEncoder.encode(rutaArchivo, java.nio.charset.StandardCharsets.UTF_8.toString());
            response.put("message", "Archivo guardado correctamente");
            response.put("path", encodedFilePath);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            logger.error("Error al guardar el archivo: ", e);
            response.put("error", "Error interno al guardar el archivo.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } catch (Exception e) {
            logger.error("Error interno al guardar el archivo: ", e);
            response.put("error", "Error interno al guardar el archivo.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Descargar un archivo desde el sistema de archivos.
     */
    @GetMapping("/descargar")
    public ResponseEntity<InputStreamResource> descargarArchivo(@RequestParam("filePath") String filePath) {
        try {
            // Decode the file path
            String decodedFilePath = java.net.URLDecoder.decode(filePath, "UTF-8");
            File archivo = new File(decodedFilePath);
            if (!archivo.exists()) {
                return ResponseEntity.notFound().build();
            }

            FileInputStream fileInputStream = new FileInputStream(archivo);
            InputStreamResource resource = new InputStreamResource(fileInputStream);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + archivo.getName());

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(archivo.length())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}