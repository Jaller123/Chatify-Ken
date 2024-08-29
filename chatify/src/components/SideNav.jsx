import React from 'react'

const SideNav = () => {

  const logoutFunction = () =>
  {
    localStorage.removeItem('userToken')
    localStorage.clear('userToken')
    
  }


  return (
    <div>
      <button className="logout-button" onClick={logoutFunction}>Logout</button>
    </div>
  )
}

export default SideNav