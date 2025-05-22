# 🔁 Cómo actualizar backend y frontend en el VPS (Naranja Mecánica)

Esta guía te explica cómo subir cambios del proyecto al VPS y aplicarlos correctamente tanto en el backend como en el frontend.

---

## ✅ ACTUALIZAR EL FRONTEND (React)

### 1. Subir los cambios

Si usás Git:

```bash
ssh usuario@IP
cd /ruta/al/proyecto/frontend
git pull origin main
```

Si no usás Git, desde tu máquina local:

```bash
scp -r ./frontend usuario@IP:/ruta/en/vps/frontend
```

---

### 2. Reconstruir el proyecto

```bash
cd /ruta/en/vps/frontend
npm install      # si cambiaste dependencias
npm run build
```

---

### 3. Reemplazar archivos públicos de NGINX

```bash
sudo rm -rf /var/www/naranja/frontend/*
sudo cp -r build/* /var/www/naranja/frontend/
```

---

### 4. Recargar NGINX

```bash
sudo systemctl reload nginx
```

---

## ✅ ACTUALIZAR EL BACKEND (Node.js)

### 1. Subir cambios

Si usás Git:

```bash
cd /ruta/en/vps/backend
git pull origin main
```

Si no usás Git:

```bash
scp -r ./backend usuario@IP:/ruta/en/vps/backend
```

---

### 2. Instalar dependencias si corresponde

```bash
npm install
```

---

### 3. Reiniciar el servidor Node con PM2

```bash
pm2 restart naranja-backend
```

---

### 4. Verificar que el backend esté funcionando

```bash
curl http://localhost:3000/api/jugadores
pm2 logs naranja-backend
```

---

## 🛠️ RECOMENDACIÓN

- Usá Git en el VPS para facilitar actualizaciones (`git pull`)
- Usá `pm2 save` después de cambios importantes:
  ```bash
  pm2 save
  ```

---

## ✅ Listo

Con estos pasos, tus cambios de frontend y backend estarán activos en producción en minutos.