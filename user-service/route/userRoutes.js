const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const healthController = require('../controllers/healthController')

// GET: Revisar estado de servicios
router.route('/health').get(healthController.health);

// POST: Crear usuario
router.route('/').post(userController.crearUsuario);

// GET: Listar usuarios
router.route('/').get(userController.listarUsuarios);

// GET: Obtener usuario específico con su ID
router.route('/:id').get(userController.obtenerUsuario);

module.exports = router;
