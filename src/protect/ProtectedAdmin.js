import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"

const ProtectedAdmin = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  let location = useLocation()

  console.log()

  if (user?.token && user.user.roleId !== 1) {
    return <Navigate to='/dashboard' state={{ from: location }} replace />
  }
  return children
}

export default ProtectedAdmin
