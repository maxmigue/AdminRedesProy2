const Task = require('../models/taskModel');

// Crear tarea
async function crearTarea(req, res) {
    try {
        console.log("Creando tarea");
        const { title, description, assignedTo, status } = req.body;

        if (!title || !description || !assignedTo) {
            return res.status(400).json({ message: 'Los campos title, description y assignedTo son obligatorios' });
        }

        // Validar status si fue enviado
        const validStatuses = ['pendiente', 'en_progreso', 'completada'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: `El campo status debe ser uno de: ${validStatuses.join(', ')}` });
        }

        const nuevaTarea = new Task({ 
            title, 
            description, 
            assignedTo, 
            status: status || 'pendiente'  // Si no se envía, asigna 'pendiente'
        });

        await nuevaTarea.save();

        return res.status(201).json({ message: 'Tarea creada exitosamente', tarea: nuevaTarea });
    } catch (error) {
        console.error('Error al crear tarea:', error);
        return res.status(500).json({ message: 'Error al crear tarea', error: error.message });
    }
}

// Listar tareas, opcionalmente filtradas por usuario
async function listarTareas(req, res) {
    try {
        const userId = req.query.user_id;
        let tareas;

        if (userId) {
            tareas = await Task.find({ assignedTo: userId }).populate('assignedTo', 'username email');
            return res.status(200).json({ message: 'Tareas filtradas con éxito', tareas });
        } else {
            tareas = await Task.find().populate('assignedTo', 'username email');
            if (tareas){
                if(tareas.length === 0){ return res.status(404).json({ message: 'No hay tareas registradas'}) }
                else {
                    return res.status(200).json({ message: 'Tareas listados exitosamente', tareas });
                }
            }
            return res.status(200).json({ message: 'Todas las tareas listadas con éxito', tareas });
        }
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
}

// Obtener tarea por ID
async function obtenerTarea(req, res) {
    try {
        console.log("Obteniendo tarea con ID", req.params.id);
        const tarea = await Task.findById(req.params.id).populate('assignedTo', 'username email');

        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        return res.status(200).json({ message: 'Tarea obtenida exitosamente', tarea });
    } catch (error) {
        console.error('Error al obtener tarea:', error);
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
}

async function actualizarEstadoTarea(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const estadosValidos = ['pendiente', 'en_progreso', 'completada'];
      if (!status || !estadosValidos.includes(status)) {
        return res.status(400).json({ message: `El campo status es obligatorio y debe ser uno de: ${estadosValidos.join(', ')}` });
      }
  
      const tareaActualizada = await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true } // para que retorne el documento actualizado
      );
  
      if (!tareaActualizada) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }
  
      return res.status(200).json({ message: 'Estado de tarea actualizado', tarea: tareaActualizada });
    } catch (error) {
      console.error('Error al actualizar estado de tarea:', error);
      return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
}

module.exports = { crearTarea, listarTareas, obtenerTarea, actualizarEstadoTarea };
