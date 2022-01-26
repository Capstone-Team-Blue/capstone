const { client } = require('./index')

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

async function getUsersProductsById(id) {
    try{
        const {rows: [usersProducts]} = await client.query(`
            SELECT * FROM users_products
            WHERE id=$1;
        `, [id])

        return usersProducts

    } catch (err) {
        throw err
    }
}

async function updateUsersProducts({id, userId, productId, quantity}) {
    try {
        const {rows: [usersProducts]} = await client.query(`
            UPDATE users_products
            SET "userId" = COALESCE($2, "userId"), "productId" = COALESCE($3, "productId"), quantity = ($4, quantity)
            WHERE id = $1
            RETURNING *;
        `, [id, userId, productId, quantity])

        return usersProducts

    } catch (err) {
        throw err
    }
}

async function deleteUsersProducts(id) {
    try {
        const {rows: [usersProducts]} = await client.query(`
            DELETE FROM users_products
            WHERE id=$1
            RETURNING *;
        `, [id])

        return usersProducts

    } catch (err) {
        throw err
    }
}

module.exports = {
    createUsersProducts,
    getUsersProductsById,
    updateUsersProducts,
    deleteUsersProducts
}