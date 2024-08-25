import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Chat.css';

function Chat() {
  const { userId } = useParams();
  const [messages, setMessages] = useState({});
  const [messageText, setMessageText] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/chat/${userId}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
          }
        });
        setMessages(response.data);
      } catch (error) {
        alert('Failed to load messages');
      }
    };

    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/me/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
          }
        });
        setLoggedInUser(response.data);
      } catch (error) {
        alert('Failed to load user data');
      }
    };

    fetchMessages();
    fetchLoggedInUser();

    // Polling to fetch new messages every 3 seconds
    const intervalId = setInterval(fetchMessages, 2000);

    return () => clearInterval(intervalId);
  }, [userId]);

  const sendMessage = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/chat/${userId}/`, {
        content: messageText
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
      });

      setMessages(prevMessages => ({
        ...prevMessages,
        [response.data.id]: response.data
      }));
      setMessageText('');
    } catch (error) {
      alert('Failed to send message');
    }
  };

  return (
    <div className="container chat-container">
      <h2>Chat</h2>
      <div className="messages">
        {Object.values(messages).map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender.id === loggedInUser?.id ? 'sent' : 'received'}`}
          >
            <span className="sender">{message.sender.username}</span>
            <span className="text">{message.content}</span>
          </div>
        ))}
      </div>
      <div className="send-message">
        <input
          type="text"
          placeholder="Type a message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <Link to="/dashboard" className="dashboard-link">Back to Dashboard</Link>
    </div>
  );
}

export default Chat;
