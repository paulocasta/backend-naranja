-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS naranja_db;
USE naranja_db;

 
-- Tabla de torneo
CREATE TABLE IF NOT EXISTS torneo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  anio INTEGER NOT NULL,
  tipo  ENUM('Apertura', 'Clausura', 'Otro') not null
);

-- tabla rival
CREATE TABLE IF NOT EXISTS rival (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  CONSTRAINT UC_rival UNIQUE (nombre)
);

alter table rival add constraint nombre_unico unique(nombre);
-- Tabla de jugador
CREATE TABLE IF NOT EXISTS jugador (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(30) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  posicion_inicial ENUM('Arquero', 'Defensor', 'Mediocampista', 'Delantero') NOT NULL,
  posicion_secundaria ENUM('Arquero', 'Defensor', 'Mediocampista', 'Delantero') NOT NULL,
  numero INT NOT NULL,
  foto_url VARCHAR(255)
);

-- Tabla de partido
CREATE TABLE IF NOT EXISTS partido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    goles_equipo INT DEFAULT 0,
    goles_rival INT DEFAULT 0,
    torneo_id INT NOT NULL,
    rival_id  INT NOT NULL,
    FOREIGN KEY (torneo_id) REFERENCES torneo(id) ,
    FOREIGN KEY (rival_id) REFERENCES rival(id) 
);

-- Estadísticas individuales por partido
CREATE TABLE IF NOT EXISTS estadistica_partido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jugador_id INT NOT NULL,
    partido_id INT NOT NULL,
    goles INT DEFAULT 0,
    asistencias INT DEFAULT 0,
    tarjetas_amarillas INT DEFAULT 0,
    tarjetas_rojas INT DEFAULT 0,
    asistio_partido BOOL DEFAULT true NULL,
    atajo INT DEFAULT 0,
    torneo_id INT NOT NULL,
    FOREIGN KEY (jugador_id) REFERENCES jugador(id),
    FOREIGN KEY (partido_id) REFERENCES partido(id),
    FOREIGN KEY (torneo_id) REFERENCES torneo(id)
);

-- Lavado de camisetas
CREATE TABLE IF NOT EXISTS lavado_camisetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jugador_id INT NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (jugador_id) REFERENCES jugador(id) 
);