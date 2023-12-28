import React, { useState } from 'react';
import axios from 'axios';
import './UserLogin.css';
import { useNavigate } from 'react-router-dom';


const UserLogin = () => {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    passwd: '',
  });

  const handleInputChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user', userCredentials);
      console.log(response.data); // Handle the response as needed

      if (response.data === 'User authentication successful') {
        navigate('/userdisplay');
      }
    } catch (error) {
      console.error('User authentication failed', error);
      // Handle the error or display a notification
    }
  };

  return (
    <div className="user-login-container">
      <h2>User Login</h2>
      <form onSubmit={handleUserLogin}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={handleInputChange} value={userCredentials.name} />
        </div>
        <div>
          <label htmlFor="passwd">Password:</label>
          <input type="password" id="passwd" name="passwd" onChange={handleInputChange} value={userCredentials.passwd} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
