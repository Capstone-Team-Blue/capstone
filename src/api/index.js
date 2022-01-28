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