const apiRouter = require('express').Router();

const usersRouter = require('./users')
//const productsRouter = require('./products')
//const reviewsRouter = require('./reviews')
//const ordersRouter = require('./orders')
//const ordersProductsRouter = require('./orders_products')
//const usersProductsRouter = require('./users_products')

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env
const { getUserById } = require('../db')

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer'
  const auth = req.header('Authorization')

  if (!auth) {
    next()
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length)

    try {
      const { id } = jwt.verify(token, JWT_SECRET)

      if (id) {
        req.user = await getUserById(id)
        next()
      }
    } catch ({ name, message }) {
      next({ name, message })
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`
    })
  }
})

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.use('/users', usersRouter)
//apiRouter.use('/products', productsRouter)
//apiRouter.use('/reviews', reviewsRouter)
//apiRouter.use('/orders', ordersRouter)
//apiRouter.use('/orders_products', ordersProductsRouter)
//apiRouter.use('/users_products', usersProductsRouter)

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message
  })
})

module.exports = apiRouter;
