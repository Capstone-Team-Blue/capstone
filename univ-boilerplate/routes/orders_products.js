const ordersProductsRouter = require('express').Router()
const { createOrdersProducts,
        updateOrdersProducts,
        getOrdersProductsByOrderId,
        getOrdersProductsById,
        deleteOrdersProducts} = require('../db')
const { requireLogin } = require('./utils')

ordersProductsRouter.post('/create', requireLogin, async(req, res, next) => {
    const { orderId, productId, quantity, unitCost } = req.body
    try {
        const ordersProducts = await createOrdersProducts({orderId: orderId, productId: productId, quantity: quantity, unitCost: unitCost})
        res.send(ordersProducts)
    } catch (err) {
        throw err
    }
})

ordersProductsRouter.get('/:orderId', requireLogin, async(req, res, next) => {
    const { orderId } = req.params
    try {
        const ordersProducts = await getOrdersProductsByOrderId(orderId)
        res.send(ordersProducts)
    } catch (err) {
        throw err
    }
})

ordersProductsRouter.patch('/:id', requireLogin, async(req, res, next) => {
    const { id } = req.params
    const { orderId, productId, quantity, unitCost } = req.body
    try {
        const ordersProducts = await getOrdersProductsById(id)
        if (!ordersProducts) {
            res.status(401)
            next({
                name: 'OrdersProductsNotFoundError',
                message: 'no orders products found for that id'
            })
        } else {
            if (req.user.id !== ordersProducts.userId) {
                res.status(401)
                next({
                    name: 'IncorrectUserError',
                    message: 'user id and user belonging to that orders products do not match'
                })
            } else {
                const updatedOrdersProducts = await updateOrdersProducts({id: id, orderId: orderId, productId: productId, quantity: quantity, unitCost: unitCost})
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
            res.status(401)
            next({
                name: 'OrdersProductsNotFoundError',
                message: 'no orders products found for that order id'
            })
        } else {
            if (req.user.id !== ordersProducts.userId) {
                res.status(401)
                next({
                    name: 'IncorrectUserError',
                    message: 'user id and user belonging to that orders products do not match'
                })
            } else {
                const deletedOrdersProducts = await deleteOrdersProducts(id)
                res.send(deletedOrdersProducts)
            }
        }
    } catch (err) {
        throw err
    }
})

module.exports = ordersProductsRouter