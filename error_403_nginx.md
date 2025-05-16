# 🧱 Solución al Error 403 en imágenes – NGINX + Node.js (Naranja Mecánica)

Este documento te guía paso a paso para resolver el error:

```
403 Forbidden
failed (13: Permission denied)
```

al intentar acceder a imágenes como fotos de jugadores servidas desde `/uploads`.

---

## 🔎 ¿Qué significa este error?

El servidor (NGINX) **no puede acceder al archivo físico** que le estás pidiendo, por una de estas razones:

- ❌ Falta de permisos en la carpeta o archivos
- ❌ Configuración incorrecta de `alias` en NGINX
- ❌ Ruta de acceso restringida (por ejemplo, dentro de `/home/usuario/...`)

---

## ✅ Parte 1: Verificar configuración de NGINX

En tu archivo `naranja` (por ejemplo: `/etc/nginx/sites-available/naranja`), asegurate de tener:

```nginx
location /uploads/ {
    alias /home/user/backend-naranja/uploads/;
    autoindex off;
}
```

Luego:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## ✅ Parte 2: Verificar permisos de la carpeta `/uploads` y su ruta

NGINX corre como `www-data`, y necesita **permisos de ejecución (x)** en cada carpeta intermedia de la ruta.

### 🔍 Revisar permisos

```bash
ls -ld /home
ls -ld /home/user
ls -ld /home/user/backend-naranja
ls -ld /home/user/backend-naranja/uploads
```

### ✔️ Solución

```bash
sudo chmod o+x /home
sudo chmod o+x /home/user
sudo chmod o+x /home/user/backend-naranja
sudo chmod -R 755 /home/paulo/backend-naranja/uploads
sudo chown -R www-data:www-data /home/paulo/backend-naranja/uploads
```

---

## ✅ Parte 3: Alternativa recomendada – Mover `/uploads` a un directorio web

Más seguro y directo:

```bash
sudo mkdir -p /var/www/naranja/uploads
sudo mv /home/user/backend-naranja/uploads/* /var/www/naranja/uploads/
sudo chown -R www-data:www-data /var/www/naranja/uploads
```

Y en NGINX:

```nginx
location /uploads/ {
    alias /var/www/naranja/uploads/;
}
```

---

## ✅ Parte 4: Verificá acceso

Desde tu navegador o con `curl`:

```bash
curl http://TU_IP/uploads/jugador_123456.jpg
```

---

## 🛠️ Bonus: Validar rutas en la base de datos

Asegurate de que los valores en `foto_url` empiecen con `/uploads/` y no con rutas locales como `uploads\jugador.jpg`.

---

## 🏁 Resultado esperado

Acceder a:

```
http://<tu-ip>/uploads/jugador_XXXX.jpg
```

debe mostrar la imagen sin error 403.