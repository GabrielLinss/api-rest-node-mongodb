const express = require('express');
const router = express.Router();
const controller = require('../app/controller/projectController');
const authMiddleware = require('../app/middlewares/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    controller.base(req, res);
});

module.exports = app => app.use('/projects', router);