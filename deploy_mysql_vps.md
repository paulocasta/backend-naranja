# 🗃️ Guía de Deploy – Base de Datos MySQL para Naranja Mecánica (en VPS)

Esta guía te explica cómo configurar y conectar una base de datos **MySQL** en tu VPS para usar con el backend de la app Naranja Mecánica.

---

## ✅ 1. Instalar MySQL Server

En tu VPS (Ubuntu):

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl enable mysql
sudo systemctl start mysql
```

---

## ✅ 2. Acceder a MySQL como root

```bash
sudo mysql
```

---

## ✅ 3. Crear base de datos y usuario

Dentro de la consola de MySQL:

```sql
CREATE DATABASE naranja_db;
CREATE USER 'naranja_user'@'localhost' IDENTIFIED BY 'contraseña_segura';
GRANT ALL PRIVILEGES ON naranja_db.* TO 'naranja_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## ✅ 4. Probar conexión desde backend

Asegurate de que tu archivo `.env` tenga:

```env
DB_HOST=localhost
DB_USER=naranja_user
DB_PASSWORD=contraseña_segura
DB_NAME=naranja_db
```

Luego desde tu backend:

```bash
curl http://localhost:3000/api/jugadores
```

---

## ✅ 5. Importar estructura (opcional)

Si ya tenés un script `.sql` con las tablas:

```bash
mysql -u naranja_user -p naranja_db < esquema.sql
```

---

## 🛡️ 6. Seguridad básica (opcional)

Puedes ejecutar el script de seguridad inicial de MySQL:

```bash
sudo mysql_secure_installation
```

Este script permite:

- Cambiar contraseña root
- Deshabilitar acceso remoto (recomendado si no lo usás)
- Eliminar usuarios anónimos

---

Con esto, tu base de datos estará lista y conectada con tu backend de Node.js.