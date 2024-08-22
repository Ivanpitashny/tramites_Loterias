-- Active: 1716390261372@@127.0.0.1@3306@tramite_de_loteria
-- Active: 1722358145282@@127.0.0.1@3306@tramite_de_loteria
CREATE TABLE Rol(
    r_id INT PRIMARY KEY AUTO_INCREMENT,
    r_nombre VARCHAR(50)
);

CREATE TABLE Usuario(
    usr_id INT PRIMARY KEY AUTO_INCREMENT,
    usr_nombre VARCHAR(50),
    usr_apellido VARCHAR(50),
    usr_telefono INT,
    usr_mail VARCHAR(80),
    r_id INT,
    Foreign Key (r_id) REFERENCES Rol(r_id)
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
    Foreign Key (usr_id) REFERENCES Usuario(usr_id)
);

CREATE TABLE Historial_Actividades(
    ha_id INT PRIMARY KEY AUTO_INCREMENT,
    ha_operacion ENUM('Eliminar','Agregar','Editar'),    
    ha_fechaModificacion DATE,
    usr_id INT,
    t_id INT,
    Foreign Key (usr_id) REFERENCES Usuario(usr_id),
    Foreign Key (t_id) REFERENCES Tramite(t_id)
);


