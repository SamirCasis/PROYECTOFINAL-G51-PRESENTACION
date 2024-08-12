CREATE DATABASE saye;

\c saye;

CREATE TABLE properties (
    id                  SERIAL          PRIMARY KEY,
    title               VARCHAR(50)     NOT NULL,
    location            VARCHAR(100)    NOT NULL,
    meters              INT             NOT NULL,
    bedrooms            INT             NOT NULL,
    bathrooms           INT             NOT NULL,
    description         VARCHAR(255)    NOT NULL,
    price               INT             NOT NULL,
    imgurl              VARCHAR(255)
);

CREATE TABLE users (
    id                  SERIAL         PRIMARY KEY,
    name                VARCHAR(100)   NOT NULL,
    phone               VARCHAR(15)    UNIQUE,
    email               VARCHAR(100)   UNIQUE       NOT NULL,
    password            VARCHAR(255)   NOT NULL,
    rol                 VARCHAR(25)    NOT NULL 
);

CREATE TABLE transactions (
    id                  SERIAL           PRIMARY KEY,
    user_id             INT              NOT NULL,
    property_id         INT              NOT NULL,
    purchase_date       TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)       REFERENCES users(id)        ON DELETE CASCADE,
    FOREIGN KEY (property_id)   REFERENCES properties(id)   ON DELETE CASCADE
);

CREATE TABLE favorites (
    id                  SERIAL          PRIMARY KEY,
    user_id             INT             NOT NULL,
    property_id         INT             NOT NULL,
    FOREIGN KEY (user_id)       REFERENCES users(id)        ON DELETE CASCADE,
    FOREIGN KEY (property_id)   REFERENCES properties(id)   ON DELETE CASCADE
);



