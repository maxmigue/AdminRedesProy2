// services/userServices.js
const User = require('../models/userModel');

// Crear usuario
async function crearUsuario(req, res) {
    try {
        console.log("Creando Usuario");
        const { username, email, password } = req.body;

        // Crear nuevo usuario
        const nuevoUsuario = new User({ username, email, password });
        await nuevoUsuario.save();

        return res.status(201).json({ message: 'Usuario creado exitosamente', user: nuevoUsuario });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(400).json({ message: 'Error al crear usuario', error: error.message });
    }
}

// Listar todos los usuarios
async function listarUsuarios(req, res) {
    try {
        console.log("Listando Usuarios");
        const usuarios = await User.find();

        if (usuarios){
            if(usuarios.length === 0){ return res.status(404).json({ message: 'No hay usuarios registrados'}) }
            else {
                return res.status(200).json({ message: 'Usuarios listados exitosamente', usuarios });
            }
        }
    } catch (error) {
        console.error("Error al listar usuarios:", error);
        return res.status(500).json({ message: 'Error al listar usuarios', error: error.message });
    }
}

// Obtener usuario por ID
async function obtenerUsuario(req, res) {
    try {
        console.log("Obteniendo Usuario con ID", req.params.id);
        const usuario = await User.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ message: 'Usuario obtenido exitosamente', usuario });
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
}

module.exports = { crearUsuario, listarUsuarios, obtenerUsuario };
