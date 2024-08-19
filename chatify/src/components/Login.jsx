import React from 'react'
import { useEffect, useState, useRef,} from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [errorMessage, setErrorMessage] = useState()
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
                  console.log(data.token)
                  navigate('/chat') 
                }
              })
            
      
          }
        
  return (
    <form className="form">
        <h2>Login</h2>
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        <input type="text" placeholder="Username" ref={usernameRef} value={username} onChange={() => setUsername(usernameRef.current.value)} />
        <input type="text" placeholder="Password" ref={passwordRef} value={password} onChange={() => setPassword(passwordRef.current.value)} />
        <button onClick = {handleLogin} className='btn'>Login</button>
    </form>
  )
}

export default Login