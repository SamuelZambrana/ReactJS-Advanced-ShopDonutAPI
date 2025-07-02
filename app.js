const express = require('express');

// Configuración del puerto
const PORT = 3000;
const donutRouter = require('./src/routers/donutRouter')
const userRouter = require('./src/routers/userRouter');
const loginRouter = require('./src/routers/loginRouter');
const healthyRouter = require('./src/routers/healthyRouter');

require("dotenv").config();

const connectToDatabase = require('./src/db/connectDb')

// Crear una aplicación de Express
const app = express();
// Middleware básico para analizar JSON en las solicitudes
app.use(express.json());

connectToDatabase()
app.use('/api/donut', donutRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', loginRouter);
app.use('/api/check', healthyRouter);


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
