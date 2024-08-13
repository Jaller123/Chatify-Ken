import React from 'react'
import { useEffect, useState, useRef } from 'react';

const Register = () => 
{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const usernameRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        fetch('https://chatify-api.up.railway.app/csrf', {
          method: 'PATCH',
        })
          .then(res => res.json())
          .then(data => console.log(data.csrfToken))
      }, []);

    const handleRegister = () =>
    {
        
    }


  return (
    <form className="form">
        <h2>Register</h2>
        <input type="text" placeholder="Username" ref={usernameRef} value={username} onChange={() => setUsername(usernameRef.current.value)} />
        <input type="text" placeholder="Password" ref={passwordRef} value={password} onChange={() => setPassword(passwordRef.current.value)} />
        <button onClick = {handleRegister} className='btn'>Register</button>
    </form>
  )
}

export default Register