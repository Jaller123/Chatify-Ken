import React from 'react'
import { useEffect, useState, useRef,} from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Login.css'
import './CSS/Background.css'


const Login = () => {

    const [errorMessage, setErrorMessage] = useState()
    const [successMessage, setSuccesMessage] = useState("")
    const [csrfToken, setCrsfToken] = useState()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const usernameRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
   

    useEffect(() => 
      {
        fetch('https://chatify-api.up.railway.app/csrf', 
        {
          method: 'PATCH',
        })
          .then(res => res.json())
          .then(data => {console.log(data)
          setCrsfToken(data.csrfToken)
        })}, []);

        const handleLogin = (e) =>
          {
            e.preventDefault();

            fetch('https://chatify-api.up.railway.app/auth/token',
              {
                method: 'POST',
                headers:  
                {
                  'Content-Type': 'application/json',
                  'X-CSRF-Token': csrfToken,
                }, 
                body: JSON.stringify
                ({
                  csrfToken: csrfToken,
                  username: username,
                  password: password,
                })
              })
              .then(res => res.json())
              .then(data => {
                
                if (data.error)
                {
                  console.log("Could not find user,", data.error)
                  setErrorMessage(data.error)
                }
      
                else
                {
                  console.log("User Login succesfully") 
                  localStorage.setItem('userToken', data.token)
                  setErrorMessage("")
                  setSuccesMessage("User Login Succesful, redirecting...")
                  console.log(data.token)
                  setTimeout(() => 
                    {
                      navigate('/chat') 
                    }, 1000)
                }
              })
            
      
          }
        
  return (
    <div className="login-box">
    <form onSubmit={handleLogin}>
      <div className="user-box">
        <input
          type="text"
          name="username"
          ref={usernameRef}
          value={username}
          onChange={() => setUsername(usernameRef.current.value)}
          required
        />
        <label>Username</label>
      </div>
      <div className="user-box">
        <input
          type="password"
          name="password"
          ref={passwordRef}
          value={password}
          onChange={() => setPassword(passwordRef.current.value)}
          required
        />
        <label>Password</label>
      </div>
      <a href="#" onClick={handleLogin}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Login
      </a>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
  </div>
);
};

export default Login