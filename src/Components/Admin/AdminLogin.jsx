import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import './AdminLogin.css'; 

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminCredentials, setAdminCredentials] = useState({
    name: '',
    position: '',
    passwd: '',
  });

  const handleInputChange = (e) => {
    setAdminCredentials({ ...adminCredentials, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8080/admin', adminCredentials);
      console.log(response.data); // Handle the response as needed
  
      if (response.data === 'Admin authentication successful') {
        navigate('/admindisplay');
      }
    } catch (error) {
      console.error('Admin authentication failed', error);
      // Handle the error or display a notification
    }
  };
  

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleAdminLogin}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={handleInputChange} value={adminCredentials.name} />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input type="text" id="position" name="position" onChange={handleInputChange} value={adminCredentials.position} />
        </div>
        <div>
          <label htmlFor="passwd">Password:</label>
          <input type="password" id="passwd" name="passwd" onChange={handleInputChange} value={adminCredentials.passwd} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
