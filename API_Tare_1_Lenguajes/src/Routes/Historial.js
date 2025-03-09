const express = require('express');
const { ConsultarHistorial } = require('../Controllers/HistorialController');
const router = express.Router();

router.get('/', ConsultarHistorial ); 

//router.get('/asignacion/:AsignacionId', optenerComentariosPorAsignacion); // Optener los comentarios de una asignacion especifica.
module.exports = router;