import React from "react";

const BookList = ({ books, addToCart }) => {
  return (
    <>
      <div className="book-list">
        {books.map((book) => (
          <div className="book" key={book.title}>
            <img src={book.image} alt={book.title} className="book-image" />
            <h3>{book.title}</h3>
            <p>Price: ${book.price}</p>
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(book)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookList;
