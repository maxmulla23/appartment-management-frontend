import axios from 'axios'

export async function getAllProperties () {
  const response = await axios.get('property')
  return response.data
}
