const express = require('express');
const { IniciarJuego, nuevaLetra, FinalRonda } = require('../Controllers/JuegoController');
const router = express.Router();

router.get('/', FinalRonda ); 
router.post('/', IniciarJuego); // Optener una palabra del archivo que contiene las palabras para el juego.
router.post('/nuevaLetra', nuevaLetra);

//router.get('/asignacion/:AsignacionId', optenerComentariosPorAsignacion); // Optener los comentarios de una asignacion especifica.
module.exports = router;