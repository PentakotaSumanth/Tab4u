import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMedicine } from '../context/MedicineContext';
import { useCart } from '../context/CartContext';
import { FaPlus, FaEdit, FaTrash, FaPills, FaShoppingCart, FaDollarSign, FaChartLine } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const { medicines, addMedicine, updateMedicine, deleteMedicine, categories } = useMedicine();
  const { orders } = useCart();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Pain Relief',
    price: '',
    description: '',
    prescription: false,
    stock: '',
    manufacturer: '',
    uses: '',
    dosage: '',
    sideEffects: ''
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const medicineData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(formData.name)
    };

    if (editingMedicine) {
      updateMedicine(editingMedicine.id, medicineData);
    } else {
      addMedicine(medicineData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Pain Relief',
      price: '',
      description: '',
      prescription: false,
      stock: '',
      manufacturer: '',
      uses: '',
      dosage: '',
      sideEffects: ''
    });
    setShowAddModal(false);
    setEditingMedicine(null);
  };

  const handleEdit = (medicine) => {
    setFormData({
      name: medicine.name,
      category: medicine.category,
      price: medicine.price,
      description: medicine.description,
      prescription: medicine.prescription,
      stock: medicine.stock,
      manufacturer: medicine.manufacturer,
      uses: medicine.uses,
      dosage: medicine.dosage,
      sideEffects: medicine.sideEffects
    });
    setEditingMedicine(medicine);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      deleteMedicine(id);
    }
  };

  const stats = {
    totalProducts: medicines.length,
    totalOrders: orders.length,
    totalRevenue: medicines.reduce((sum, med) => sum + med.price * (200 - med.stock), 0).toFixed(0),
    lowStock: medicines.filter(med => med.stock < 50).length
  };

  if (!isAdmin()) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <h1>My Account</h1>
          <div className="user-info">
            <h2>Welcome, {user?.name}!</h2>
            <div className="info-grid">
              <div className="info-card">
                <strong>Email:</strong>
                <span>{user?.email}</span>
              </div>
              <div className="info-card">
                <strong>Phone:</strong>
                <span>{user?.phone || 'Not provided'}</span>
              </div>
              <div className="info-card">
                <strong>Address:</strong>
                <span>{user?.address || 'Not provided'}</span>
              </div>
              <div className="info-card">
                <strong>Account Type:</strong>
                <span>Customer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button className="btn-add" onClick={() => setShowAddModal(true)}>
            <FaPlus /> Add New Medicine
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e3f2fd' }}>
              <FaPills style={{ color: '#2196f3' }} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Products</span>
              <span className="stat-value">{stats.totalProducts}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fff3e0' }}>
              <FaShoppingCart style={{ color: '#ff9800' }} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Orders</span>
              <span className="stat-value">{stats.totalOrders}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e8f5e9' }}>
              <FaDollarSign style={{ color: '#4caf50' }} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Revenue</span>
              <span className="stat-value">₹{stats.totalRevenue}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#ffebee' }}>
              <FaChartLine style={{ color: '#f44336' }} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Low Stock</span>
              <span className="stat-value">{stats.lowStock}</span>
            </div>
          </div>
        </div>

        <div className="medicines-table-container">
          <h2>Manage Medicines</h2>
          <div className="table-wrapper">
            <table className="medicines-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Manufacturer</th>
                  <th>Prescription</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td>{medicine.name}</td>
                    <td><span className="category-badge">{medicine.category}</span></td>
                    <td className="price-cell">₹{medicine.price}</td>
                    <td>
                      <span className={`stock-badge ${medicine.stock < 50 ? 'low' : 'high'}`}>
                        {medicine.stock}
                      </span>
                    </td>
                    <td>{medicine.manufacturer}</td>
                    <td>
                      <span className={`prescription-badge ${medicine.prescription ? 'required' : 'not-required'}`}>
                        {medicine.prescription ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button className="btn-edit" onClick={() => handleEdit(medicine)}>
                        <FaEdit />
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(medicine.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAddModal && (
          <div className="modal-overlay" onClick={() => resetForm()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}</h2>
              <form onSubmit={handleSubmit} className="medicine-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Medicine Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Manufacturer</label>
                    <input
                      type="text"
                      name="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                      {categories.filter(cat => cat !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="prescription"
                        checked={formData.prescription}
                        onChange={handleChange}
                      />
                      Requires Prescription
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="2"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Uses</label>
                  <textarea
                    name="uses"
                    value={formData.uses}
                    onChange={handleChange}
                    rows="2"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Dosage</label>
                  <input
                    type="text"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Side Effects</label>
                  <textarea
                    name="sideEffects"
                    value={formData.sideEffects}
                    onChange={handleChange}
                    rows="2"
                    required
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    {editingMedicine ? 'Update Medicine' : 'Add Medicine'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
