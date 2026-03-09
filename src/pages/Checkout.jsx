import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaMapMarkerAlt, FaPhone, FaCreditCard, FaLock } from 'react-icons/fa';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, placeOrder } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder({
      customerName: formData.fullName,
      customerEmail: formData.email,
      paymentMethod: formData.paymentMethod
    });
    setOrderPlaced(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-animation">
          <div className="checkmark-circle">
            <div className="checkmark"></div>
          </div>
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order will be delivered soon.</p>
        <p>Redirecting to home...</p>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <div className="checkout-grid">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h2><FaUser /> Personal Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label><FaPhone /> Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h2><FaMapMarkerAlt /> Delivery Address</h2>
                <div className="form-group">
                  <label>Street Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2><FaCreditCard /> Payment Method</h2>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="card-details">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength="3"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" className="place-order-btn">
                <FaLock /> Place Order
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span className="item-total">
                    ₹{(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="summary-calculations">
              <div className="calc-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="calc-row">
                <span>Shipping</span>
                <span className="free">Free</span>
              </div>
              <div className="calc-row">
                <span>Tax (10%)</span>
                <span>₹{tax.toFixed(0)}</span>
              </div>
              <div className="calc-divider"></div>
              <div className="calc-row total">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
