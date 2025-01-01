const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },
    taskId: {
        type: Number,
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
    priority: {
        type: String,
        default: null,
    },
    tags: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: [],
    },
    assignedBy: {
        type: String,
        default: null,
    },
    assignedTo: {
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
    updatedAt: {
        type: Date,
        default: Date.now,  // Defaults to current timestamp
        required: true,
    },
    updatedBy: {
        type: String,
        required: true,
    },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;