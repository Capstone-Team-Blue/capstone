const BASE_URL = 'http://localhost:4000/api'

export async function getAllOrdersForUser(userId) {
  try {
    const data = await fetch(`${BASE_URL}/orders`)
  } catch (error) {
    throw error
  }
}