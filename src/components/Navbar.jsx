import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaPills } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          <FaPills className="logo-icon" />
          <span>Tab4U</span>
        </Link>

        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link to="/products" className="nav-link" onClick={closeMobileMenu}>
            Products
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="nav-link" onClick={closeMobileMenu}>
              Dashboard
            </Link>
          )}
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="cart-button" onClick={closeMobileMenu}>
            <FaShoppingCart />
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="user-menu">
              <button className="user-button">
                <FaUser />
                <span>{user?.name}</span>
              </button>
              <div className="dropdown-menu">
                <Link to="/dashboard" onClick={closeMobileMenu}>My Account</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login" onClick={closeMobileMenu}>
                Login
              </Link>
              <Link to="/register" className="btn-register" onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </div>
          )}

          <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
