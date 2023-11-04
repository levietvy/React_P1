import "./App.css";
import { useState, useEffect } from "react";
import { getAll } from "./BooksAPI";
import SearchComponent from "./components/SearchComponent";
import ShelfComponent from "./components/ShelfComponent";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

function App() {
  const [shelfs, setShelfs] = useState([
    { name: "read", books: [] },
    { name: "wantToRead", books: [] },
    { name: "currentlyReading", books: [] },
  ]);

  const navigate = useNavigate();
  const handleShowSearch = () => {
    navigate("/search");
  };

  const moveBookToShelf = (book, targetShelfName) => {
    const sourceShelfName = book.shelf;

    if (sourceShelfName === undefined) {
      const updatedTargetShelf = shelfs.find(
        (shelf) => shelf.name === targetShelfName
      );
      book.shelf = updatedTargetShelf.name;
      updatedTargetShelf.books.push(book);

      setShelfs([...shelfs]);
      return;
    }

    if (sourceShelfName !== targetShelfName) {
      const updatedSourceShelf = shelfs.find(
        (shelf) => shelf.name === sourceShelfName
      );
      updatedSourceShelf.books = updatedSourceShelf.books.filter(
        (tempBook) => tempBook.id !== book.id
      );

      const updatedTargetShelf = shelfs.find(
        (shelf) => shelf.name === targetShelfName
      );
      book.shelf = updatedTargetShelf.name;
      updatedTargetShelf.books.push(book);

      setShelfs([...shelfs]);
    }
  };

  useEffect(() => {
    async function getAllBooks() {
      try {
        const listBook = await getAll();

        const tempShelfs = [
          { name: "read", books: [] },
          { name: "wantToRead", books: [] },
          { name: "currentlyReading", books: [] },
        ];
        for (let book of listBook) {
          if (book.shelf === "currentlyReading") {
            tempShelfs[2].books.push(book);
          } else if (book.shelf === "wantToRead") {
            tempShelfs[1].books.push(book);
          } else {
            tempShelfs[0].books.push(book);
          }
        }
        setShelfs(tempShelfs);
      } catch (error) {
        console.log(error.stack);
      }
    }
    getAllBooks();
  }, []);

  return (
    <Routes>
      <Route
        path="/search"
        element={
          <SearchComponent
            onDataChange={handleShowSearch}
            moveBookToShelf={moveBookToShelf}
          />
        }
      />
      <Route
        path="/"
        element={
          <div className="app">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {shelfs.map((shelf, index) => (
                    <ShelfComponent
                      shelf={shelf}
                      key={index}
                      moveBookToShelf={moveBookToShelf}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <a onClick={handleShowSearch}>Add a book</a>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
