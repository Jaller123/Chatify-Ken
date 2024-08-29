import React from 'react'
import { useEffect, useState } from 'react'
import './CSS/Chat.css'


const Chat = () => {

  const token = localStorage.getItem('userToken')
  const [messages, setMessages] = useState([])
  const [postMessage, setPostMessage] = useState("")
  const [decodedJwt, setDecodedJwt] = useState()



  const fakeChat = [{
      text: "Tja tja, hur mår du?",
      avatar: "https://i.pravatar.cc/100?img=14",
      username: "Johnny",
      conversationId: null,
      isBot: true
    },
    {
      text: "Hallå!! Svara då!!",
      avatar: "https://i.pravatar.cc/100?img=14",
      username: "Johnny",
      conversationId: null,
      isBot: true
    },
    {
      text: "Sover du eller?! 😴",
      avatar: "https://i.pravatar.cc/100?img=14",
      username: "Johnny",
      conversationId: null,
      isBot: true
    }];

  useEffect(() => {
    if (!token) {
      console.log("The JWT token is not found")
    } else {
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
        .then(data => {
          setMessages([...data, ...fakeChat])
          console.log(token)
          const payload = JSON.parse(atob(token.split('.')[1]));
          setDecodedJwt(payload)
        })
    }
  }, [token])

  const handleChat = () => {
    if (!postMessage.trim()) {
      return;
    }

    const newMessage = {
      text: postMessage,
      conversationId: null,
    }

    fetch('https://chatify-api.up.railway.app/messages',
      {
        method: 'POST',
        headers:
        {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage)
      })

      .then(res => res.json())
      .then(data => {
        setMessages([...messages, data.latestMessage])
        setPostMessage("")
      })
  }


  const handleDelete = (msgID) =>
    {
      fetch(`https://chatify-api.up.railway.app/messages/${msgID}`,
         {
           method: 'DELETE',
           headers:
           {
             'Authorization': `Bearer ${token}`,
             'Content-Type': 'application/json',
           },
         })
   
         .then(res => res.json())
         .then(data => {
           setMessages(messages.filter((msg) => msg.id !== msgID));
           // Filter function removes message if msg.id matches msgID
         })
     }




  return (
    <div>
      <h2>Chat Messages</h2>
      {decodedJwt && (
        <h3>Welcome, {decodedJwt.user}! </h3>
      )}
      <ul>
        {messages.map((msg, index) => (
          <>
            {msg.isBot ? (
              <li  className="bot-chat" key={index}>
                <div>
                  {msg.text}
                </div>
              </li>
            ) : (
              <li className="user-chat" key={index}>
                <div>
                  {msg.text}
                  <button onClick={() => handleDelete(msg.id)} className='btn'>Delete</button>
                </div>
              </li>
            )}
          </>
        ))}
      </ul>
      <div className='input-chat'>
        <input type="text" placeholder="Chat here" onChange={(e) => setPostMessage(e.target.value)} />
        <button onClick={handleChat} className='btn'>Send</button>
      </div>
    </div>
  )
}

export default Chat