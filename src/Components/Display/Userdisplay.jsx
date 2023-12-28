// Userdisplay.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Userdisplay.css';

const Userdisplay = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/getbook')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  useEffect(() => {
    const cartBookIds = cart.map(item => item.bookid);
    setCartItems(cartBookIds);
  }, [cart]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData));
  };

  const handleAddToCart = (book) => {
    const existingCartItem = cart.find(item => item.bookid === book.bookid);

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      const updatedCart = [...cart];
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);

      axios.post('http://localhost:8080/cart/update', updatedCart)
        .then(response => console.log('Cart data updated on the server:', response.data))
        .catch(error => console.error('Error updating cart data on the server:', error));
    } else {
      const updatedCart = [...cart, { bookid: book.bookid, name: book.name, description: book.description, quantity: 1 }];
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);

      axios.post('http://localhost:8080/cart/store', updatedCart)
        .then(response => console.log('Cart data stored on the server:', response.data))
        .catch(error => console.error('Error storing cart data on the server:', error));
    }
  };

  const handleRemoveFromCart = (book) => {
    const updatedCart = cart.filter(item => item.bookid !== book.bookid);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);

    axios.post('http://localhost:8080/cart/remove', updatedCart)
      .then(response => console.log('Cart data removed from the server:', response.data))
      .catch(error => console.error('Error removing cart data from the server:', error));
  };

  const handleGoToCart = () => {
    setShowCart(!showCart);
    console.log('Cart Data:', cart);
  };

  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.bookid.toString().includes(searchTerm)
  );

  return (
    <div className="user-display-container">
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

      <div className="books-list">
        <h3>Books List</h3>
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
            {filteredBooks.map(book => (
              <tr key={book.id}>
                <td>{book.bookid}</td>
                <td>{book.name}</td>
                <td>{book.description}</td>
                <td>
                  {book.content ? (
                    <Link to={`/content/${book.bookid}`}><button>Read</button></Link>
                  ) : (
                    <span>No content available</span>
                  )}
                </td>
                <td>
                  {!cartItems.includes(book.bookid) ? (
                    <button onClick={() => handleAddToCart(book)}>Add to Cart</button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cart-container" style={{ display: showCart ? 'block' : 'none' }}>
        <h3>Shopping Cart</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map(book => (
              <tr key={book.bookid}>
                <td>{book.bookid}</td>
                <td>{book.name}</td>
                <td>{book.description}</td>
                <td>
                  {book.content ? (
                    <Link to={`/content/${book.bookid}`}><button>Read</button></Link>
                  ) : (
                    <span>No content available</span>
                  )}
                </td>
                <td>
                  {!cartItems.includes(book.bookid) ? (
                    <button onClick={() => handleAddToCart(book)}>Add to Cart</button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to="/cart">
        <button>Go to Cart</button>
      </Link>
    </div>
  );
};

export default Userdisplay;
