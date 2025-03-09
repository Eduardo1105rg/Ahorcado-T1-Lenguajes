const express = require('express');
const { OptenerPalabra } = require('../Controllers/archivoController');
const router = express.Router();

//router.post('/', ); 
router.get('/', OptenerPalabra); // Optener una palabra del archivo que contiene las palabras para el juego.
//router.get('/asignacion/:AsignacionId', optenerComentariosPorAsignacion); // Optener los comentarios de una asignacion especifica.
module.exports = router;