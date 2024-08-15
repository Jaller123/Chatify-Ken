import React from 'react'
import { useEffect, useState, useRef } from 'react';

const Register = () => 
{
  

    const [csrfToken, setCrsfToken] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const emailRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    
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

    const handleRegister = (e) =>
    {
      e.preventDefault();

        fetch('https://chatify-api.up.railway.app/auth/register',
        {
          method: 'POST',
          headers:  {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          }, 
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.error)
          {
            console.log("Registration failed", data.error)
            setErrorMessage(data.error)
          }

          else
          {
            console.log("User registered succesfully") 
            navigate('/login') 
          }
        })
    }


  return (
    <form className="form" onSubmit={handleRegister}>
        <h2>Register</h2>
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        <input type="text" placeholder="Email" ref={emailRef} value={email} onChange={() => setEmail(emailRef.current.value)} />
        <input type="text" placeholder="Username" ref={usernameRef} value={username} onChange={() => setUsername(usernameRef.current.value)} />
        <input type="text" placeholder="Password" ref={passwordRef} value={password} onChange={() => setPassword(passwordRef.current.value)} />
        <button type = "submit" className='btn'>Register</button>
    </form>
  )
}

export default Register