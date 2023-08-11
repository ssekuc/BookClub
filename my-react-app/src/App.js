import React, { useState } from "react";
import "./App.css";
import { BookSearch } from "./BookSearch";
import { BookArray } from "./books";

function App() {
  const [bookList, setBookList] = useState(BookArray);

  return (
    <div className="bookCards">
      {bookList.map((book) => (
        <BookSearch
          key={book.id}
          author={book.author}
          imageLink={book.imageLink}
          title={book.title}
        />
      ))}
    </div>
  );
}

export default App;
