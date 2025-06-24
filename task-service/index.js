// Importar Express
const express = require('express');

// Inicializar la aplicación Express
const app = express();
app.use(express.json());

// Inicializar conexión a MongoDB
require('./mongoDB/init')

// Definir routers
const userRouter = require('./route/taskRouter')

// Usar routers
app.use('/', userRouter)

// Definir el puerto para el servidor
const PORT = 3001;

app.use(express.json());

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});