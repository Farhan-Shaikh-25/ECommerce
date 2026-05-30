import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      
      if (existing) {
        // Enforce the maximum limit of 3 items
        if (existing.quantity >= 3) return prev; 
        
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ADD THIS NEW FUNCTION
  const decreaseQuantity = (id) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === id);
      
      // If there's only 1 left, a decrease should remove it from the cart entirely
      if (existing.quantity === 1) {
        return prev.filter((item) => item._id !== id); 
      }
      
      return prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    // Make sure to add 'decreaseQuantity' to the exported value
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);