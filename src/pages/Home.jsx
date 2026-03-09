import React from 'react';
import { Link } from 'react-router-dom';
import { FaPills, FaShieldAlt, FaTruck, FaHeadset, FaStar } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <FaPills />,
      title: 'Wide Range of Medicines',
      description: 'Access to thousands of certified medicines and healthcare products'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Certified & Safe',
      description: 'All medicines are certified and tested for quality and safety'
    },
    {
      icon: <FaTruck />,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery right to your doorstep'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Expert pharmacists available round the clock to help you'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Fast delivery and genuine medicines. Highly recommended!'
    },
    {
      name: 'Michael Chen',
      rating: 5,
      comment: 'Easy to use platform with great customer service.'
    },
    {
      name: 'Emily Davis',
      rating: 5,
      comment: 'Best online pharmacy! Always reliable and professional.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Trusted Online <span className="highlight">Pharmacy</span>
          </h1>
          <p className="hero-subtitle">
            Tab4U - Quality medicines delivered to your doorstep with care
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-primary-hero">
              Browse Medicines
            </Link>
            <Link to="/register" className="btn-secondary-hero">
              Sign Up Today
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">
            <FaPills /> 1000+ Medicines
          </div>
          <div className="floating-card card-2">
            <FaTruck /> Fast Delivery
          </div>
          <div className="floating-card card-3">
            <FaShieldAlt /> 100% Certified
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Tab4U?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Popular Categories</h2>
          <div className="categories-grid">
            <Link to="/products?category=Pain Relief" className="category-card">
              <div className="category-icon">💊</div>
              <h3>Pain Relief</h3>
            </Link>
            <Link to="/products?category=Antibiotics" className="category-card">
              <div className="category-icon">💉</div>
              <h3>Antibiotics</h3>
            </Link>
            <Link to="/products?category=Supplements" className="category-card">
              <div className="category-icon">🌿</div>
              <h3>Supplements</h3>
            </Link>
            <Link to="/products?category=Heart Health" className="category-card">
              <div className="category-icon">❤️</div>
              <h3>Heart Health</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="testimonial-comment">"{testimonial.comment}"</p>
                <p className="testimonial-name">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Start Your Health Journey Today</h2>
          <p>Join thousands of satisfied customers who trust Tab4U for their medical needs</p>
          <Link to="/register" className="btn-cta">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

