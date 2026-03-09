import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <FaShoppingBag className="empty-icon" />
        <h2>Your Cart is Empty</h2>
        <p>Add some medicines to your cart to get started</p>
        <Link to="/products" className="btn-shop">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Continue Shopping
          </button>
          <h1>Shopping Cart</h1>
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-manufacturer">{item.manufacturer}</p>
                  {item.prescription && (
                    <span className="prescription-tag">Prescription Required</span>
                  )}
                </div>
                <div className="item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
                <div className="item-price">
                  <span className="price">₹{(item.price * item.quantity)}</span>
                  <span className="unit-price">₹{item.price} each</span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove from cart"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{getCartTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>₹{(getCartTotal() * 0.1).toFixed(0)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{(getCartTotal() * 1.1).toFixed(0)}</span>
            </div>
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

