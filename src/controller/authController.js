const express = require('express');

const User = require('../model/user');

const router = express.Router();

//rota para salvar um User no banco
router.post('/register', async (req, res) => {
    const {email} = req.body;

    try{
        if(await User.findOne({email})){
            return res.status(400).send({error: 'User already exists'});
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({user});
    } catch (err){
        return res.status(400).send({error: 'Registration failed'});
    }
});

//rota para retornar todos os User's do banco 
router.get('/list', async (req, res) => {
    try{
        const users = await User.db.collection('users').find({}).toArray();
        res.send({users});
    } catch (err){
        return res.status(500).send({error: 'Operation failed'});
    }
});

//rota para buscar um User no banco
router.get('/find', async (req, res) => {
    try{

    } catch (err){
        return res.status(400).send({error: 'Operation failed'});
    }
});

module.exports = app => app.use('/auth', router);