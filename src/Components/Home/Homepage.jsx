// src/components/HomePage.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './HomeStyles.css'; 



const HomePage = () => {
  return (
    <div>
      <h1>Welcome to HOME PAGE</h1>
      <Link to="/adminlogin">
        <FontAwesomeIcon icon={faUserGraduate} className="icon" />
        <span>ADMIN</span>
      </Link>
      <Link to="/userlogin">
        <FontAwesomeIcon icon={faUsers} className="icon" />
        <span>USER</span>
      </Link>
    </div>
  );
};

export default HomePage;