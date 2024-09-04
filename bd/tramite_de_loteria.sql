CREATE TABLE users (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(68) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    mail VARCHAR(70) NOT NULL,
    telefono INT,
    enabled tinyint NOT NULL
);

CREATE TABLE authorities (
  username VARCHAR(50) NOT NULL,
  authority VARCHAR(50) NOT NULL,
  UNIQUE KEY authorities_idx_1 (username,authority),
  CONSTRAINT authorities_ibfk_1 FOREIGN KEY (username) REFERENCES users (username)
);

CREATE TABLE TipoTramite(
    tt_id INT PRIMARY KEY AUTO_INCREMENT,
    tt_tipo VARCHAR(50)
);

CREATE TABLE Tramite(
    t_id INT PRIMARY KEY AUTO_INCREMENT,
    t_estado VARCHAR(50),
    t_fechaInicio DATE,
    t_fechaFin DATE,
    tt_id INT,
    usr_id INT,
    Foreign Key (tt_id) REFERENCES TipoTramite(tt_id),
    Foreign Key (usr_id) REFERENCES users(id)
);

CREATE TABLE Historial_Actividades(
    ha_id INT PRIMARY KEY AUTO_INCREMENT,
    ha_operacion ENUM('Eliminar','Agregar','Editar'),    
    ha_fecha_modificacion DATE,
    usr_id INT,
    t_id INT,
    Foreign Key (usr_id) REFERENCES users(id),
    Foreign Key (t_id) REFERENCES Tramite(t_id)
);

INSERT INTO users (id, username, password , nombre, apellido, mail, telefono, enabled) 
VALUES 
(1,'lgiolongo','{bcrypt}$2a$12$FM6tLScFT4xtStWBSMUIwucLYfSRiq42cj16/hqo3nqS7EumcEy0C
','lourdes', 'giolongo', 'lgiolongo@mail', '3423432', 1);


INSERT INTO authorities 
VALUES 
('lgiolongo','ROLE_ADMINISTRADOR');

