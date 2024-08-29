import React from 'react'
import { useNavigate } from 'react-router-dom'

const SideNav = () => {

  let navigate = useNavigate()

  const logoutFunction = () =>
  {
    localStorage.removeItem('userToken')

    navigate("/login")
  }


  return (
    <div>
      <button className="logout-button" onClick={logoutFunction}>Logout</button>
    </div>
  )
}

export default SideNav