const client = require('./client')

async function createOrdersProducts({orderId, productId, quantity, unitCost}) {
    try{
      const {rows: [ordersProducts]} = await client.query(`
        INSERT INTO orders_products("orderId", "productId", quantity, "unitCost")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `, [orderId, productId, quantity, unitCost])
  
      return ordersProducts
  
    } catch(err){
      throw err
    }
}

async function getOrdersProductsById(id) {
    try {
        const {rows: [ordersProducts]} = await client.query(`
            SELECT * FROM orders_products
            WHERE id=$1;
        `, [id])

        return ordersProducts

    } catch (err) {
        throw err
    }
}

async function getOrdersProductsByOrderId(orderId) {
    try {
        const {rows: ordersProducts} = await client.query(`
            SELECT * FROM orders_products
            WHERE "orderId"=$1;
        `, [orderId])

        return ordersProducts

    } catch (err) {
        throw err
    }
}

async function updateOrdersProductsQuantity({id, quantity}) {
    try {
        const {rows: [ordersProducts]} = await client.query(`
            UPDATE orders_products
            SET quantity = COALESCE($2, quantity)
            WHERE id = $1
            RETURNING *;
        `, [id, quantity])

        return ordersProducts

    } catch (err) {
        throw err
    }
}

async function deleteOrdersProducts(id) {
    try {
        const {rows: [ordersProducts]} = await client.query(`
            DELETE FROM orders_products
            WHERE id=$1
            RETURNING *;
        `, [id])

        return ordersProducts

    } catch (err) {
        throw err
    }
}

module.exports = {
    createOrdersProducts,
    getOrdersProductsById,
    getOrdersProductsByOrderId,
    updateOrdersProductsQuantity,
    deleteOrdersProducts,
}