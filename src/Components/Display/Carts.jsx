// Carts.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cart.css'; // You can create a corresponding CSS file

const Carts = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData));
  };

  const handleRemoveFromCart = (book) => {
    const updatedCart = cart.filter(item => item.bookid !== book.bookid);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);

    axios.post('http://localhost:8080/cart/remove', updatedCart)
      .then(response => {
        console.log('Cart data removed from the server:', response.data);
      })
      .catch(error => {
        console.error('Error removing cart data from the server:', error);
      });
  };

  const filteredCart = cart.filter(cartItem =>
    cartItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cartItem.bookid.toString().includes(searchTerm)
  );

  return (
    <div className="carts-container">
      <h3>Shopping Cart</h3>

      <div>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCart.map(cartItem => (
            <tr key={cartItem.bookid}>
              <td>{cartItem.bookid}</td>
              <td>{cartItem.name}</td>
              <td>{cartItem.description}</td>
              <td>
                <Link to={`/content/${cartItem.bookid}`}>
                  <button>Read</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/userdisplay">
        <button>Go Back to Userdisplay</button>
      </Link>
    </div>
  );
};

export default Carts;
