import React, { createContext, useState, useContext, useEffect } from 'react'; // <--- Importamos useEffect

// 1. Creamos el contexto
const CartContext = createContext();

// 2. Hook personalizado
export const useCart = () => useContext(CartContext);

// 3. El proveedor
export const CartProvider = ({ children }) => {
  // --- CAMBIO DE LLAVE AQUÍ ---
  // Al arrancar, buscamos si existe la caja 'thanos_cart'.
  // Si el cliente tiene un carrito viejo, se ignora y empieza de cero.
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('thanos_cart'); // <--- NUEVA LLAVE
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // --- EFECTO DE GUARDADO ---
  // Cada vez que modificas el carrito, lo guardamos en la nueva caja 'thanos_cart'
  useEffect(() => {
    localStorage.setItem('thanos_cart', JSON.stringify(cartItems)); // <--- NUEVA LLAVE
  }, [cartItems]);


  // Función para agregar al carrito (Igual que antes)
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un producto
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Función para vaciar el carrito (Útil para el Checkout)
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular el precio total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Calcular cantidad de items
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};