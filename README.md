# 📘 Documentación Técnica – App “Naranja Mecánica”

## 🧩 General

- **Tipo de proyecto:** Web app de fútbol amateur  
- **Nombre:** Naranja Mecánica  
- **Frontend:** React + Tailwind CSS  
- **Backend:** Node.js (Express)  
- **Base de datos:** MySQL  

## 🗃️ Base de Datos (MySQL)

### `jugadores`
```sql
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100),
apellido VARCHAR(100),
fecha_nacimiento DATE,
posicion_inicial VARCHAR(50),
posicion_secundaria VARCHAR(50),
numero INT NOT NULL,
foto_url VARCHAR(255),
tarjetas_amarillas INT DEFAULT 0,
tarjetas_rojas INT DEFAULT 0
```

### `partidos`
```sql
id INT AUTO_INCREMENT PRIMARY KEY,
rival VARCHAR(100),
fecha DATE,
goles_equipo INT,
goles_rival INT
```

### `estadisticas_partido`
```sql
id INT AUTO_INCREMENT PRIMARY KEY,
jugador_id INT,
partido_id INT,
goles INT DEFAULT 0,
asistencias INT DEFAULT 0,
tarjetas_amarillas INT DEFAULT 0,
tarjetas_rojas INT DEFAULT 0
```

## ⚙️ Backend (Node.js)

### Endpoints principales

- `POST /api/jugadores` → Agregar jugador  
- `GET /api/jugadores` → Listar jugadores  
- `GET /api/jugadores/:id/estadisticas` → Stats acumuladas  
- `POST /api/partidos` → Registrar partido  
- `POST /api/estadisticas` → Cargar stats por jugador  
- `GET /api/estadisticas/jugador/:id` → Historial individual  
- `GET /api/rankings/*` → Rankings (goleadores, asistencias, amarillas, rojas, partidos)

### Autenticación simple

- `POST /api/auth/login` → Login admin (usa `.env` para email y contraseña)
