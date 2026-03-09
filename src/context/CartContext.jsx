import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('tab4u_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedOrders = localStorage.getItem('tab4u_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tab4u_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tab4u_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (orderMeta = {}) => {
    if (cart.length === 0) {
      return null;
    }

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax;

    const newOrder = {
      id: Date.now(),
      items: cart,
      itemCount: cart.reduce((count, item) => count + item.quantity, 0),
      subtotal,
      tax,
      total,
      createdAt: new Date().toISOString(),
      ...orderMeta
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCart([]);

    return newOrder;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      orders,
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      placeOrder,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

