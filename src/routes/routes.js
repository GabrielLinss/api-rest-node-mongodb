const express = require('express');
const router = express.Router();
const controller = require('../app/controller/authController');

router.post('/users', async (req, res) => {
    controller.save(req, res);
});

router.get('/users', async (req, res) => {
    controller.all(req, res);
});

router.get('/users/:id', async (req, res) => {
    controller.find(req, res);
});

router.put('/users/:id', async (req, res) => {
    controller.update(req, res);
});

router.delete('/users/:id', async (req, res) => {
    controller.delete(req, res);
});

router.post('/users/authenticate', async (req, res) => {
    controller.authenticate(req, res);
});

router.post('/users/forgot_password', async (req, res) => {
    controller.forgot_pass(req, res);
});

router.post('/users/reset_password', async (req, res) => {
    controller.reset_pass(req, res);
});

module.exports = app => app.use('/auth', router);