// 📦 Importaciones con CommonJS
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 🔧 Configuración de variables de entorno
dotenv.config();

// 📡 Conexión a la base de datos
const connectToDatabase = require('./src/db/connectDb');

// 🚦 Rutas
const donutRouter = require('./src/routers/donutRouter');
const userRouter = require('./src/routers/userRouter');
const loginRouter = require('./src/routers/loginRouter');
const healthyRouter = require('./src/routers/healthyRouter');

// 🚀 Crear la aplicación de Express
const app = express();
const PORT = process.env.PORT || 3000;

// 🌐 Middleware para CORS
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto si tu frontend está en otro dominio
}));

// 🧠 Middleware para parsear JSON
app.use(express.json());

// 🔌 Conectar a la base de datos
connectToDatabase();

// 🛣️ Rutas de la API
app.use('/api/donut', donutRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', loginRouter);
app.use('/api/check', healthyRouter);

// 🏁 Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
