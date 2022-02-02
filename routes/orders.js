const express = require('express')
const ordersRouter = express.Router();
const {requireLogin} = require('./utils')

const {
    createOrder,
    getOrdersByUserId,
    updateCart,
    getOrdersByOrderId,
    getOrdersAndProductsByUserId,
    getCart
} = require('../db/index')

ordersRouter.get('/me', requireLogin, async (req, res, next) => {
    try{
        const orders = await getOrdersByUserId(req.user.id)
        res.send(orders)
    } catch(err){
        next(err)
    }
})

ordersRouter.get('/cart', requireLogin, async (req, res, next) => {
    try{
        const cart = await getCart(req.user.id)
        if(!cart){
            res.send('nothing here yet!')
        }
        else{
            res.send(cart)
        }
    } catch (err) {
        throw err
    }
})

ordersRouter.post('/create', requireLogin, async (req, res, next) => {
    try{
        const newOrder = await createOrder({userId: req.user.id, isCart: true})
        res.send(newOrder)
    } catch(err){
        throw err
    }
})

ordersRouter.get('/orderid/:orderid', requireLogin, async (req, res, next) => {
    const {orderid} = req.params
    try{
        const order = await getOrdersByOrderId(orderid)
        if(req.user.id === order.userId){
            res.send(order)
        }
        else{
            res.status(401)
            next({
                name: "NotOwnerError",
                message: "You must be the one who made an order to view it",
            });
        }
        
    } catch(err){
        throw err
    }
})

ordersRouter.patch('/checkout/:orderid', requireLogin, async (req, res, next) => {
    const {orderid} = req.params
    try{
        const order = await getOrdersByOrderId(orderid)
        if(!order){
            res.status(401)
            next({
                name: "NoOrderFound",
                message: "No order found with that id",
            });
        }
        if(req.user.id === order.userId){
            const updatedOrder = await updateCart(orderid, false)
            res.send(updatedOrder)
        }
        else{
            res.status(401)
            next({
                name: "NotOwnerError",
                message: "You must be the one who made an order to check it out",
            });
        }

    } catch(err){
        throw err
    }
})

ordersRouter.get('/myorders/:userId', requireLogin, async (req, res, next) => {
    const { userId } = req.params
    try {
        const orders = await getOrdersAndProductsByUserId(userId)
        if (!orders) {
            res.status(401)
            next({
                name: 'NoOrdersFoundError',
                message: 'No orders were found for that userId'
            })
        } else if (req.user.id !== orders[0].userId) {
            res.status(401)
            next({
                name: 'NotOwnerError',
                message: 'You must be the one who made an order to view it'
            })
        } else {
            res.send(orders)
        }
    } catch (err) {
        throw err
    }
})

module.exports = ordersRouter