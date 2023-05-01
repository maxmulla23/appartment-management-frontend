import { useState } from "react"
import { Route, Routes } from "react-router-dom"
// import Protected from "./protect/Protected"

// import Protected from "./hooks/Protected"
import Dashboard from "./layouts/DashBoard"

import Complaints from "./pages/Complaints"
import DashboardHome from "./pages/DashboardHome"
import Houses from "./pages/Houses"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import MyComplaints from "./pages/MyComplaints"
import Register from "./pages/Register"
import Notices from "./pages/Notices"
// import ProtectedAdmin from "./protect/ProtectedAdmin"

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<DashboardHome />} />

          <Route path='appartments' element={<Houses />} />
          <Route path='notices' element={<Notices />} />
          <Route path='complaints' element={<Complaints />} />
          <Route path='home' element={<MyComplaints />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
