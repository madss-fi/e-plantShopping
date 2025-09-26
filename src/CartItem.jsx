import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // 🔹 Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((acc, item) => {
      const price = parseFloat(item.cost.replace('$', ''));
      return acc + price * item.quantity;
    }, 0).toFixed(2);
  };

  // 🔹 Increment item quantity (adds new item if not exists)
  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  // 🔹 Decrement item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name })); // remove if quantity reaches 0
    }
  };

  // 🔹 Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // 🔹 Calculate total cost for one item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace('$', ''));
    return (price * item.quantity).toFixed(2);
  };

  // 🔹 Continue shopping handler
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // 🔹 Checkout placeholder
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Checkout functionality coming soon!');
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.map(item => (
        <div className="cart-item" key={item.name}>
          <img className="cart-item-image" src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">{item.cost}</div>
            <div className="cart-item-quantity">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <div className="cart-item-total">
              Subtotal: ${calculateTotalCost(item)}
            </div>
            <button onClick={() => handleRemove(item)}>Delete</button>
          </div>
        </div>
      ))}

      <div className="continue_shopping_btn">
        <button onClick={handleContinueShopping}>Continue Shopping</button>
        <button onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
