const client = require("./client");

async function createOrder({userId, isCart}){
    try{
      const {rows: [order]} = await client.query(`
        INSERT INTO orders("userId", "isCart")
        VALUES ($1, $2)
        RETURNING *;
      `, [userId, isCart])
  
      return order
  
    } catch(err){
      throw err
    }
  }

async function getOrdersByUserId(userId){
    try{
        const {rows: orders} = await client.query(`
            SELECT * FROM orders
            WHERE "userId"=$1;
        `, [userId])

        return orders

    } catch(err){
        throw err
    }
}

async function updateCart(id, isCart){
    try{
        const {rows: [order]} = await client.query(`
            UPDATE orders
            SET "isCart"=$2
            WHERE id=$1
            RETURNING *;
        `, [id, isCart])

        return order

    } catch(err){
        throw err
    }
}

async function getOrdersByOrderId(id){
    try{
        const {rows: [orders]} = await client.query(`
            SELECT * FROM orders
            WHERE id=$1;
        `, [id])

        return orders

    } catch(err){
        throw err
    }
}

  module.exports = {
      createOrder,
      getOrdersByUserId,
      updateCart,
      getOrdersByOrderId
  }