const User = require("../Models/User");
const Project = require("../Models/Project");
const { validateEmail } = require("../utils/common");
// const { sendMail } = require("./mailController");
const moment = require('moment');
const Task = require("../models/Task");

exports.createProject = async (req, res) => {
    try {
        const { projectName, description, startDate, endDate, dueDate, status, createdAt, updatedAt } = req.body;
        console.log("req.user", req.user);
        const createdBy = req.user.userId;

        if (!projectName || !createdBy) {
            return res.status(400).json({
                success: false,
                message: "Project name and createdBy are required",
            });
        }
        member = [{ userId: createdBy, role: 'admin' }]
        const userExists = await User.findById(createdBy);
        if (!userExists) {
            return res.status(400).json({
                success: false,
                message: "User does not exist",
            });
        }
        const projectCount = await Project.find({ createdBy: createdBy }).countDocuments();
        if (projectCount >= 100) {
            return res.status(400).json({
                success: false,
                message: "You have reached the maximum number of projects you can create",
            });
        }
        const project = await Project.create({
            projectName,
            description,
            startDate,
            endDate,
            status,
            createdBy,
            createdAt,
            dueDate,
            updatedAt,
            member
        });
        res.status(201).send({ success: true, project, message: 'Project created successfully!' });
    } catch (error) {
        console.log("error", error);
        // sendMail("ankit.meshram@brokod.com", 'PCRM - ERROR', `Dear Ankit,\n\n Getting error while creating project \n\n Kindly check this error on urgently basis.\n\n Error - ${error} \n\n Best regards,\nPCRM`);

        res.status(400).send({ success: false, message: "Something went wrong" });
    }
}

exports.allProjects = async (req, res) => {
    try {

        let projects = await Project.find({
            member: { $elemMatch: { userId: req.user.userId } }
        }).sort({ _id: -1 })

        res.status(200).send({ success: true, projects, projectsCount: projects.length });
    } catch (error) {
        // sendMail("ankit.meshram@brokod.com", 'PCRM - ERROR', `Dear Ankit,\n\n Getting error while fetching all projects. \n\n Kindly check this error on urgently basis.\n\n Error - ${error} \n\n Best regards,\nPCRM`);

        console.log("error", error);
        res.status(400).send({ success: false, message: "Something went wrong" });
    }
}

exports.updateProject = async (req, res) => {
    try {
        const { _id, projectName, description, startDate, endDate, dueDate, status, createdBy, updatedAt, member } = req.body;
        if (!projectName || !_id) {
            return res.status(400).json({
                success: false,
                message: "Project name and createdBy are required",
            });
        }
        const userExists = await User.findById(createdBy);
        if (!userExists) {
            return res.status(400).json({
                success: false,
                message: "User does not exist",
            });
        }
        const project = await Project.findById(_id);

        if (!project) {
            return res.status(400).json({
                success: false,
                message: "Project not found",
            });
        }

        const isMember = project.member.find(member => member.userId == req.user.userId);
        if (!isMember) {
            return res.status(400).json({
                success: false,
                message: "You are not a member of this project",
            });
        }

        const updatedProject = await Project.findByIdAndUpdate(_id, {
            projectName,
            description,
            startDate,
            endDate,
            dueDate,
            status,
            createdBy,
            updatedAt: Date.now(),
            member
        }, { new: true });

        res.status(200).send({ success: true, updatedProject, message: 'Project updated successfully!' });
    } catch (error) {
        // sendMail("ankit.meshram@brokod.com", 'PCRM - ERROR', `Dear Ankit,\n\n Getting error while updating project. \n\n Kindly check this error on urgently basis.\n\n Error - ${error} \n\n Best regards,\nPCRM`);

        res.status(400).send({ success: false, message: "Something went wrong" });
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Project id is required",
            });
        }
        const project = await Project.findById(_id);

        if (!project) {
            return res.status(400).json({
                success: false,
                message: "Project not found",
            });
        }

        const isMember = project.member.find(member => member.userId == req.user.userId && member.role == 'admin');
        if (!isMember) {
            return res.status(400).json({
                success: false,
                message: "You don't have permission to delete this project",
            });
        }

        await Project.findByIdAndDelete(_id);
        await Task.deleteMany({ projectId: _id });

        res.status(200).send({ success: true, message: 'Project deleted successfully!' });
    } catch (error) {
        // sendMail("ankit.meshram@brokod.com", 'PCRM - ERROR', `Dear Ankit,\n\n Getting error while deleting project. \n\nKindly check this error on urgently basis.\n\n Error - ${error} \n\n Best regards,\nPCRM`);

        res.status(400).send({ success: false, message: "Something went wrong" });
    }
}

exports.viewProject = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Project id is required",
            });
        }
        const project = await Project.findById(_id);

        if (!project) {
            return res.status(400).json({
                success: false,
                message: "Project not found",
            });
        }

        const isMember = project.member.find(member => member.userId == req.user.userId);
        if (!isMember) {
            return res.status(400).json({
                success: false,
                message: "You are not a member of this project",
            });
        }

        res.status(200).send({ success: true, project });
    } catch (error) {
        // sendMail("ankit.meshram@brokod.com", 'PCRM - ERROR', `Dear Ankit,\n\n Getting error while viewing project \n\n Kindly check this error on urgently basis.\n\n Error - ${error} \n\n Best regards,\nPCRM`);

        res.status(400).send({ success: false, message: "Something went wrong" });
    }
}