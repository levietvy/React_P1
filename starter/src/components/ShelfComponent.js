import BookComponent from "./BookComponent";

const ShelfComponent = ({ shelf, moveBookToShelf }) => {
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li></li>
            <li>
              {shelf.books.map((book, index) => (
                <BookComponent
                  data={book}
                  key={book.id}
                  index={index}
                  moveBookToShelf={moveBookToShelf}
                />
              ))}
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ShelfComponent;
