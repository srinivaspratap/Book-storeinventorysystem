// Content.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Content.css';
const Content = () => {
  const { bookid } = useParams();
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    // Fetch content for the specified bookid
    axios.get(`http://localhost:8080/getcontent/${bookid}`)
      .then(response => {
        const bookContentList = response.data; // Array of strings
        console.log('Fetched content:', bookContentList);
        setContentList(bookContentList);
      })
      .catch(error => console.error('Error fetching content:', error));
  }, [bookid]);

  console.log('Content List:', contentList);

  return (
    <div className="style">
      <h2>Book Content</h2>
      {contentList.map((content, index) => (
        <p key={index}>{content}</p>
      ))}
    </div>
  );
};

export default Content;
