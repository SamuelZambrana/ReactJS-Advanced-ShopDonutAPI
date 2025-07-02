# 🍩 ShopDonut Backend API

¡Bienvenido al backend de **ShopDonut**, la tienda de donuts más dulce del universo digital! Este proyecto expone una API moderna construida con Node.js, Express y MongoDB para gestionar productos, autenticación de usuarios y mucho más.

---

## 🚀 Tecnologías utilizadas

- ⚙️ **Node.js** – entorno de ejecución para el servidor
- 🌐 **Express** – framework minimalista para crear APIs REST
- 🍃 **MongoDB** + **Mongoose** – base de datos NoSQL y ODM para modelado de datos
- 🧪 **dotenv** – manejo de variables de entorno
- 🔐 **jsonwebtoken** – autenticación vía tokens JWT
- 🔁 **bcryptjs** – hash de contraseñas seguras
- 👮‍♂️ Middlewares personalizados – protección de rutas y validaciones
- 🔍 **CORS**, **morgan**, y más utilidades para desarrollo

---

## 📁 Estructura del proyecto

```

├── app.js # Punto de entrada del servidor ├── .env # Variables de entorno ├── /src │ ├── /controllers # Lógica de negocio (Donuts, Users, Auth) │ ├── /models # Esquemas de datos (Mongoose) │ ├── /routers # Rutas de la API │ ├── /middlewares # Validaciones, errores, auth │ ├── /db # Conexión a MongoDB │ └── /utils # Helpers y configuraciones varias

```


---

## 📡 Endpoints disponibles

| Ruta                  | Método | Descripción                      |
|-----------------------|--------|----------------------------------|
| `/api/donuts`         | GET    | Obtener lista de donuts         |
| `/api/donuts/:id`     | GET    | Obtener detalle de un donut     |
| `/api/donuts`         | POST   | Crear nuevo donut (protegido)   |
| `/api/auth/register`  | POST   | Registro de usuario             |
| `/api/auth/login`     | POST   | Inicio de sesión                |
| `/api/users`          | GET    | Obtener lista de usuarios (admin) |
| `/api/health`         | GET    | Health check del servidor       |

🛡️ Algunas rutas están protegidas por autenticación JWT y validaciones de rol.

---

## 🔐 Variables de entorno

Guardadas en `.env` en la raíz del proyecto.

# Clona el repositorio
git clone https://github.com/SamuelZambrana/ReactJS-Advanced-ShopDonut.git

# Entra en el backend
cd ReactJS-Advanced-ShopDonut/backend

# Instala las dependencias
npm install

# Crea tu archivo .env con las variables necesarias
# Luego ejecuta el servidor en modo desarrollo
npm run dev

## 💡 Extras
```
Compatible con frontend React (ver carpeta /frontend)

Preparado para despliegue en Render, Vercel o cualquier plataforma Node.js

Código limpio, modular y extensible

```

## 🧑‍💻 Autor

Desarrollado por Samuel Zambrana 💻 React · Node · Mongo · Full Stack Developer

## 📜 Licencia

MIT License © 2025 