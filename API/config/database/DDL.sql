CREATE DATABASE saye;

\c saye;

CREATE TABLE usuarios (
    id         SERIAL         PRIMARY KEY,
    nombre     VARCHAR(100)   NOT NULL,
    telefono   VARCHAR(15)    UNIQUE,
    correo     VARCHAR(100)   UNIQUE NOT NULL,
    contrasena VARCHAR(255)   NOT NULL,
    rol        VARCHAR(20)    NOT NULL
);

CREATE TABLE propiedades (
    id                 SERIAL           PRIMARY KEY,
    titulo             VARCHAR(100)     NOT NULL,
    ubicacion          VARCHAR(255)     NOT NULL,
    metros_cuadrados   INT              NOT NULL,
    numero_dormitorios INT              NOT NULL,
    numero_banos       INT              NOT NULL,
    descripcion        VARCHAR(255)     NOT NULL,
    valor              INT              NOT NULL
);

CREATE TABLE transacciones (
    id                          SERIAL           PRIMARY KEY,
    usuario_id                  INT              NOT NULL,
    propiedad_id                INT              NOT NULL,
    fecha_compra                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id)    REFERENCES usuarios(id),
    FOREIGN KEY (propiedad_id)  REFERENCES propiedades(id)
);
