import React, { useState } from "react";
import BookList from "./BookList";
import ShoppingCart from "./Shoppingcart";
import axios from 'axios';
import "./App.css";

// GET BOOK LIST
// http://localhost:3000/api/books

//CREATE A NEW BOOK
//http://localhost:3000/books/create


//UPDATED BOOK
//http://localhost:3000/api/book/update/:id

// DELETED BOOK
//http://localhost:3000/api/book/delete/:id




function book() {
  const [data, setData] = useState([]); // State to store fetched data

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/books');
      setData(response.data); // Update the state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  return data
}

//export default DataFetchingComponent;


const App = () => {
  const [books] = useState([
    { title: "Book 1", price: 10, image: "/images/book1.jpg" },
    { title: "Book 2", price: 15, image: "/images/book2.jpg" },
    { title: "Book 3", price: 20, image: "/images/book3.jpg" },
    { title: "Book 4", price: 10, image: "/images/book4.jpg" },
    { title: "Book 5", price: 15, image: "/images/book5.jpg" },
    { title: "Book 6", price: 20, image: "/images/book6.jpg" },
    { title: "Book 7", price: 10, image: "/images/book7.jpg" },
    { title: "Book 8", price: 15, image: "/images/book8.jpg" },
    { title: "Book 9", price: 20, image: "/images/book9.jpg" },
  ]);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems([...cartItems, book]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bookstore</h1>
      </header>
      <main className="app-content">
        <BookList books={books} addToCart={addToCart} />
        <ShoppingCart cartItems={cartItems} />
      </main>
    </div>
  );
};

export default App;
