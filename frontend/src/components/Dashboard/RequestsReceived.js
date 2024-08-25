import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RequestsReceived.css'

function RequestsReceived() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/interests/list/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
          }
        });
        const { received_interests } = response.data;
        setRequests(received_interests);
      } catch (error) {
        alert('Failed to fetch requests');
      }
    };

    fetchRequests();
  }, []);

  const respondToRequest = async (interestId, isAccepted) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/interests/respond/${interestId}/`, {
        is_accepted: isAccepted
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
      });
      alert('Response sent');
      setRequests(requests.filter(request => request.id !== interestId));
    } catch (error) {
      alert('Failed to respond to request');
    }
  };

  return (
    <div className="received-requests-container">
      <h2>Received Requests</h2>
      <ul className="requests-list">
        {requests.map(request => (
          <li key={request.id} className="request-item">
            <p className="request-info">From: {request.sender_username}</p>
            <p className="request-info">Message: {request.message}</p>
            <div className="button-group">
              <button className="accept-button" onClick={() => respondToRequest(request.id, true)}>Accept</button>
              <button className="reject-button" onClick={() => respondToRequest(request.id, false)}>Reject</button>
            </div>
          </li>
        ))}
      </ul>
      <Link className="back-link" to="/dashboard">Back to Dashboard</Link>
    </div>
  );
}

export default RequestsReceived;
