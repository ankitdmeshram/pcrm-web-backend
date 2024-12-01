const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    startDate: {
        type: Date,
        default: null
    },
    endDate: {
        type: Date,
        default: null,
    },
    dueDate: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        default: null,
    },
    createdBy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Defaults to current timestamp
        required: true,
    },
    tags: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: [],
    },
    updatedAt: {
        type: Date,
        default: Date.now,  // Defaults to current timestamp
        required: true,
    },
    priority: {
        type: String,
        default: null,
    },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;