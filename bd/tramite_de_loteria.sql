create DATABASE if NOT EXISTS tramite_de_loteria;

use tramite_de_loteria;

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

CREATE TABLE `tipo_tramite` (
    `tt_id` int(11) NOT NULL AUTO_INCREMENT,
    `tt_tipo` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`tt_id`)
);

CREATE TABLE `tramite` (
    `t_id` int(11) NOT NULL AUTO_INCREMENT,
    `t_estado` varchar(255) DEFAULT NULL,
    `t_fecha_inicio` date DEFAULT NULL,
    `t_fecha_fin` date DEFAULT NULL,
    `tt_id` int(11) DEFAULT NULL,
    `usr_id` int(11) DEFAULT NULL,
    PRIMARY KEY (`t_id`),
    KEY `tt_id` (`tt_id`),
    KEY `usr_id` (`usr_id`),
    CONSTRAINT `tramite_ibfk_1` FOREIGN KEY (`tt_id`) REFERENCES `tipo_tramite` (`tt_id`),
    CONSTRAINT `tramite_ibfk_2` FOREIGN KEY (`usr_id`) REFERENCES `users` (`id`)
); 

CREATE TABLE `historial_actividades` (
    `ha_id` int(11) NOT NULL AUTO_INCREMENT,
    `ha_operacion` enum(
        'Eliminar',
        'Agregar',
        'Editar'
    ) DEFAULT NULL,
    `ha_fecha_modificacion` date DEFAULT NULL,
    `usr_id` int(11) DEFAULT NULL,
    `t_id` int(11) DEFAULT NULL,
    PRIMARY KEY (`ha_id`),
    KEY `usr_id` (`usr_id`),
    KEY `t_id` (`t_id`),
    CONSTRAINT `historial_actividades_ibfk_1` FOREIGN KEY (`usr_id`) REFERENCES `users` (`id`),
    CONSTRAINT `historial_actividades_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `tramite` (`t_id`)
) 

INSERT INTO users (id, username, password , nombre, apellido, mail, telefono, enabled,tipo) 
VALUES 
(1,'lgiolongo','{bcrypt}$2a$12$FM6tLScFT4xtStWBSMUIwucLYfSRiq42cj16/hqo3nqS7EumcEy0C
','lourdes', 'giolongo', 'lgiolongo@mail', '3423432', 1,1);


INSERT INTO authorities 
VALUES 
('lgiolongo','ROLE_ADMINISTRADOR');

INSERT INTO tipo_tramite (tt_id, tt_tipo) VALUES 
(1,'Cambio de Domicilio'),
(2,'Cambio de Titular');

INSERT INTO tramite (t_id, t_estado, t_fecha_inicio, t_fecha_fin, tt_id, usr_id) VALUES
(1, 'Aprobado', '2024-08-10','2024-08-22', 1, 1);