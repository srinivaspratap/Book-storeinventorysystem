import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './Admindisplay.css';

const Admindisplay = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [updateBook, setUpdateBook] = useState({
    id: 0,
    bookid: 0,
    name: '',
    description: '',
    content: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({
    bookid: 0,
    name: '',
    description: '',
    content: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, [searchQuery]);

  const fetchBooks = () => {
    axios.get('http://localhost:8080/getbooks')
      .then(response => {
        const allBooks = response.data;
        setBooks(allBooks);
        const filtered = allBooks.filter(book =>
          book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.description.toLowerCase().includes(searchQuery.toLowerCase())||
          String(book.bookid).includes(searchQuery)
        );
        setFilteredBooks(filtered);
      })
      .catch(error => console.error('Error fetching books:', error));
  };

  const handleUpdate = (id, bookid, name, description, content) => {
    setUpdateBook({
      id,
      bookid,
      name,
      description,
      content,
    });
  };

  const handleUpdateSubmit = () => {
    axios.put(`http://localhost:8080/updatebook/${updateBook.id}`, updateBook)
      .then(() => {
        console.log('Updated the book');
        fetchBooks();
        setUpdateBook({
          id: 0,
          bookid: 0,
          name: '',
          description: '',
          content: '',
        });
      })
      .catch(error => console.error('Error updating the book:', error));
  };

  const confirmDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this book?');
    if (isConfirmed) {
      handleDelete(id);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/deletebook/${id}`)
      .then(() => {
        console.log('Deleted the book');
        fetchBooks();
      })
      .catch(error => console.error('Error deleting the book:', error));
  };

  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleAddBook = () => {
    axios.post('http://localhost:8080/addbook', newBook)
      .then(() => {
        console.log('Added a new book');
        fetchBooks();
        setNewBook({
          bookid: 0,
          name: '',
          description: '',
          content: '',
        });
        setShowAddForm(false);
        navigate('/admindisplay');
      })
      .catch(error => console.error('Error adding a new book:', error));
  };

  const handleCancelSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="admin-display-container">
      <h2>Book List</h2>
      <div>
        <label>Search:</label>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={fetchBooks}>Search</button>
        <button onClick={handleCancelSearch}>Clear Search</button>
      </div>
      <button onClick={handleAdd}>Add</button>

      {showAddForm && (
        <div>
          <h2>Add New Book</h2>
          <label>Book ID:</label>
          <input type="text" value={newBook.bookid} onChange={(e) => setNewBook({ ...newBook, bookid: e.target.value })} />
          <label>Name:</label>
          <input type="text" value={newBook.name} onChange={(e) => setNewBook({ ...newBook, name: e.target.value })} />
          <label>Description:</label>
          <input type="text" value={newBook.description} onChange={(e) => setNewBook({ ...newBook, description: e.target.value })} />
          <label>Content:</label>
          <textarea value={newBook.content} onChange={(e) => setNewBook({ ...newBook, content: e.target.value })} />
          <button onClick={handleAddBook}>Add Book</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>BOOK ID</th>
            <th>BOOK TITLE</th>
            <th>BOOK DESCRIPTION</th>
            <th>BOOK CONTENT</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
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
                <button onClick={() => handleUpdate(book.id, book.bookid, book.name, book.description, book.content)}>Update</button>
                <button onClick={() => confirmDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {updateBook.id !== 0 && (
        <div>
          <h2>Update Book</h2>
          <label>Book ID:</label>
          <input type="text" value={updateBook.id} readOnly />
          <label>Name:</label>
          <input type="text" value={updateBook.name} onChange={(e) => setUpdateBook({ ...updateBook, name: e.target.value })} />
          <label>Description:</label>
          <input type="text" value={updateBook.description} onChange={(e) => setUpdateBook({ ...updateBook, description: e.target.value })} />
          <label>Content:</label>
          <textarea value={updateBook.content} onChange={(e) => setUpdateBook({ ...updateBook, content: e.target.value })} />
          <button onClick={handleUpdateSubmit}>Update Book</button>
        </div>
      )}
    </div>
  );
};

export default Admindisplay;
