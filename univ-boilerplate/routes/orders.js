const express = require('express')
const ordersRouter = express.Router();
const {requireLogin} = require('./utils')

const {
    createOrder,
    getOrdersByUserId,
    updateCart
} = require('../db/index')

ordersRouter.get('/me', requireLogin, async (req, res, next) => {
    try{
        let orders = await getOrdersByUserId(req.user.id)
        res.send(orders)
    } catch(err){
        next(err)
    }
})

module.exports = ordersRouter