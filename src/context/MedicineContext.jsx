import React, { createContext, useState, useContext } from 'react';

const MedicineContext = createContext();

export const useMedicine = () => {
  const context = useContext(MedicineContext);
  if (!context) {
    throw new Error('useMedicine must be used within a MedicineProvider');
  }
  return context;
};

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: 49,
      description: 'Effective pain relief and fever reducer',
      prescription: false,
      stock: 150,
      manufacturer: 'PharmaCo',
      image: 'https://via.placeholder.com/300x300?text=Paracetamol',
      uses: 'Relieves pain, reduces fever',
      dosage: '1-2 tablets every 4-6 hours',
      sideEffects: 'Rare: Nausea, allergic reactions'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      price: 120,
      description: 'Broad-spectrum antibiotic for bacterial infections',
      prescription: true,
      stock: 80,
      manufacturer: 'MediLife',
      image: 'https://via.placeholder.com/300x300?text=Amoxicillin',
      uses: 'Treats bacterial infections',
      dosage: '1 capsule 3 times daily',
      sideEffects: 'Diarrhea, nausea, rash'
    },
    {
      id: 3,
      name: 'Vitamin D3 1000IU',
      category: 'Supplements',
      price: 89,
      description: 'Essential vitamin for bone health',
      prescription: false,
      stock: 200,
      manufacturer: 'HealthPlus',
      image: 'https://via.placeholder.com/300x300?text=Vitamin+D3',
      uses: 'Supports bone health, immune system',
      dosage: '1 tablet daily',
      sideEffects: 'Rare when taken as directed'
    },
    {
      id: 4,
      name: 'Ibuprofen 400mg',
      category: 'Pain Relief',
      price: 75,
      description: 'Anti-inflammatory pain reliever',
      prescription: false,
      stock: 120,
      manufacturer: 'PharmaCo',
      image: 'https://via.placeholder.com/300x300?text=Ibuprofen',
      uses: 'Reduces inflammation, relieves pain',
      dosage: '1 tablet every 4-6 hours with food',
      sideEffects: 'Stomach upset, dizziness'
    },
    {
      id: 5,
      name: 'Omeprazole 20mg',
      category: 'Digestive Health',
      price: 150,
      description: 'Proton pump inhibitor for acid reflux',
      prescription: true,
      stock: 90,
      manufacturer: 'GastroMed',
      image: 'https://via.placeholder.com/300x300?text=Omeprazole',
      uses: 'Treats acid reflux, ulcers',
      dosage: '1 capsule daily before breakfast',
      sideEffects: 'Headache, stomach pain'
    },
    {
      id: 6,
      name: 'Cetirizine 10mg',
      category: 'Allergy Relief',
      price: 65,
      description: 'Antihistamine for allergy symptoms',
      prescription: false,
      stock: 180,
      manufacturer: 'AllergyFree',
      image: 'https://via.placeholder.com/300x300?text=Cetirizine',
      uses: 'Relieves allergy symptoms',
      dosage: '1 tablet daily',
      sideEffects: 'Drowsiness, dry mouth'
    },
    {
      id: 7,
      name: 'Metformin 500mg',
      category: 'Diabetes',
      price: 180,
      description: 'Blood sugar control medication',
      prescription: true,
      stock: 70,
      manufacturer: 'DiabetCare',
      image: 'https://via.placeholder.com/300x300?text=Metformin',
      uses: 'Controls blood sugar in type 2 diabetes',
      dosage: '1 tablet twice daily with meals',
      sideEffects: 'Nausea, diarrhea, stomach upset'
    },
    {
      id: 8,
      name: 'Aspirin 75mg',
      category: 'Heart Health',
      price: 45,
      description: 'Low-dose aspirin for heart protection',
      prescription: false,
      stock: 250,
      manufacturer: 'CardioHealth',
      image: 'https://via.placeholder.com/300x300?text=Aspirin',
      uses: 'Prevents heart attack, stroke',
      dosage: '1 tablet daily',
      sideEffects: 'Stomach irritation, bleeding risk'
    }
  ]);

  const [categories, setCategories] = useState([
    'All',
    'Pain Relief',
    'Antibiotics',
    'Supplements',
    'Digestive Health',
    'Allergy Relief',
    'Diabetes',
    'Heart Health'
  ]);

  const addMedicine = (medicine) => {
    const newMedicine = {
      ...medicine,
      id: medicines.length > 0 ? Math.max(...medicines.map(m => m.id)) + 1 : 1
    };
    setMedicines([...medicines, newMedicine]);
  };

  const updateMedicine = (id, updatedData) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, ...updatedData } : med
    ));
  };

  const deleteMedicine = (id) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const getMedicineById = (id) => {
    return medicines.find(med => med.id === parseInt(id));
  };

  const getMedicinesByCategory = (category) => {
    if (category === 'All') return medicines;
    return medicines.filter(med => med.category === category);
  };

  const searchMedicines = (query) => {
    return medicines.filter(med => 
      med.name.toLowerCase().includes(query.toLowerCase()) ||
      med.category.toLowerCase().includes(query.toLowerCase()) ||
      med.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const value = {
    medicines,
    categories,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    getMedicineById,
    getMedicinesByCategory,
    searchMedicines
  };

  return <MedicineContext.Provider value={value}>{children}</MedicineContext.Provider>;
};
