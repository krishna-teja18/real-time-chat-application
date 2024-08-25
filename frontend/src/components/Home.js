import React from "react";
import { Link } from "react-router-dom";
import './Home.css'

function Home() {
  return (
    <div className="container">
      <h2>Welcome to Chatting App :) </h2>
      <p>
        Welcome to ConnectChat, the ultimate platform designed to bring people
        closer together through seamless communication and meaningful
        interactions. Our mission is to revolutionize the way you connect with
        others, providing a dynamic and intuitive space where you can engage in
        real-time conversations, share your thoughts, and build lasting
        relationships. Whether you are here to catch up with friends, collaborate
        on projects, or explore new connections, ConnectChat offers a
        user-friendly experience tailored to your needs. With features like
        instant messaging, user-friendly request management, and a responsive
        design, we ensure that you stay connected and engaged no matter where
        you are. Dive into our vibrant community, and let's start the
        conversation!
      </p>
      <div className="button-container">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
