const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema({
    projectName: {
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
    member: {
        type: Array,
        default: [],
    },
    updatedAt: {
        type: Date,
        default: Date.now,  // Defaults to current timestamp
        required: true,
    },
    other: {
        type: {},
        default: {},
    },
    lastTaskId: {
        type: Number,
        required: true,
    },

});

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
