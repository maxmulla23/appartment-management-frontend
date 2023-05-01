import { replace } from "lodash"
import React from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

const Protected = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  let location = useLocation()

  if (!user?.token || !user?.user) {
    return navigate("/login", replace)
    //   return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children
}

export default Protected
