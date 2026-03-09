import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMedicine } from '../context/MedicineContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaArrowLeft, FaPrescription, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMedicineById } = useMedicine();
  const { addToCart } = useCart();
  const medicine = getMedicineById(id);

  if (!medicine) {
    return (
      <div className="not-found">
        <h2>Medicine Not Found</h2>
        <Link to="/products" className="btn-back">Go Back to Products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(medicine);
  };

  return (
    <div className="product-details-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <div className="product-details-grid">
          <div className="product-image-section">
            <div className="main-image">
              <img src={medicine.image} alt={medicine.name} />
              {medicine.prescription && (
                <span className="prescription-badge">
                  <FaPrescription /> Prescription Required
                </span>
              )}
            </div>
          </div>

          <div className="product-info-section">
            <span className="product-category">{medicine.category}</span>
            <h1>{medicine.name}</h1>
            <p className="product-description">{medicine.description}</p>

            <div className="product-price-section">
              <span className="price">₹{medicine.price}</span>
              <span className={`stock-status ${medicine.stock > 50 ? 'in-stock' : 'low-stock'}`}>
                {medicine.stock > 0 ? (
                  <>
                    <FaCheck /> {medicine.stock} in stock
                  </>
                ) : (
                  <>
                    <FaExclamationTriangle /> Out of stock
                  </>
                )}
              </span>
            </div>

            <div className="product-actions">
              <button
                className="btn-add-to-cart"
                onClick={handleAddToCart}
                disabled={medicine.stock === 0}
              >
                <FaShoppingCart /> Add to Cart
              </button>
              <Link to="/cart" className="btn-view-cart">
                View Cart
              </Link>
            </div>

            <div className="manufacturer-info">
              <strong>Manufacturer:</strong> {medicine.manufacturer}
            </div>
          </div>
        </div>

        <div className="product-details-tabs">
          <div className="tab-content">
            <div className="detail-section">
              <h3>Uses</h3>
              <p>{medicine.uses}</p>
            </div>

            <div className="detail-section">
              <h3>Dosage</h3>
              <p>{medicine.dosage}</p>
            </div>

            <div className="detail-section">
              <h3>Side Effects</h3>
              <p>{medicine.sideEffects}</p>
            </div>

            <div className="detail-section warning-section">
              <h3><FaExclamationTriangle /> Important Information</h3>
              <ul>
                <li>Always read the label before use</li>
                <li>Do not exceed the recommended dose</li>
                <li>Keep out of reach of children</li>
                {medicine.prescription && (
                  <li>This medicine requires a valid prescription from a licensed doctor</li>
                )}
                <li>Consult your doctor if symptoms persist</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
