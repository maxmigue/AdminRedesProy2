const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://admin:redes123@admin-redes.2vcja40.mongodb.net/tu_basededatos?retryWrites=true&w=majority&appName=ADMIN-REDES');
    console.log('✅ Conectado a MongoDB con Mongoose');
  } catch (err) {
    console.error('❌ Error de conexión:', err);
  }
}

connectDB();