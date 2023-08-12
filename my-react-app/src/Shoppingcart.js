import React from "react";

const ShoppingCart = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((total, book) => total + book.price, 0);

  return (
    <div className="shopping-cart">
      <h2 className="cart-title">Your Cart</h2>
      <ul className="cart-items">
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <p className="cart-item-title">{item.title}</p>
              <p className="cart-item-price">${item.price}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="total-price">Total: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default ShoppingCart;
