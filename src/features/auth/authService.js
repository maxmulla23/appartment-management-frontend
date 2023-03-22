// Login user
import axios from 'axios'

// register
const register = async data => {
  const response = await axios.post('auth/register', data)
  console.log(response.data)
  if (response.data) {
    return response.data
  }
}

// login
const login = async data => {
  const response = await axios.post('auth/login', data)
  console.log(response.data)
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  }
}

// Logout user
const logout = async () => {
  localStorage.removeItem('user')
}

const authService = {
  login,
  logout,
  register
}

export default authService
