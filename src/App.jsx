import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './layouts/DashBoard'
import Appartments from './pages/Appartments'
import Complaints from './pages/Complaints'
import DashboardHome from './pages/DashboardHome'
import Houses from './pages/Houses'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="appartments" element={<Houses />} />
          <Route path="complaints" element={<Complaints />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
