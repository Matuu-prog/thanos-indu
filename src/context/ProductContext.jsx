import React, { createContext, useState, useContext, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  // 1. CARGAR PRODUCTOS: Usamos la NUEVA llave 'thanos_products'
  // Al cambiar el nombre, el navegador no encontrará los datos viejos (bicis) 
  // y cargará automáticamente la ropa del archivo data/products.js
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('thanos_products'); // <--- CAMBIO DE LLAVE
    if (savedProducts) {
      return JSON.parse(savedProducts);
    }
    // Si no hay nada guardado, usamos los iniciales (Ropa)
    return initialProducts.map(p => ({
      ...p,
      listPrice: p.listPrice || Math.round(p.price * 1.15),
      price: p.price,
      // Actualicé la descripción por defecto para que coincida con la marca
      description: p.description || "Indumentaria oficial Thanos. Calidad premium y diseño exclusivo para tu estilo urbano en Salta."
    }));
  });

  // 2. CARGAR ORDENES: Usamos la NUEVA llave 'thanos_orders'
  // Esto también limpia el historial de ventas viejo
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('thanos_orders'); // <--- CAMBIO DE LLAVE
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // 3. EFECTO: Guardar en localStorage con la NUEVA llave
  useEffect(() => {
    localStorage.setItem('thanos_products', JSON.stringify(products)); // <--- CAMBIO DE LLAVE
  }, [products]);

  // 4. EFECTO: Guardar ordenes con la NUEVA llave
  useEffect(() => {
    localStorage.setItem('thanos_orders', JSON.stringify(orders)); // <--- CAMBIO DE LLAVE
  }, [orders]);


  // --- FUNCIONES (Se mantienen igual) ---
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const addProduct = (newProduct) => {
    const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productWithNumbers = {
        ...newProduct,
        id,
        price: parseFloat(newProduct.price),
        listPrice: parseFloat(newProduct.listPrice)
    };
    setProducts([...products, productWithNumbers]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const addOrder = (orderData) => {
    const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        ...orderData
    };
    setOrders([newOrder, ...orders]);
  };

  return (
    <ProductContext.Provider value={{ products, orders, deleteProduct, addProduct, updateProduct, addOrder }}>
      {children}
    </ProductContext.Provider>
  );
};