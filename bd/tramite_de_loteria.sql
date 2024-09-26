-- Active: 1722358145282@@127.0.0.1@3306@tramite_de_loteria
CREATE DATABASE IF NOT EXISTS tramite_de_loteria;

USE tramite_de_loteria;

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
    `t_name` varchar(255) DEFAULT NULL,
    `t_nro_seguimiento` int DEFAULT NULL,
    `t_motivo` varchar(255) DEFAULT NULL, 
    `t_localidad` varchar(255) DEFAULT NULL, 
    `t_permiso` int DEFAULT NULL, 
    `t_agente` varchar(255) DEFAULT NULL, 
    `t_sub_agente` varchar(255) DEFAULT NULL, 
    `t_razon_social` varchar(255) DEFAULT NULL, 
    `t_domicilio_comercial` varchar(255) DEFAULT NULL,
    `t_observaciones` varchar(500) DEFAULT NULL, 
    PRIMARY KEY (`t_id`), 
    KEY `usr_id` (`usr_id`), 
    FOREIGN KEY (`usr_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 57 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE `cambio_titular` (
    `ct_id` INT PRIMARY KEY AUTO_INCREMENT,
    `t_id` INT,
    `ct_nuevo_titular` VARCHAR(255),
    `ct_dni_nuevo_titular` VARCHAR(20),
    `ct_certificado_conducta` VARCHAR(255),
    `ct_certificado_registro_deudores` VARCHAR(255),
    `ct_nota_libre_deuda` VARCHAR(255),
    `ct_contrato_social` VARCHAR(255),
    `ct_estatuto` VARCHAR(255),
    `ct_objeto_social` VARCHAR(255),
    `ct_cuenta_bancaria` VARCHAR(255),
    FOREIGN KEY (`t_id`) REFERENCES `tramite`(`t_id`)
);

CREATE TABLE `cambio_domicilio` (
    `cd_id` INT PRIMARY KEY AUTO_INCREMENT,
    `t_id` INT,
    `cd_nuevo_domicilio` VARCHAR(255),
    `cd_superficie` INT,
    `cd_ubicacion` VARCHAR(255),
    `cd_vidriera` VARCHAR(255),
    `cd_nivel_socioeconomico` VARCHAR(255),
    `cd_mercado_zona` VARCHAR(255),
    `cd_recaudacion_estimada` INT,
    `cd_DA_direccion` VARCHAR(255),
    `cd_DA_localidad` VARCHAR(255),
    `cd_DA_departamento` VARCHAR(255),
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

INSERT INTO `users` (id, username, password, nombre, apellido, mail, telefono, enabled, tipo) 
VALUES 
(1, 'lgiolongo', '$2a$12$/wE1wNWgufRDXH/qRxhtmeVaZL1Db5m7ezrISHYitK/GvW8EmRFeC', 'lourdes', 'giolongo', 'lgiolongo@mail', '3423432', 1, 1);

INSERT INTO `authorities` 
VALUES 
('lgiolongo', 'ROLE_ADMINISTRADOR');

INSERT INTO `tramite` (t_tipo, t_estado, t_fecha_inicio, t_fecha_fin, usr_id, t_name, t_nro_seguimiento, t_motivo, t_localidad, t_permiso, t_agente, t_sub_agente, t_razon_social, t_domicilio_comercial, t_observaciones)
VALUES ('cambio_titular', 'Rechazao', '2024-11-11', '2024-12-11', 1, 'Cambio de tITULAR ', 45345, 'Cambio de TITULAR', 'Santa Fe', 123213124,'1111', '2222222','TEDESCHI HNOS. S.R.L', 'DATOS NUEVO DOMICILIO', 'OBSERVACIONES');

INSERT INTO `cambio_domicilio` (t_id, cd_nuevo_domicilio, cd_superficie, cd_ubicacion, cd_vidriera, cd_nivel_socioeconomico, cd_mercado_zona, cd_recaudacion_estimada, cd_DA_direccion, cd_DA_localidad, cd_DA_departamento)
VALUES (57, 'Calle Falsa 123', 500, 'Zona Centro', 'Sí', 'Alto', 'Mercado Competitivo', 300000, 'Calle Real 456', 'Santa Fe', 'Santa Fe');

INSERT INTO `cambio_titular` (t_id, ct_nuevo_titular, ct_dni_nuevo_titular, ct_certificado_conducta, ct_certificado_registro_deudores, ct_nota_libre_deuda, ct_contrato_social, ct_estatuto, ct_objeto_social, ct_cuenta_bancaria)
VALUES 
(58, 'Juan Pérez', '12345678', 'Certificado1.pdf', 'Registro1.pdf', 'Nota1.pdf', 'Contrato1.pdf', 'Estatuto1.pdf', 'Objeto Social Ejemplo', 'Cuenta123456');
