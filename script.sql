-- Creación DB
CREATE DATABASE banca_db;
-- Creación de tablas
CREATE TABLE transacciones(descripcion VARCHAR(50), fecha VARCHAR(10), monto DECIMAL, cuenta INT);
CREATE TABLE cuentas(id INT, saldo DECIMAL CHECK(saldo >= 0));
-- Se agrega un registro
INSERT INTO cuentas VALUES(1, 20000);