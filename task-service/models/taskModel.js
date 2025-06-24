// models/taskModel.js
const mongoose = require('mongoose');

const User = require('./userModel');

const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        enum: ['pendiente', 'en_progreso', 'completada'],
        default: 'pendiente',
        required: true
    },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
