const express = require('express')
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const {requireAdmin, requireLogin} = require('./utils')

const {
    createUser,
    getUser,
    getUserByEmail,
    getUserByUsername,
    getUserById,
    getAllUsers,
} = require('../db/index')

usersRouter.post('/register', async (req, res, next) => {
    const {username, password, email, address} = req.body
    try{
        let user = await getUserByUsername(username)
        let userEmail = await getUserByEmail(email)
        if(user || userEmail){
            res.status(401)
            next({
                name: "UserAlreadyExists",
                message: "That user already exists",
              });
        }

        else{
            let newUser = await createUser({username: username, password: password, email: email, address: address})
            const token = jwt.sign({id: newUser.id, username: newUser.username}, JWT_SECRET, {expiresIn: '1w'})
            res.send({ 
                message: "thank you for signing up",
                jwt: token,
          });
        }

    } catch(err){
        next(err)
    }
})

usersRouter.post('/login', async (req, res, next) => {
    const {username, password} = req.body

    try{
        let user = await getUser({username: username, password: password})
        delete user.email
        delete user.isAdmin
        delete user.address

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {expiresIn: '1w'});
        res.send({ 
        message: 'successfully logged in!',
        token: token,
        user: user
        })

    } catch(err){
        next(err)
    }
})

//would require admin
usersRouter.get('/all', requireAdmin, async (req, res, next) => {
    try{
        let users = await getAllUsers()
        res.send(users)
    } catch(err){
        next(err)
    }
})

//would require admin
usersRouter.get('/:userid', requireAdmin, async (req, res, next) => {
    const {userid} = req.params

    try{
        let user = await getUserById(userid)
        res.send(user)
    } catch(err){
        next(err)
    }
})

module.exports = usersRouter