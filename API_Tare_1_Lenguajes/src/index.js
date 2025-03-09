// ====================Intructivas de uso=========================
//  Se deben de utilizar los siguientes comandos para poder ejecutar las funciones basicas del API,
//  cuando se va a usar por primera vez en el dispositivo:
// npm install express 
// npm isntall cors 
// npm install dotenv

// Para la ejecucion del api, utiliza "nodemon", el cual si no esta instalado, usa este comando:
// npm install nodemon 

// Una vez instalado todo, se utiliza el comando: nodemon src/index.js   | para la inicializacion del api

// =================== Fin intructivos de uso =============================

// Los inports que se ocupan para el funcionamiento.
const express = require('express');
const cors = require('cors');// Para el certificado de las peticiones
// const multer = require('multer');// Para el manejo de archivos.
require('dotenv').config(); // Para configuracion segura de variables de entorno


const app = express();

app.use(cors({
  origin: '*', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

// Rutas especificas para los ednpoints del API
const palabrasRoutes = require('./Routes/archivo');
const juegoRoutes = require('./Routes/Juego');
const historialRoutes = require('./Routes/Historial');


app.use('/api/archivo', palabrasRoutes);
app.use('/api/juego', juegoRoutes);
app.use('/api/historial', historialRoutes);


const PORT = process.env.PORT || 5000; // Puerto local de escucha
// http://localhost:5000/api/
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});