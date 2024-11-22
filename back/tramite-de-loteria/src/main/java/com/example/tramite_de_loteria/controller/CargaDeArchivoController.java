package com.example.tramite_de_loteria.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(CargaDeArchivoController.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String DIRECTORIO_ARCHIVOS = "C:/Users/ivan pitashny/Desktop/Tramites loterias/tramites_Loterias/back/tramite-de-loteria/src/main/java/com/example/tramite_de_loteria/assets/";


    /**
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
            File directorio = new File(DIRECTORIO_ARCHIVOS);
    
            // Crear el directorio si no existe
            if (!directorio.exists() && !directorio.mkdirs()) {
                throw new IOException("No se pudo crear el directorio: " + DIRECTORIO_ARCHIVOS);
            }
    
            // Ruta completa del archivo
            String rutaArchivo = DIRECTORIO_ARCHIVOS + archivo.getOriginalFilename();
            File archivoDestino = new File(rutaArchivo);
            

            // Guardar el archivo en la ruta
            archivo.transferTo(archivoDestino);
            
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
            response.put("message", "Archivo guardado correctamente");
            response.put("path", rutaArchivo);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            logger.error("Error al guardar el archivo: ", e);
            response.put("error", "Error interno al guardar el archivo.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        catch(Exception e){
            logger.error("Error interno al guardar el archivo: ", e);
            response.put("error", "Error interno al guardar el archivo.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    

   /**
     * Descargar un archivo por ID desde el sistema de archivos.
     */
    @GetMapping("/descargar/{tramiteId}")
    public ResponseEntity<byte[]> descargarArchivo(@PathVariable Long tramiteId, @RequestParam("tipoArchivo") String tipoArchivo) {
        try {
            // Determine the column name based on the tipoArchivo
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
                    return ResponseEntity.badRequest().body(null);
            }

            // Fetch the file path from the database
            Map<String, Object> archivo = jdbcTemplate.queryForMap(
                "SELECT " + columna + " AS ruta_archivo FROM cambio_titular WHERE t_id = ?",
                tramiteId
            );

            String rutaArchivo = (String) archivo.get("ruta_archivo");
            if (rutaArchivo == null) {
                logger.error("Archivo no encontrado para el tramite con ID: " + tramiteId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Read the file from the file system
            Path ruta = Paths.get(rutaArchivo);
            byte[] datosArchivo = Files.readAllBytes(ruta);

            // Determine the file name and content type
            String nombreArchivo = ruta.getFileName().toString();
            String tipoArchivoMime = Files.probeContentType(ruta);

            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"" + nombreArchivo + "\"")
                    .contentType(MediaType.parseMediaType(tipoArchivoMime))
                    .body(datosArchivo);
        } catch (IOException e) {
            logger.error("Error al leer el archivo con tramite ID " + tramiteId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        } catch (Exception e) {
            logger.error("Archivo no encontrado con tramite ID " + tramiteId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }
}

