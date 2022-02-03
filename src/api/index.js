const BASE_URL = 'https://calm-fjord-72273.herokuapp.com/api'
//const BASE_URL_TEST = 'http://localhost:4000/api'

export async function loginUser(username, password) {
    try{
      const response = await fetch(`${BASE_URL}/users/login`, {
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

export async function getUserOrders(token, userId) {
  try {
    const response = await fetch(`${BASE_URL}/orders/myorders/${userId}`, {
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
    const response = await fetch(`${BASE_URL}/orders/cart`, {
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

export async function updateQuantity(quantity, orders_productsId, token){
  try{
    const response = await fetch(`${BASE_URL}/orders_products/${orders_productsId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        quantity: quantity
      })
    })

    const data = await response.json()

    return data

  } catch (error){
    throw error
  }
}

export async function checkout(orderId, token){
  try{
    const response = await fetch(`${BASE_URL}/orders/checkout/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await response.json()

    return data

  } catch(error){
    throw error
  }
}

export async function removeFromCart(orderId, token){
  try {
    const response = await fetch(`${BASE_URL}/orders_products/${orderId}`, {
      method: "DELETE",
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

export async function addToCart(token, productId, quantity, unitCost){
  try{
    const userCart = await getUserCart(token)

    if(!userCart){
      const response = await fetch(`${BASE_URL}/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await response.json()

      const orderId = data.id
      const response2 = await fetch(`${BASE_URL}/orders_products/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: orderId,
          productId: productId,
          quantity: quantity,
          unitCost: unitCost
        })
      })

      const data2 = await response2.json()

      return data2.push(data)
    }
    else{

      const orderId = userCart[0].orderId
      const response3 = await fetch(`${BASE_URL}/orders_products/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: orderId,
          productId: productId,
          quantity: quantity,
          unitCost: unitCost
        })
      })

      const data = response3.json()

      return data
    }
  } catch (error){
    throw error
  }
}