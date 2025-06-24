const mongoose = require('mongoose');

async function health(req, res) {
  const dbStatus = mongoose.connection.readyState;

  const health = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    db: dbStatus === 1 ? 'connected' : 'disconnected',
  };

  const statusCode = dbStatus === 1 ? 200 : 500;

  res.status(statusCode).json(health);
}

module.exports = { health };