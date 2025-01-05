const mongoose = require('mongoose');

const ProjectUserSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
    },
    status: {
        type: String,
        default: 'invited',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    invitedBy: {
        type: String,
        required: true,
    },
    invitedUserEmail: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('ProjectUser', ProjectUserSchema);