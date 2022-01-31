const BASE_URL = 'https://calm-fjord-72273.herokuapp.com/api'

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
      },
    })

    const data = await response.json()

    return data
    
  } catch (error) {
    throw error
  }
}