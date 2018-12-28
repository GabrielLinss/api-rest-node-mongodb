const Project = require('../model/project');
const Task = require('../model/task');

exports.listAll = async (req, res) => {
    try{
        const projects = await Project.find();

        return res.send({projects});
    } catch(err){
        res.status(400).send({error: 'Error loading projects'});
    }
};

exports.find = async (req, res) => {
    res.send({user: req.userId});
};

exports.save = async (req, res) => {
    try{
        const project = await Project.create({...req.body, user: req.userId});

        return res.send({project});
    } catch(err){
        res.status(400).send({error: 'Error creating new project'});
    }
};

exports.update = async (req, res) => {
    res.send({user: req.userId});
};

exports.delete = async (req, res) => {
    res.send({user: req.userId});
};