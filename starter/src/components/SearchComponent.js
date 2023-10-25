import React, { useState } from "react";
import { search } from "../BooksAPI.js";
import BookComponent from "./BookComponent.js";

function SearchComponent({ onDataChange }) {
  const [books, setBooks] = useState([]);
  const onSearchBook = async (e) => {
    try {
      setBooks([]);
      console.log(e);
      const maxResults = 5; // Set your desired maxResults value
      const results = await search(e, maxResults);
      setBooks(results);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={onDataChange}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => onSearchBook(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {books.length < 5 ? (
          <div>No result</div>
        ) : (
          <ol className="books-grid">
            {books.map((book) => (
              <BookComponent key={book.id} data={book} />
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default SearchComponent;
