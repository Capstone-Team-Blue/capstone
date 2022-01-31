const BASE_URL = 'https://calm-fjord-72273.herokuapp.com/api'
const BASE_URL_TEST = 'http://localhost:4000/api'

export async function loginUser(username, password) {
    try{
      const response = await fetch(`${BASE_URL_TEST}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    const data = await response.json()

    return data

    } catch(error){
      throw error
    }
}

export async function registerUser(username, password, email, address) {
  try{
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        address: address
      })
    })

    const data = await response.json()

    return data

  } catch(error){
    throw error
  }
}

export async function getUserOrders(token) {
  try {
    const response = await fetch(`${BASE_URL_TEST}/orders/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await response.json()

    return data
    
  } catch (error) {
    throw error
  }
}

export async function getUserCart(token) {
  try{
    const response = await fetch(`${BASE_URL_TEST}/orders/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await response.json()

    return data

  } catch (error) {
    throw error
  }
}

export async function updateQuantity(quantity, orderId, token){
  try{
    const response = await fetch(`${BASE_URL}/orders_products/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        quantity: quantity
      })
    })

    const data = response.json()
    
    return data

  } catch (error){
    throw error
  }
}