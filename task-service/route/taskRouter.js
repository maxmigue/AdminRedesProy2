const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')
const healthController = require('../controllers/healthController')

// GET: Revisar estado de servicios
router.route('/health').get(healthController.health);

// POST: Crear tarea
router.route('/').post(taskController.crearTarea);

// GET: Listar tareas
router.route('/').get(taskController.listarTareas);

// GET: Obtener tarea específica con su ID
router.route('/:id').get(taskController.obtenerTarea);

// PUT: Actualizar estado de una tarea
router.route('/:id').put(taskController.actualizarEstadoTarea);

module.exports = router;