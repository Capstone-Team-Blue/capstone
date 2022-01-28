<<<<<<< HEAD
const BASE_URL = 'http://localhost:4000/api'

export async function getAllOrdersForUser(userId) {
  try {
    const data = await fetch(`${BASE_URL}/orders`)
  } catch (error) {
    throw error
  }
=======
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
>>>>>>> b51c41462cf979e94eff44337625e72f44cc3b4e
}