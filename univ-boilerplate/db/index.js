
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

// export
module.exports = {
  client,
  createReview,
  ...require('./users'),
  ...require('./products'),
  ...require('./orders_products'),
  ...require('./orders')
  // db methods
}