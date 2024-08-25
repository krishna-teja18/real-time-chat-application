import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UsersList from './components/Dashboard/UsersList';
import Chat from './components/Dashboard/Chat';
import RequestsReceived from './components/Dashboard/RequestsReceived';
import Header from './components/Layout/Header';
// import Footer from './components/Layout/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UsersList />} />
          <Route path="/chat/:userId" element={<Chat />} />
          <Route path="/requests" element={<RequestsReceived />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
