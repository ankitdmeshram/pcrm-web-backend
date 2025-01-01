// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
    createProject,
    allProjects,
    updateProject,
    deleteProject,
    viewProject,
    createTask,
    allTasks,
    updateTask,
    deleteTask,
    viewTask
} = require('../Controllers/projectController');
const auth = require('../Middleware/auth');

router.post('/create-project', auth, createProject);
router.post('/all-project', auth, allProjects);
router.post('/update-project', auth, updateProject);
router.post('/delete-project', auth, deleteProject);
router.post('/view-project', auth, viewProject);

router.post('/create-task', auth, createTask);
router.post('/all-tasks', auth, allTasks);
router.post('/update-task', auth, updateTask);
router.post('/delete-task', auth, deleteTask);
router.post('/view-task', auth, viewTask);

module.exports = router;
