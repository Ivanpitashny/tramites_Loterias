
CREATE DATABASE IF NOT EXISTS tramite_de_loteria;

USE tramite_de_loteria;
DROP TABLE if EXISTS `historial_actividades`;
DROP TABLE IF EXISTS `archivos_cambio_domicilio`;
DROP TABLE IF EXISTS `archivos_cambio_titular`;
DROP TABLE if EXISTS `cambio_titular`;
DROP TABLE if EXISTS `cambio_domicilio`;
DROP TABLE IF EXISTS `authorities`;
DROP TABLE if EXISTS `tramite`;

DROP TABLE IF EXISTS `users`; 

CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `password` varchar(255) DEFAULT NULL,
    `nombre` varchar(255) DEFAULT NULL,
    `apellido` varchar(255) DEFAULT NULL,
    `mail` varchar(255) DEFAULT NULL,
    `telefono` int(11) DEFAULT NULL,
    `enabled` int(11) DEFAULT NULL,
    `tipo` int(1) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`)
);

CREATE TABLE `authorities` (
    `username` varchar(50) NOT NULL,
    `authority` varchar(255) DEFAULT NULL,
    UNIQUE KEY `authorities_idx_1` (`username`, `authority`),
    CONSTRAINT `authorities_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
);

CREATE TABLE `tramite` (
    `t_id` int(11) NOT NULL AUTO_INCREMENT,
    `t_tipo` ENUM('cambio_domicilio', 'cambio_titular') NOT NULL,
    `t_estado` varchar(255) DEFAULT NULL,
    `t_fecha_inicio` date DEFAULT NULL,
    `t_fecha_fin` date DEFAULT NULL,
    `usr_id` int(11) DEFAULT NULL,
    `t_nro_seguimiento` int DEFAULT NULL,
    PRIMARY KEY (`t_id`),
    KEY `usr_id` (`usr_id`),
    FOREIGN KEY (`usr_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 57 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE `cambio_titular` (
    `ct_id` INT PRIMARY KEY AUTO_INCREMENT,
    `t_id` INT,
    `ct_motivo` varchar(255) DEFAULT NULL,
    `ct_localidad` varchar(255) DEFAULT NULL,    
    `ct_razon_social` varchar(255) DEFAULT NULL,
    `ct_domicilio_comercial` varchar(255) DEFAULT NULL,
    `ct_observaciones` varchar(500) DEFAULT NULL,
    `ct_nuevo_titular` VARCHAR(255),
    `ct_nuevo_titular_e` TINYINT(1) DEFAULT 0,
    `ct_dni_nuevo_titular` VARCHAR(20),
    `ct_dni_nuevo_titular_e` TINYINT(1) DEFAULT 0,
    `ct_certificado_conducta` VARCHAR(255),
    `ct_certificado_conducta_e` TINYINT(1) DEFAULT 0,
    `ct_certificado_registro_deudores` VARCHAR(255),
    `ct_certificado_registro_deudores_e` TINYINT(1) DEFAULT 0,
    `ct_nota_libre_deuda` VARCHAR(255),
    `ct_nota_libre_deuda_e` TINYINT(1) DEFAULT 0,
    `ct_contrato_social` VARCHAR(255),
    `ct_contrato_social_e` TINYINT(1) DEFAULT 0,
    `ct_objeto_social` VARCHAR(255),
    `ct_objeto_social_e` TINYINT(1) DEFAULT 0,
    `ct_cuenta_bancaria` VARCHAR(255),
    `ct_cuenta_bancaria_e` TINYINT(1) DEFAULT 0,
    FOREIGN KEY (`t_id`) REFERENCES `tramite`(`t_id`)
);


CREATE TABLE `cambio_domicilio` (
    `cd_id` INT PRIMARY KEY AUTO_INCREMENT,
    `t_id` INT,
    `cd_motivo` varchar(255) DEFAULT NULL,
    `cd_localidad` varchar(255) DEFAULT NULL,    
    `cd_razon_social` varchar(255) DEFAULT NULL,
    `cd_domicilio_comercial` varchar(255) DEFAULT NULL,
    `cd_observaciones` varchar(500) DEFAULT NULL,
    `cd_nuevo_domicilio` VARCHAR(255),
    `cd_nuevo_domicilio_e` TINYINT(1) DEFAULT 0,
    `cd_superficie` INT,
    `cd_superficie_e` TINYINT(1) DEFAULT 0,
    `cd_ubicacion` VARCHAR(255),
    `cd_ubicacion_e` TINYINT(1) DEFAULT 0,
    `cd_vidriera` VARCHAR(255),
    `cd_vidriera_e` TINYINT(1) DEFAULT 0,
    `cd_nivel_socioeconomico` VARCHAR(255),
    `cd_nivel_socioeconomico_e` TINYINT(1) DEFAULT 0,
    `cd_mercado_zona` VARCHAR(255),
    `cd_mercado_zona_e` TINYINT(1) DEFAULT 0,
    `cd_recaudacion_estimada` INT,
    `cd_recaudacion_estimada_e` TINYINT(1) DEFAULT 0,
    `cd_DA_direccion` VARCHAR(255),
    `cd_DA_direccion_e` TINYINT(1) DEFAULT 0,
    `cd_DA_localidad` VARCHAR(255),
    `cd_DA_localidad_e` TINYINT(1) DEFAULT 0,
    `cd_DA_departamento` VARCHAR(255),
    `cd_DA_departamento_e` TINYINT(1) DEFAULT 0,
    FOREIGN KEY (`t_id`) REFERENCES `tramite`(`t_id`)
);


CREATE TABLE `historial_actividades` (
    `ha_id` int(11) NOT NULL AUTO_INCREMENT,
    `ha_operacion` enum('Eliminar', 'Agregar', 'Editar') DEFAULT NULL,
    `ha_fecha_modificacion` date DEFAULT NULL,
    `usr_id` int(11) DEFAULT NULL,
    `t_id` int(11) DEFAULT NULL,
    PRIMARY KEY (`ha_id`),
    KEY `usr_id` (`usr_id`),
    KEY `t_id` (`t_id`),
    CONSTRAINT `historial_actividades_ibfk_1` FOREIGN KEY (`usr_id`) REFERENCES `users` (`id`),
    CONSTRAINT `historial_actividades_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `tramite` (`t_id`)
);


CREATE TABLE archivos_cambio_domicilio (
    archivo_id INT PRIMARY KEY AUTO_INCREMENT,
    cd_id INT NOT NULL,
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta_archivo VARCHAR(500) NOT NULL,
    fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cd_id) REFERENCES cambio_domicilio(cd_id)
);

CREATE TABLE `archivos_cambio_titular` (
    `archivo_id` int NOT NULL AUTO_INCREMENT,
    `ct_id` int NOT NULL,
    `nombre_archivo` varchar(255) NOT NULL,
    `tipo_archivo` varchar(255) NOT NULL,
    `ruta_archivo` varchar(500) NOT NULL,
    `datos_archivo` LONGBLOB NOT NULL,
    `fecha_subida` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`archivo_id`),
    KEY `ct_id` (`ct_id`),
    CONSTRAINT `archivos_cambio_titular_ibfk_1` FOREIGN KEY (`ct_id`) REFERENCES `cambio_titular` (`ct_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP PROCEDURE IF EXISTS subirArchivoCambioTitular;
DELIMITER //

CREATE PROCEDURE subirArchivoCambioTitular(
    IN p_ct_id INT,
    IN p_nombre_archivo VARCHAR(255),
    IN p_ruta_archivo VARCHAR(500),
    IN p_tipo_archivo VARCHAR(50),
    IN p_datos_archivo LONGBLOB
)
BEGIN
    DECLARE v_archivo_id INT;

    -- Insertar el archivo en la tabla archivos_cambio_titular
    INSERT INTO archivos_cambio_titular (ct_id, nombre_archivo, ruta_archivo, tipo_archivo, datos_archivo)
    VALUES (p_ct_id, p_nombre_archivo, p_ruta_archivo, p_tipo_archivo, p_datos_archivo);

    -- Obtener el ID del archivo recién insertado
    SET v_archivo_id = LAST_INSERT_ID();

    -- Actualizar la tabla cambio_titular según el tipo de archivo
    IF p_tipo_archivo = 'ct_certificado_conducta' THEN
        UPDATE cambio_titular
        SET ct_certificado_conducta = v_archivo_id
        WHERE ct_id = p_ct_id;
    ELSEIF p_tipo_archivo = 'ct_certificado_registro_deudores' THEN
        UPDATE cambio_titular
        SET ct_certificado_registro_deudores = v_archivo_id
        WHERE ct_id = p_ct_id;
    ELSEIF p_tipo_archivo = 'ct_nota_libre_deuda' THEN
        UPDATE cambio_titular
        SET ct_nota_libre_deuda = v_archivo_id
        WHERE ct_id = p_ct_id;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de archivo no válido';
    END IF;
END //

DELIMITER ;

CALL subirArchivoCambioTitular(
    1,  -- El ID de la fila en la tabla cambio_titular
    'certificado_conducta.pdf',  -- El nombre del archivo
    '/ruta/del/archivo/certificado_conducta.pdf',  -- La ruta del archivo en el servidor
    'ct_certificado_conducta',  -- El tipo de archivo (puede ser 'ct_certificado_conducta', 'ct_certificado_registro_deudores', o 'ct_nota_libre_deuda')
    "LOAD_FILE('/ruta/del/archivo/certificado_conducta.pdf')"  -- El contenido del archivo
);


INSERT INTO `users` (id, username, password, nombre, apellido, mail, telefono, enabled, tipo) 
VALUES 
(1, 'lgiolongo', '$2a$12$/wE1wNWgufRDXH/qRxhtmeVaZL1Db5m7ezrISHYitK/GvW8EmRFeC', 'lourdes', 'giolongo', 'lgiolongo@mail', '3423432', 1, 1);

INSERT INTO `authorities` 
VALUES 
('lgiolongo', 'ROLE_ADMINISTRADOR');


INSERT INTO `tramite` (t_tipo, t_estado, t_fecha_inicio, t_fecha_fin, usr_id, t_nro_seguimiento)
VALUES 
('cambio_domicilio', 'En Proceso', '2024-01-10', '2024-02-10', 1, 12345),
('cambio_titular', 'Finalizado', '2024-03-01', '2024-03-30', 1, 67890);

INSERT INTO `cambio_domicilio` (t_id, cd_motivo, cd_localidad, cd_razon_social, cd_domicilio_comercial, cd_observaciones, cd_nuevo_domicilio, cd_nuevo_domicilio_e, cd_superficie, cd_superficie_e, cd_ubicacion, cd_ubicacion_e, cd_vidriera, cd_vidriera_e, cd_nivel_socioeconomico, cd_nivel_socioeconomico_e, cd_mercado_zona, cd_mercado_zona_e, cd_recaudacion_estimada, cd_recaudacion_estimada_e, cd_DA_direccion, cd_DA_direccion_e, cd_DA_localidad, cd_DA_localidad_e, cd_DA_departamento, cd_DA_departamento_e)
VALUES 
(57, 'Expansión de negocio', 'Ciudad A', 'Razón Social A', 'Domicilio A', 'Observaciones A', 'Nuevo Domicilio A', 0, 500, 1, 'Ubicación A', 1, 'Vidriera A', 1, 'Nivel Medio', 1, 'Mercado Zona A', 1, 15000, 1, 'Dirección A', 1, 'Localidad A', 0, 'Departamento A', 0);

INSERT INTO `cambio_titular` (t_id, ct_motivo, ct_localidad, ct_razon_social, ct_domicilio_comercial, ct_observaciones, ct_nuevo_titular, ct_nuevo_titular_e, ct_dni_nuevo_titular, ct_dni_nuevo_titular_e, ct_certificado_conducta, ct_certificado_conducta_e, ct_certificado_registro_deudores, ct_certificado_registro_deudores_e, ct_nota_libre_deuda, ct_nota_libre_deuda_e, ct_contrato_social, ct_contrato_social_e, ct_objeto_social, ct_objeto_social_e, ct_cuenta_bancaria, ct_cuenta_bancaria_e)
VALUES 
(58, 'Cambio de titularidad por venta', 'Ciudad B', 'Razón Social B', 'Domicilio B', 'Observaciones B', 'Nuevo Titular B', 1, '12345678', 1, 'Certificado de conducta B', 1, 'Registro deudores B', 1, 'Nota Libre Deuda B', 1, 'Contrato Social B', 0, 'Objeto Social B', 0, 'Cuenta Bancaria B', 0);
