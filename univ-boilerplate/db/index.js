
const client = require('./client')

//does not have its own js file yet
async function createOrder({userId}){
  try{
    const {rows: [order]} = await client.query(`
      INSERT INTO orders("userId")
      VALUES ($1)
      RETURNING *;
    `, [userId])

    return order

  } catch(err){
    throw err
  }
}

//does not have its own js file yet
async function createReview({productId, userId, rating, content}) {
  try{
    const {rows: [review]} = await client.query(`
      INSERT INTO reviews("productId", "userId", rating, content)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [productId, userId, rating, content])

    return review

  } catch(err){
    throw err
  }
}

//does not have its own js file yet
async function createOrderProducts({orderId, productId}) {
  try{
    const {rows: [orderProducts]} = await client.query(`
      INSERT INTO orders_products("orderId", "productId")
      VALUES ($1, $2)
      RETURNING *;
    `, [orderId, productId])

    return orderProducts

  } catch(err){
    throw err
  }
}

// export
module.exports = {
  client,
  createOrder,
  createReview,
  createOrderProducts,
  ...require('./users'),
  ...require('./products'),
  ...require('./users_products'),
  // db methods
}