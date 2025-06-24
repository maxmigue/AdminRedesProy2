const mongoose = require('mongoose');

async function health(req, res) {
  try {
    // Revisar estado conexión mongoose
    const estadoConexion = mongoose.connection.readyState; 

    if (estadoConexion !== 1) {
      return res.status(503).json({ status: 'FAIL', message: 'Base de datos no conectada' });
    }

    return res.status(200).json({ status: 'OK', message: 'Servicio activo y base de datos conectada' });
  } catch (error) {
    console.error('Error health check:', error);
    return res.status(500).json({ status: 'FAIL', message: 'Error interno del servidor' });
  }
}

module.exports = { health };