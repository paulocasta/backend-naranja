-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS naranja_db;
USE naranja_db;

-- 
-- Tabla de jugador
CREATE TABLE IF NOT EXISTS jugador (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(30) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  posicion_inicial ENUM('Arquero', 'Defensa', 'Mediocampista', 'Delantero') NOT NULL,
  posicion_secundaria ENUM('Arquero', 'Defensa', 'Mediocampista', 'Delantero') NOT NULL,
  numero INT NOT NULL,
  foto_url VARCHAR(255),
  tarjetas_amarillas INT DEFAULT 0,
  tarjetas_rojas INT DEFAULT 0
);

-- Tabla de partido
CREATE TABLE IF NOT EXISTS partido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rival VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    goles_equipo INT DEFAULT 0,
    goles_rival INT DEFAULT 0
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
    FOREIGN KEY (jugador_id) REFERENCES jugador(id) ON DELETE CASCADE,
    FOREIGN KEY (partido_id) REFERENCES partido(id) ON DELETE CASCADE
);
