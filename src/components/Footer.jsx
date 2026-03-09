import React from 'react';
import { Link } from 'react-router-dom';
import { FaPills, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-brand">
            <FaPills className="footer-logo" />
            <h3>Tab4U</h3>
          </div>
          <p>Your trusted online pharmacy delivering quality medicines right to your doorstep.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/sumanth-pentakota-740030269/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/products?category=Pain Relief">Pain Relief</Link></li>
            <li><Link to="/products?category=Antibiotics">Antibiotics</Link></li>
            <li><Link to="/products?category=Supplements">Supplements</Link></li>
            <li><Link to="/products?category=Heart Health">Heart Health</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li>
              <FaMapMarkerAlt />
              <span>Electronics City, Bangalore</span>
            </li>
            <li>
              <FaPhone />
              <span>+91 81799 22379</span>
            </li>
            <li>
              <FaEnvelope />
              <span>pentakotasumanth12@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Tab4U. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
