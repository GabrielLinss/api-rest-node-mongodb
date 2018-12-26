const express = require('express');
const router = express.Router();
const controller = require('../controller/projectController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    controller.base(req, res);
});

module.exports = app => app.use('/projects', router);