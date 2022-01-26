// Connect to DB
const { Client, ClientBase } = require('pg');
const DB_NAME = 'localhost:5432/grace'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);
// const {getAllProducts, getProductById, updateProductById, deleteProductById} = require('./products');

// database methods
async function createUser({username, password, email, address}) {
  try{
      const {rows: [user]} = await client.query(`
          INSERT INTO users(username, password, email, address)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (username) DO NOTHING
          RETURNING *;
      `, [username, password, email, address]);

      return user

  } catch(err){
      throw err;
  }
}

async function createProduct({name, price, description, image}){
  try{
    const {rows: [product]} = await client.query(`
      INSERT INTO products(name, price, description, image)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [name, price, description, image])

    return product

  }catch(err){
    throw err
  }
}

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

async function createUsersProducts({userId, productId, quantity}) {
  try{
    const {rows: [usersProducts]} = await client.query(`
      INSERT INTO users_products("userId", "productId", quantity)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [userId, productId, quantity])

    return usersProducts

  } catch(err){
    throw err
  }
}

// export
module.exports = {
  client,
  createUser,
  createProduct,
  createOrder,
  createReview,
  createOrderProducts,
  createUsersProducts,
  // db methods
}