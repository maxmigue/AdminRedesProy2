const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\S+$/.test(v); // No permite espacios en blanco
      },
      message: props => `${props.value} no es un username válido (no debe contener espacios).`
    }
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        // Expresión regular básica para emails válidos
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} no es un correo válido.`
    }
  },
  password: { 
    type: String, 
    required: true 
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
