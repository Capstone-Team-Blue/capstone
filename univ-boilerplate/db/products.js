const {client} = require('./index.js')


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

async function getAllProducts() {
  try {
    const {rows: products} = await client.query(`
      SELECT * FROM products
    `)
    return products;
  } catch (err) {
    throw err;
  }
}

async function getProductById(id) {
  try {
    const {rows: [product]} = await client.query(`
      SELECT name, price, description, image
      FROM products
      WHERE id=($1)
    `, [id])
    return product;
  } catch (err) {
    throw err;
  }
}

async function updateProductById({id, name, price, description, image}) {

  try {
    const {rows : [product]} = await client.query(`
    UPDATE products
    SET "name" = COALESCE($2, "name"), "price" = COALESCE($3, "price"), "description" = COALESCE($4, "description"), "image" = COALESCE($5, "image")
    WHERE id=($1)
    RETURNING *;
    `, [id, name, price, description, image])
    return product;
  }catch(err){
    throw err;
  }
}

async function deleteProductById(id) {
  try {
    await client.query(`
    DELETE FROM products
    WHERE id=($1);
    `, [id])
  }catch(err){
    throw err;
  }
}

// module.exports = {
//   getAllProducts,
//   getProductById,
//   updateProductById,
//   deleteProductById
// }