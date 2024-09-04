import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/SideNav.css';

const SideNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  let navigate = useNavigate();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const logoutFunction = () => {
    localStorage.removeItem('userToken');
    navigate("/login");
  };

  return (
    <>
      <button className="toggle-button" onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'} SideNav
      </button>
      {isVisible && (
        <div className="sidenav-container right">
          <button className="logout-button" onClick={logoutFunction}>Logout</button>
        </div>
      )}
    </>
  );
}

export default SideNav;