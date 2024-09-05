import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Register.css'

const Register = () => 
{
  

    const [csrfToken, setCrsfToken] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccesMessage] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [avatarUrl, setAvatarUrl] = useState();

    const emailRef = useRef()
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

    const handleRegister = (e) =>
    {
      e.preventDefault();

        fetch('https://chatify-api.up.railway.app/auth/register',
        {
          method: 'POST',
          headers:  {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
            avatar: avatarUrl,
            csrfToken: csrfToken
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
            setErrorMessage("")
            setSuccesMessage("User succesfully created!") 
            setTimeout(() => 
            {
              navigate('/login') 
            }, 1000)
            
          }
        })
      
    }

    const getRandomAvatar = () => {
      const randomId = Math.floor(Math.random() * 70) + 1;
      return `https://i.pravatar.cc/200?img=${randomId}`
    };
  const handleAvatar = () => {
      setAvatarUrl(getRandomAvatar());
    };

    const nextLogin = () =>
      {
        navigate('/login') 
      }


      return (
        <div className="login-box">
          <form onSubmit={handleRegister}>
            <div className="user-box">
              <input
                type="text"
                name="email"
                ref={emailRef}
                value={email}
                onChange={() => setEmail(emailRef.current.value)}
                required
              />
              <label>Email</label>
            </div>
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
            <div className="btn-box">
              <button type="submit" className="btn">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Register
              </button>
              <button onClick={nextLogin} type="button" className="btn">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Already have an account?
              </button>
            </div>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className='avat'>
              <h2>Choose an Avatar</h2>
              <img src={avatarUrl} />
              <button type="button" className='r-btn' onClick={handleAvatar}>
                Choose a picture
              </button>
            </div>
          </form>
        </div>
      );
    };

export default Register