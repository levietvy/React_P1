import React, { useState } from "react";
import { search } from "../BooksAPI.js";
import BookComponent from "./BookComponent.js";
import { Link } from "react-router-dom";

function SearchComponent({ onDataChange, moveBookToShelf }) {
  const [books, setBooks] = useState([]);
  const [length, setLength] = useState(0);
  const onSearchBook = async (query) => {
    if (query === "") {
      setLength(0);
      setBooks([]);
    } else {
      try {
        setBooks([]);
        const results = await search(query, 0);
        if (!results.hasOwnProperty("error")) {
          setBooks(results);
          setLength(results.length);
        }
      } catch (error) {
        console.error("Error searching:", error);
      }
    }
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Back to Main Page
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => onSearchBook(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {length === 0 ? (
          <div>No result</div>
        ) : (
          <ol className="books-grid">
            {books.map((book) => (
              <BookComponent
                key={book.id}
                data={book}
                moveBookToShelf={moveBookToShelf}
              />
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default SearchComponent;
