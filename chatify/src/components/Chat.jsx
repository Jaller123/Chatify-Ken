import React from 'react'
import { useEffect, useState, useRef } from 'react'

const Chat = () => {

  const [messages, setMessages] = useState([])
  const token = localStorage.getItem('userToken')

  useEffect(() => {
    if (!token)
    {
      console.log("The JWT token is not found")
    }
    

 

  fetch('https://chatify-api.up.railway.app/messages',
    {
      method: 'GET',
      headers:  
      {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }, 
    })

    .then(res => res.json())
    .then(data =>
    {
     setMessages(data) 
     console.log(token)
    })
  }, [token])

  return (
    <div>
      <h2>Chat Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Chat