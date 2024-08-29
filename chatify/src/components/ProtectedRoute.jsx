import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
  return (
    localStorage.getItem('userToken') ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    )
  )
}

export default ProtectedRoute