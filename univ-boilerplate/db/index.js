
const client = require('./client')

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
async function createOrderProducts({orderId, productId, quantity, unitCost}) {
  try{
    const {rows: [orderProducts]} = await client.query(`
      INSERT INTO orders_products("orderId", "productId", quantity, "unitCost")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [orderId, productId, quantity, unitCost])

    return orderProducts

  } catch(err){
    throw err
  }
}

// export
module.exports = {
  client,
  createReview,
  createOrderProducts,
  ...require('./users'),
  ...require('./products'),
  ...require('./orders')
  // db methods
}