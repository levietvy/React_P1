import { useState } from "react";

function BookComponent({ data, key, moveBookToShelf }) {
  const [selectedValue] = useState("");
  const handleMoveToShelf = (event) => {
    // Call the moveBookToShelf function to move the book to the new shelf
    this.props.moveBookToShelf(data, event.target.value);
  };

  return (
    <div className="book" key={key}>
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${data.imageLinks.smallThumbnail}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={selectedValue} onChange={handleMoveToShelf}>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{data.title}</div>
      <div className="book-authors">{data.authors}</div>
    </div>
  );
}

export default BookComponent;
