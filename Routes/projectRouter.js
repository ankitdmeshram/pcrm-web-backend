// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createProject, allProjects, updateProject, deleteProject, viewProject } = require('../Controllers/projectController');
const auth = require('../middleware/auth');

router.post('/create-project', auth, createProject);
router.post('/all-project', auth, allProjects);
router.post('/update-project', auth, updateProject);
router.post('/delete-project', auth, deleteProject);
router.post('/view-project', auth, viewProject);

module.exports = router;
