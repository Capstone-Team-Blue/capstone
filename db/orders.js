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

async function getOrdersAndProductsByUserId(userId){
    try {
        let allOrders = await getOrdersByUserId(userId)
        const {rows: products} = await client.query(`
            SELECT orders.id, orders."userId", orders_products."productId", orders_products.quantity, orders_products."unitCost" FROM orders
            JOIN orders_products ON orders.id=orders_products."orderId"
            WHERE "userId"=$1;
        `, [userId])

        const {rows: names} = await client.query(`
            SELECT orders_products."productId", products.name FROM orders_products
            JOIN products ON products.id=orders_products."productId";
        `)

        products.forEach(product => {
            let foundItem = names.find(el => el.productId === product.productId) 
            product.name = foundItem.name
        })

        allOrders.forEach(order => {
            let filteredProducts = products.filter(product => product.id === order.id)
            order.products = filteredProducts
        })

        return allOrders

    } catch (err) {
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

async function getCart(userId){
    try{
        const {rows: orders} = await client.query(`
            SELECT orders_products.id, orders."userId", orders."isCart", orders_products."orderId", orders_products."productId", orders_products.quantity, orders_products."unitCost", products.name, products.image FROM orders
            JOIN orders_products ON orders.id = orders_products."orderId"
            JOIN products ON orders_products."productId" = products.id
            WHERE "userId"=$1 AND "isCart" = 'true';
        `, [userId])

        return orders

    } catch (err){
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
      getOrdersByOrderId,
      getOrdersAndProductsByUserId,
      getCart
  }