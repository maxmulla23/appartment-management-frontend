import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './layouts/DashBoard'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
