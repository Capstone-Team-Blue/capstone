const ordersProductsRouter = require('express').Router()
const { createOrdersProducts,
        updateOrdersProductsQuantity,
        getOrdersProductsByOrderId,
        getOrdersProductsById,
        deleteOrdersProducts,
        getOrdersByOrderId,} = require('../db')
const { requireLogin } = require('./utils')

ordersProductsRouter.post('/create', requireLogin, async(req, res, next) => {
    const { orderId, productId, quantity, unitCost } = req.body
    try {
        const orders = await getOrdersByOrderId(orderId)
        if (!orders) {
            // res.status(401)
            next({
                name: 'OrdersNotFoundError',
                message: 'no orders found for that orderId'
            })
        } else if (req.user.id !== orders.userId) {
            // res.status(401)
                next({
                    name: 'IncorrectUserError',
                    message: 'user id and user belonging to that order do not match'
                })
        } else {
            const ordersProducts = await createOrdersProducts({orderId: orderId, productId: productId, quantity: quantity, unitCost: unitCost})
            res.send(ordersProducts)
        }
    } catch (err) {
        throw err
    }
})

ordersProductsRouter.get('/:orderId', requireLogin, async(req, res, next) => {
    const { orderId } = req.params
    try {
        const orders = await getOrdersByOrderId(orderId)
        if (!orders) {
            // res.status(401)
            next({
                name: 'OrdersNotFoundError',
                message: 'no orders found for that orderId'
            })
        } else if (req.user.id !== orders.userId) {
            // res.status(401)
                next({
                    name: 'IncorrectUserError',
                    message: 'user id and user belonging to that order do not match'
                })
        } else {
            const ordersProducts = await getOrdersProductsByOrderId(orderId)
            res.send(ordersProducts)
        }
    } catch (err) {
        throw err
    }
})

ordersProductsRouter.patch('/:id', requireLogin, async(req, res, next) => {
    const { id } = req.params
    const { quantity } = req.body
    try {
        const ordersProducts = await getOrdersProductsById(id)
        const orders = await getOrdersByOrderId(ordersProducts.orderId)
        if (!ordersProducts) {
            // res.status(401)
            next({
                name: 'OrdersProductsNotFoundError',
                message: 'no orders products found for that id'
            })
        } else if (!orders) {
            // res.status(401)
            next({
                name: 'OrdersNotFoundError',
                message: 'no orders found for that orderId'
            })
        } else {
            if (req.user.id !== orders.userId) {
                // res.status(401)
                next({
                    name: 'IncorrectUserError',
                    message: 'user id and user belonging to that orders products do not match'
                })
            } else if (!orders.isCart) {
                // res.status(401)
                next({
                    name: 'NotCartError',
                    message: 'that orderId is not a cart and is a finished order'
                })
            } else {
                const updatedOrdersProducts = await updateOrdersProductsQuantity({id: id, quantity: quantity})
                res.send(updatedOrdersProducts)
            }
        }
    } catch (err) {
        throw err
    }
})

ordersProductsRouter.delete('/:id', requireLogin, async(req, res, next) => {
    const { id } = req.params
    try {
        const ordersProducts = await getOrdersProductsById(id)
        if (!ordersProducts) {
            // res.status(401)
            next({
                name: 'OrdersProductsNotFoundError',
                message: 'no orders products found for that order id'
            })
        } else {
            const orders = await getOrdersByOrderId(ordersProducts.orderId)
            if (!orders) {
                // res.status(401)
                next({
                    name: 'OrdersNotFoundError',
                    message: 'no orders found for that orderId'
                })
            } else {
                if (req.user.id !== orders.userId) {
                    // res.status(401)
                    next({
                        name: 'IncorrectUserError',
                        message: 'user id and user belonging to that orders products do not match'
                    })
                } else if (!orders.isCart) {
                    // res.status(401)
                    next({
                        name: 'NotCartError',
                        message: 'that orderId is not a cart and is a finished order'
                    })
                } else {
                    const deletedOrdersProducts = await deleteOrdersProducts(id)
                    res.send(deletedOrdersProducts)
                }
            }
        }
    } catch (err) {
        throw err
    }
})

module.exports = ordersProductsRouter