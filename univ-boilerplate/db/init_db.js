// code to build and initialize DB goes here
const {
  createUser,
  createProduct,
  createOrder,
  createReview,
  createOrderProducts,
  createUsersProducts
  // other db methods 
} = require('./index');

const client = require('./client')

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("dropping all tables...")
    try{
      await client.query(`
        DROP TABLE IF EXISTS users_products;
        DROP TABLE IF EXISTS orders_products;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
    `)
    } catch(error){
        throw(error)
    }
    // build tables in correct order
    console.log("Starting to build tables...");
    try{
      await client.query(`
        CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          "isAdmin" BOOLEAN DEFAULT FALSE,
          unique(username, email)
        );
      `)

      await client.query(`
          CREATE TABLE products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DECIMAL NOT NULL,
            description TEXT,
            image TEXT
          );
      `)

      await client.query(`
            CREATE TABLE orders(
              id SERIAL PRIMARY KEY,
              "userId" INTEGER REFERENCES users(id)
            );
      `)

      await client.query(`
            CREATE TABLE reviews(
              id SERIAL PRIMARY KEY,
              "productId" INTEGER REFERENCES products(id),
              "userId" INTEGER REFERENCES users(id),
              rating INTEGER NOT NULL,
              content TEXT
            );
      `)

      await client.query(`
            CREATE TABLE orders_products(
              id SERIAL PRIMARY KEY,
              "orderId" INTEGER REFERENCES orders(id),
              "productId" INTEGER REFERENCES products(id)
            );
      `)

      await client.query(`
            CREATE TABLE users_products(
              id SERIAL PRIMARY KEY,
              "userId" INTEGER REFERENCES users(id),
              "productId" INTEGER REFERENCES products(id),
              quantity INTEGER
            );
      `)

    } catch(error){
      throw error
    }
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    console.log('creating users')
    const usersToCreate = [
      { username: 'harmeet', password: 'harmeet99', email: 'harmeet@mail.com', address: '123 house street' },
      { username: 'dan', password: 'dan123', email: 'dan@mail.com', address: '124 house street' },
      { username: 'mallorie', password: 'mallorie1234', email: 'mallorie@mail.com', address: '125 house street' },
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');

    const productsToCreate = [
      {name: 'car', price: '24.99', description: 'its a used car', image: 'google.com/car'},
      {name: 'toy', price: '15', image: 'google.com/toy'},
      {name: 'pancake', price: '11.50', description: 'its a pancake'}
    ]

    const products = await Promise.all(productsToCreate.map(createProduct))
    console.log('initial products created: ')
    console.log(products)
    console.log('finished creating products!')

    const ordersToCreate = [
      {userId: 1},
      {userId: 3}
    ]

    const orders = await Promise.all(ordersToCreate.map(createOrder))
    console.log('orders created')
    console.log(orders)

    const reviewsToCreate = [
      {productId: 1, userId: 2, rating: 2, content: 'i love this'},
      {productId: 3, userId: 1, rating: 3},
      {productId: 2, userId: 3, rating: 5, content: 'its okay'}
    ]

    const reviews = await Promise.all(reviewsToCreate.map(createReview))
    console.log('reviews created')
    console.log(reviews)

    const orderProductsToCreate = [
      {orderId: 1, productId: 2},
      {orderId: 2, productId: 3}
    ]

    const orderProducts = await Promise.all(orderProductsToCreate.map(createOrderProducts))
    console.log('order products created')
    console.log(orderProducts)

    const userProductsToCreate = [
      {userId: 1, productId: 2},
      {userId: 2, productId: 3}
    ]

    const userProducts = await Promise.all(userProductsToCreate.map(createUsersProducts))
    console.log('user products created')
    console.log(userProducts)
    
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());