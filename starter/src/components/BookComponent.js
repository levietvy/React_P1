import { useState } from "react";

function BookComponent({ data, moveBookToShelf }) {
  const [selectedValue] = useState(data.shelf);
  const handleMoveToShelf = (event) => {
    moveBookToShelf(data, event.target.value);
  };

  return (
    <div className="book" key={data.id}>
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              data.imageLinks &&
              data.imageLinks.hasOwnProperty("smallThumbnail")
                ? `url("${data.imageLinks.smallThumbnail}")`
                : "",
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={selectedValue} onChange={handleMoveToShelf}>
            <option value="default" disabled>
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
      <div className="book-authors">
        {data.hasOwnProperty("authors") ? data.authors : ""}
      </div>
    </div>
  );
}

export default BookComponent;
