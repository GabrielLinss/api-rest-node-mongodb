const express = require('express');
const router = express.Router();
const controller = require('../app/controller/projectController');
const authMiddleware = require('../app/middlewares/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    controller.listAll(req, res);
});

router.get('/:projectId', async (req, res) => {
    controller.find(req, res);
});

router.post('/', async (req, res) => {
    controller.save(req, res);
});

router.put('/:projectId', async (req, res) => {
    controller.update(req, res);
});

router.delete('/:projectId', async (req, res) => {
    controller.delete(req, res);
});

module.exports = app => app.use('/projects', router);