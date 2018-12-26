const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

//function to save one user
exports.save = async (req, res) => {
    const {email} = req.body;

    try{
        if(await User.findOne({email})){
            return res.status(400).send({error: 'User already exists'});
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({user, token: generateToken({id: user.id})});
    } catch (err){
        return res.status(400).send({error: 'Registration failed'});
    }
};

//function to return all users
exports.all = async (req, res) => {
    try{
        const users = await User.db.collection('users').find({}).toArray();
        res.send({users});
    } catch (err){
        return res.status(500).send({error: 'Operation failed'});
    }
};

//function to find one user
exports.find = async (req, res) => {
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
};

//function to update one user
exports.update = async (req, res) => {
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
};

//function to delete one user
exports.delete = async (req, res) => {
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
};

//function to authenticate user
exports.authenticate = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return res.status(400).send({error: 'User not found'});
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({error: 'Invalid password'});
    }

    user.password = undefined;

    res.send({user, token: generateToken({id: user.id})});
};

//function to forgot password
exports.forgot_pass = async (req, res) => {
    const {email} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).send({error: 'User not found'});
        }

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        });

        mailer.sendMail({
            to: email,
            from: 'glins731@gmail.com',
            template: 'auth/forgot_password',
            context: {token}
        }, (err) => {
            if(err){
                return res.status(400).send({error: 'Cannot send forgot password email'});
            }

            return res.send();
        });
    } catch(err){
        res.status(400).send({error: 'Error on forgot password, try again'});
    }
};

//function to reset password
exports.reset_pass = async (req, res) => {
    const {email, token, password} = req.body;

    try{
        const user = await User.findOne({email})
        .select('+passwordResetToken passwordResetExpires');

        if(!user){
            return res.status(400).send({error: 'User not found'});
        }

        if(token !== user.passwordResetToken){
            return res.status(400).send({error: 'Token invalid'});
        }

        const now = new Date();

        if(now > user.passwordResetExpires){
            return res.status(400).send({error: 'Token expired, generate a new one'});
        }

        user.password = password;

        await user.save();

        res.send();
    } catch(err) {
        res.status(400).send({error: 'Cannot reset password, try again'});
    }
};