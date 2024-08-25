import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UsersList.css'

function UsersList() {
  const [users, setUsers] = useState([]);
  const [interests, setInterests] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsersAndInterests = async () => {
      try {
        const usersResponse = await axios.get('http://127.0.0.1:8000/api/users/users/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
          }
        });

        setUsers(usersResponse.data.users);
        setLoggedInUser(usersResponse.data.logged_in_user);

        const interestsResponse = await axios.get('http://127.0.0.1:8000/api/interests/accepted/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
          }
        });

        const interestsMap = interestsResponse.data.reduce((acc, interest) => {
          acc[interest.sender.id] = interest;
          acc[interest.recipient.id] = interest;
          return acc;
        }, {});
        setInterests(interestsMap);

      } catch (error) {
        alert('Failed to fetch users or interests');
      }
    };

    fetchUsersAndInterests();

    const intervalId = setInterval(fetchUsersAndInterests, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const sendInterest = async () => {
    if (!selectedUser) {
      alert('No user selected');
      return;
    }

    if (message.length > 500) {
      alert('Message is too long (maximum is 500 characters)');
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/interests/send/${selectedUser}/`, {
        message: message
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
      });

      alert('Interest sent');
      setMessage('');
      setSelectedUser(null);
      // fetchUsersAndInterests();

    } catch (error) {
      alert('Failed to send interest');
    }
  };

  const getStatus = (userId) => {
    const interest = interests[userId];
    if (interest) {
      return interest.is_accepted ? 'Accepted' : 'Rejected';
    }
    return null;
  };

  return (
    <div className="users-list-container">
      <h2>Users List</h2>
      <Link to="/requests" className="view-requests-link">View Requests</Link>
      <ul className="users-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <p className="user-name">{user.username}</p>
            {loggedInUser && user.id !== loggedInUser.id && (
              <>
                {selectedUser === user.id ? (
                  <div className="interaction-box">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength="500"
                      placeholder="Enter your message here (max 500 characters)"
                      className="message-textarea"
                    ></textarea>
                    <button className="send-button" onClick={sendInterest}>Send Request</button>
                    <button className="cancel-button" onClick={() => setSelectedUser(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    {getStatus(user.id) ? (
                      <>
                        <p className="status-text">Status: {getStatus(user.id)}</p>
                        {getStatus(user.id) === 'Accepted' && (
                          <Link className="chat-link" to={`/chat/${interests[user.id].id}`}>Chat</Link>
                        )}
                      </>
                    ) : (
                      <button className="select-user-button" onClick={() => setSelectedUser(user.id)}>Select User</button>
                    )}
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
