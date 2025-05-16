# 🚀 Guía de Deploy – Backend Naranja Mecánica (Node.js en VPS con PM2)

Esta guía te ayuda a desplegar el **backend Node.js/Express** de la app Naranja Mecánica en un VPS Linux (Ubuntu) usando **PM2** como gestor de procesos.

---

## ✅ 1. Acceder al VPS

Conectate por SSH desde tu máquina local:

```bash
ssh usuario@ip-del-vps
```

---

## ✅ 2. Instalar Node.js y PM2 (si no los tenés)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

---

## ✅ 3. Subir tu backend

Opción 1: Cloná desde GitHub

```bash
git clone https://github.com/tu_usuario/naranja-mecanica.git
cd naranja-mecanica/backend
```

Opción 2: Usá `scp` para copiarlo desde tu PC

```bash
scp -r ./backend usuario@ip-del-vps:/home/usuario/
```

---

## ✅ 4. Configurar variables de entorno

```bash
cp .env.example .env
nano .env
```

Asegurate de completar:

```env
DB_HOST=localhost
DB_USER=usuario_mysql
DB_PASSWORD=contraseña
DB_NAME=naranja_db
ADMIN_EMAIL=admin@naranja.com
ADMIN_PASSWORD=123456
PORT=3000
```

---

## ✅ 5. Instalar dependencias y lanzar con PM2

```bash
npm install
pm2 start app.js --name naranja-backend
pm2 save
```

---

## ✅ 6. Verificar que esté funcionando

Desde el VPS:

```bash
curl http://localhost:3000/api/jugadores
```

Desde tu navegador (si NGINX redirige `/api`):

```
http://TU_IP_VPS/api/jugadores
```

---

## ✅ 7. Mantener backend activo con cada reinicio

```bash
pm2 startup
```

El comando te dará una línea que tenés que ejecutar como `sudo`. Luego:

```bash
pm2 save
```

---

## ✅ 8. Logs en tiempo real

```bash
pm2 logs naranja-backend
```

---

Con esto, el backend queda activo, persistente, y disponible vía `/api`.