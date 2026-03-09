import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMedicine } from '../context/MedicineContext';
import { useCart } from '../context/CartContext';
import { FaSearch, FaFilter, FaShoppingCart } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const { medicines, categories, getMedicinesByCategory, searchMedicines } = useMedicine();
  const { addToCart } = useCart();
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);

  const applyFilters = React.useCallback(() => {
    let result = medicines;

    // Category filter
    if (selectedCategory !== 'All') {
      result = getMedicinesByCategory(selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(med =>
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    result = result.filter(med => med.price >= priceRange[0] && med.price <= priceRange[1]);

    // Prescription filter
    if (showPrescriptionOnly) {
      result = result.filter(med => med.prescription);
    }

    // Sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredMedicines(result);
  }, [selectedCategory, searchQuery, sortBy, priceRange, showPrescriptionOnly, medicines, getMedicinesByCategory]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleAddToCart = (medicine) => {
    addToCart(medicine);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Medicines</h1>
        <p>Find the right medication for your needs</p>
      </div>

      <div className="products-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3><FaFilter /> Filters</h3>
          </div>

          <div className="filter-section">
            <h4>Categories</h4>
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              />
              <span>₹{priceRange[0]} - ₹{priceRange[1]}</span>
            </div>
          </div>

          <div className="filter-section">
            <h4>Sort By</h4>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="filter-section">
            <label className="checkbox-filter">
              <input
                type="checkbox"
                checked={showPrescriptionOnly}
                onChange={(e) => setShowPrescriptionOnly(e.target.checked)}
              />
              Prescription Only
            </label>
          </div>

          <button className="clear-filters-btn" onClick={() => {
            setSelectedCategory('All');
            setSearchQuery('');
            setSortBy('name');
            setPriceRange([0, 100]);
            setShowPrescriptionOnly(false);
          }}>
            Clear All Filters
          </button>
        </aside>

        {/* Products Grid */}
        <div className="products-content">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="products-info">
            <p>{filteredMedicines.length} products found</p>
          </div>

          {filteredMedicines.length === 0 ? (
            <div className="no-products">
              <p>No medicines found matching your criteria</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredMedicines.map((medicine) => (
                <div key={medicine.id} className="product-card">
                  {medicine.prescription && (
                    <span className="prescription-badge">Prescription Required</span>
                  )}
                  <div className="product-image">
                    <img src={medicine.image} alt={medicine.name} />
                  </div>
                  <div className="product-info">
                    <span className="product-category">{medicine.category}</span>
                    <h3>{medicine.name}</h3>
                    <p className="product-description">{medicine.description}</p>
                    <div className="product-meta">
                      <span className="manufacturer">{medicine.manufacturer}</span>
                      <span className={`stock ${medicine.stock > 50 ? 'in-stock' : 'low-stock'}`}>
                        {medicine.stock > 0 ? `${medicine.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    <div className="product-footer">
                      <span className="product-price">₹{medicine.price}</span>
                      <div className="product-actions">
                        <Link to={`/products/${medicine.id}`} className="btn-view">
                          View Details
                        </Link>
                        <button
                          className="btn-add-cart"
                          onClick={() => handleAddToCart(medicine)}
                          disabled={medicine.stock === 0}
                        >
                          <FaShoppingCart /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
