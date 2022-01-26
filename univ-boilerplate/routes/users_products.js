const usersProductsRouter = require('express').Router()
const { createUsersProducts } = require('../db')
const { updateUsersProducts, deleteUsersProducts, getUsersProductsById } = require('../db/users_products')
const { requireLogin } = require('./utils')

usersProductsRouter.post('/', requireLogin, async(req, res, next) => {
    const { userId, productId, quantity } = req.body
    try {
        const usersProducts = await createUsersProducts({userId: userId, productId: productId, quantity: quantity})
        res.send(usersProducts)
    } catch (err) {
        throw err
    }
})

usersProductsRouter.patch('/:usersProductsId', requireLogin, async(req, res, next) => {
    const { usersProductsId } = req.params
    const { userId, productId, quantity } = req.body
    try {
        const usersProducts = await getUsersProductsById(usersProductsId)
        if (!usersProducts) {
            res.status(401)
            next({
                name: 'UsersProductsNotFoundError',
                message: 'no users products found for that id'
            })
        } else {
            if (req.user.id !== usersProducts.userId) {
                res.status(401)
                next({
                    name: 'IncorrectUserError',
                    message: 'you must be logged in as that user'
                })
            } else {
                const updatedUsersProducts = await updateUsersProducts ({id: usersProductsId, userId: userId, productId: productId, quantity: quantity})
                res.send(updatedUsersProducts)
            }
        }
    } catch (err) {
        throw err
    }
})

usersProductsRouter.delete('/:usersProductsId', requireLogin, async(req, res, next) => {
    const { usersProductsId } = req.params
    try {
        const usersProducts = await getUsersProductsById(usersProductsId)
        if (!usersProducts) {
            res.status(401)
            next({
                name: 'UsersProductsNotFoundError',
                message: 'no users products found for that id'
            })
        } else {
            if (req.user.id !== usersProducts.userId) {
                res.status(401)
                next({
                    name: 'IncorrectUserError',
                    message: 'you must be logged in as that user'
                })
            } else {
                const deletedUsersProducts = await deleteUsersProducts (usersProductsId)
                res.send(deletedUsersProducts)
            }
        }
    } catch (err) {
        throw err
    }
})

module.exports = usersProductsRouter