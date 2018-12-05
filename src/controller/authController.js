const express = require('express');
const User = require('../model/user');
const router = express.Router();

//route to save one user
router.post('/users', async (req, res) => {
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

//route to return all users
router.get('/users', async (req, res) => {
    try{
        const users = await User.db.collection('users').find({}).toArray();
        res.send({users});
    } catch (err){
        return res.status(500).send({error: 'Operation failed'});
    }
});

//route to find one user
router.get('/users/:name', async (req, res) => {
    const name = req.params.name;

    try{
        const user = await User.findOne({name});
        if(user != null){
            return res.status(200).send({user});
        }
        else{
            return res.status(400).send({error: 'User not found'});
        }
    } catch (err){
        return res.status(400).send({error: 'Operation failed'});
    }
});

//route to update one user
router.put('/users/:id', async (req, res) => {
    const putData = {
        "id": req.params.id,
        "name": req.body.name,
        "email": req.body.email
    };

    const id = req.params.id;

    try{
        let user = await User.findById(id);
        if(user._id == id){
            if(await User.updateOne(putData)){
                return res.status(200).send();
            }
        }

    } catch (err){
        return res.status(400).send({error: 'Operation failed'});
    }
});

//route to delete one user
router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try{
        let user = await User.findById(id);
        if(user != null){
            if(await User.deleteOne(user)){
                return res.status(200).send();
            }
        }
    }catch (err){
        return res.status(400).send({error: 'Operation failed'});    
    }
});

module.exports = app => app.use('/auth', router);