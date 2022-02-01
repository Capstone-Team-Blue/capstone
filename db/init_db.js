// code to build and initialize DB goes here
const {
  createUser,
  createProduct,
  createOrder,
  createReview,
  createOrdersProducts
  // other db methods 
} = require('./index');

const client = require('./client');
const { getOrdersByUserId } = require('./orders');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("dropping all tables...")
    try{
      await client.query(`
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
            price INTEGER NOT NULL,
            description TEXT,
            image TEXT
          );
      `)

      await client.query(`
            CREATE TABLE orders(
              id SERIAL PRIMARY KEY,
              "userId" INTEGER REFERENCES users(id),
              "isCart" BOOLEAN
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
              "productId" INTEGER REFERENCES products(id),
              quantity INTEGER,
              "unitCost" INTEGER
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
      { username: 'albert', password: 'albertie', email: 'mralbert@gmail.com', address: '083 albert street' },
      { username: 'pablita', password: 'pablita12', email: 'pablita@yahoo.com', address: '64 pablita street ' }
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');


    const productsToCreate = [
      {name: 'car', price: 2499, description: 'its a used car', image: 'google.com/car'},
      {name: 'toy', price: 1499, image: 'google.com/toy'},
      {name: 'pancake', price: 1150, description: 'its a pancake'},
      {name: 'board game', price: 1999, description: 'board game in a box', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/German_-_Box_for_Board_Games_-_Walters_7193_-_Bottom.jpg/800px-German_-_Box_for_Board_Games_-_Walters_7193_-_Bottom.jpg'},
      {name: 'bicycle', price: 39999, description: 'fastest bicycle on the planet', image: 'https://image.shutterstock.com/image-photo/yellow-black-29er-mountainbike-thick-600w-1498702814.jpg'},
      {name: 'Forest Gump Blu-ray', price: 999, description: 'Blu-ray version of Forest Gump'},
      {name: 'Excalibur', price: 99999, description: 'most majestic sword ever created'},
      {name: 'Vacuum', price: 5999, description: 'sucks up dirt like it was made for it because it was'},
      {name: 'Feather Duster', price: 539, description: 'CLEAN THAT DUST'},
      {name: 'Atari', price: 3674, description: 'revisit the good old days of gaming with this all-in-one gaming system'},
      {name: 'Gibson Guitar', price: 24999, description: 'premium guitar'},
      {name: '24-pack of Pepsi', price: 1299, description: '24 count of 12oz cans of Pepsi'},
      {name: 'RGB Mechanical Keyboard', price: 6000, description: 'mechanical gaming keyboard with backlit, color adjustable keys'},
      {name: 'Wireless Mouse', price: 1025, description: 'two-button ergonomical wireless mouth with usb receiver'},
      {name: 'Blutooth Speaker', price: 7499, description: 'waterproof speaker with blutooth technology for those that love to sing in the shower'},
      {name: 'Air Compressor', price: 8000, description: 'best air compressor on the market today'},
      {name: 'Sport Sunglasses', price: 400, description: 'uv-protecting sport sunglasses for active humans'},
      {name: 'Baseball Cap', price: 1999, description: 'support your favorite team with pride with this premium baseball cap'},
      {name: 'Tennis Racket', price: 1000, description: 'the last tennis racket you will ever need to buy'},
      {name: 'Playing Cards', price: 100, description: 'quality full deck of playing cards'},
      {name: 'Weighted Blanket', price: 8999, description: 'weighted blanket for cold nights and restless legs'}
    ]

    const products = await Promise.all(productsToCreate.map(createProduct))
    console.log('initial products created: ')
    console.log(products)
    console.log('finished creating products!')

    const ordersToCreate = [
      {userId: 1, isCart: false},
      {userId: 3, isCart: true},
      {userId: 4, isCart: true},
      {userId: 2, isCart: true},
      {userId: 2, isCart: false},
      {userId: 3, isCart: false},
      {userId: 4, isCart: false},
      {userId: 3, isCart: false},
      {userId: 3, isCart: false},
      {userId: 3, isCart: false},
      {userId: 4, isCart: false},
      {userId: 3, isCart: false},
      {userId: 3, isCart: false},
      {userId: 2, isCart: false},
      {userId: 2, isCart: false}
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

    const ordersProductsToCreate = [
      {orderId: 1, productId: 2, quantity: 5, unitCost: 1000},
      {orderId: 2, productId: 3, quantity: 1, unitCost: 2000},
      {orderId: 2, productId: 5, quantity: 1, unitCost: 3000},
      {orderId: 3, productId: 2, quantity: 4, unitCost: 1000},
      {orderId: 3, productId: 3, quantity: 1, unitCost: 2000},
      {orderId: 3, productId: 6, quantity: 1, unitCost: 9999},
      {orderId: 6, productId: 1, quantity: 1, unitCost: 999},
      {orderId: 5, productId: 2, quantity: 10, unitCost: 1000},
      {orderId: 5, productId: 3, quantity: 1, unitCost: 2000},
      {orderId: 2, productId: 10, quantity: 1, unitCost: 8392},
      {orderId: 1, productId: 2, quantity: 5, unitCost: 1000},
      {orderId: 2, productId: 3, quantity: 1, unitCost: 2000},
      {orderId: 3, productId: 2, quantity: 4, unitCost: 1000},
      {orderId: 3, productId: 3, quantity: 1, unitCost: 2000},
      {orderId: 3, productId: 6, quantity: 1, unitCost: 9999},
      {orderId: 6, productId: 1, quantity: 1, unitCost: 999},
      {orderId: 5, productId: 2, quantity: 10, unitCost: 1000},
      {orderId: 5, productId: 3, quantity: 1, unitCost: 2000},
      {orderId: 2, productId: 10, quantity: 1, unitCost: 8392},
      {orderId: 1, productId: 2, quantity: 5, unitCost: 1000},
      {orderId: 2, productId: 3, quantity: 1, unitCost: 2000},
      {orderId: 3, productId: 2, quantity: 4, unitCost: 1000},
      {orderId: 3, productId: 3, quantity: 1, unitCost: 2000},
      {orderId: 3, productId: 6, quantity: 1, unitCost: 9999},
      {orderId: 6, productId: 1, quantity: 1, unitCost: 999},
      {orderId: 5, productId: 2, quantity: 10, unitCost: 1000},
      {orderId: 5, productId: 3, quantity: 1, unitCost: 2000},
      {orderId: 2, productId: 10, quantity: 1, unitCost: 8392},
    ]

    const ordersProducts = await Promise.all(ordersProductsToCreate.map(createOrdersProducts))
    console.log('order products created')
    console.log(ordersProducts)
    
    console.log('GRABBING ORDERS FROM USER 1')
    const ordersByUserId = await getOrdersByUserId(1)
    console.log(ordersByUserId)
  } catch (error) {
    throw error;
  }
}


buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());