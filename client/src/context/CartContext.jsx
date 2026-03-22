import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
const CartContext = createContext();

// 2. Create a custom hook so other files can easily use the cart
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Create the Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add an item to the cart
  const addToCart = (dish) => {
    setCart((prevCart) => {
      // Check if the dish is already in the cart
      const existingItem = prevCart.find((item) => item._id === dish._id);
      
      if (existingItem) {
        // If it is, just increase the quantity by 1
        return prevCart.map((item) =>
          item._id === dish._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      // If it's new, add it to the array with a quantity of 1
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  // Remove an item entirely
  const removeFromCart = (dishId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== dishId));
  };

  // Empty the cart (useful for after checkout!)
  const clearCart = () => {
    setCart([]);
  };

  // Calculate the total price of everything in the cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calculate the total number of items (for the little red badge on a cart icon)
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getCartTotal,
      getItemCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};