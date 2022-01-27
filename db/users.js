const client = require("./client");
const bcrypt = require('bcrypt');

async function createUser({username, password, email, address}) {

    const SALT_COUNT = 15;
    let pwHash = await bcrypt.hash(password, SALT_COUNT)

    try{
        const {rows: [user]} = await client.query(`
            INSERT INTO users(username, password, email, address)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (username, email) DO NOTHING 
            RETURNING *;
        `, [username, pwHash, email, address]);
  
        return user
  
    } catch(err){
        throw err;
    }
}

async function getAllUsers() {
    try{
        const {rows: users} = await client.query(`
            SELECT * FROM users;
        `)
        
        delete users.password

        return users

    } catch(err){
        throw err
    }
}

async function getUser({username, password}){
    try{
        const {rows: [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1;
        `, [username])

        let compare = await bcrypt.compare(password, user.password)

        if(compare){
            delete user.password

            return user
        }

    } catch(err){
        throw err;
    }
}

async function getUserById(id){
    try{
        const {rows: [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE id=$1;
        `, [id])

        if(user) delete user.password

        return user

    } catch(err){
        throw err;
    }
}

async function getUserByEmail(email){
    try{
        const {rows: [user]} = await client.query(`
            SELECT * FROM users
            WHERE email=$1;
        `, [email])
        
        if(user) delete user.password

        return user

    } catch(err){
        throw err;
    }
}

async function getUserByUsername(username){
    try{
        const {rows: [user]} = await client.query(`
            SELECT username FROM users
            WHERE username=$1;
        `, [username])

        return user

    } catch(err){
        throw err;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getUserByUsername,
    getAllUsers,
    getUserById,
}