// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Home/Homepage';
import AdminLogin from './Components/Admin/AdminLogin';
import Admindisplay from './Components/Display/Admindisplay';
import UserLogin from './Components/User/UserLogin';
import Userdisplay from './Components/Display/Userdisplay';

import Content from './Components/Display/Content';  // Import the Content component
import Carts from './Components/Display/Carts';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindisplay" element={<Admindisplay />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userdisplay" element={<Userdisplay />} />
        <Route path="/cart" element={<Carts />} />
        <Route path="/content/:bookid" element={<Content />} /> {/* New route for Content component */}
      </Routes>
    </Router>
  );
}

export default App;
