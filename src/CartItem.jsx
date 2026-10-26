import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const itemTotal = (item) => item.cost * item.quantity;
  const cartTotal = items.reduce((sum, item) => sum + itemTotal(item), 0);

  const increment = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const decrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Checkout: Coming Soon!');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3 className="cart-total">Total Cart Amount: ${cartTotal}</h3>

      {items.length === 0 && <p>Your cart is empty.</p>}

      {items.map((item) => (
        <div className="cart-item" key={item.name}>
          <img className="cart-item-image" src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">Unit price: ${item.cost}</div>
            <div className="cart-item-quantity">
              <button className="qty-button" onClick={() => decrement(item)}>-</button>
              <span className="qty-value">{item.quantity}</span>
              <button className="qty-button" onClick={() => increment(item)}>+</button>
            </div>
            <div className="cart-item-total">Subtotal: ${itemTotal(item)}</div>
            <button className="delete-button" onClick={() => dispatch(removeItem(item.name))}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="cart-actions">
        <button className="continue-button" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
