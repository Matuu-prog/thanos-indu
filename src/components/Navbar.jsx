import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const { isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO THANOS: Imagen Silueta Exacta + Texto */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              {/* IMAGEN DE LA SILUETA EXACTA */}
              {/* Asegúrate de que la imagen 'silueta-toro.png' esté en la carpeta public */}
              <img 
  src="https://images.unsplash.com/vector-1751489957756-658f7be80bc4?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="Thanos Toro Test" 
  className="h-14 w-auto object-contain transition-transform group-hover:scale-110" 
/>
              
              {/* TEXTO THANOS POTENTE */}
              <span className="ml-3 text-4xl font-black italic uppercase tracking-tighter text-gray-900 group-hover:text-[#F50010] transition-colors" style={{ fontFamily: 'Impact, sans-serif' }}>
                Thanos
              </span>
            </Link>
          </div>
          
          {/* MENU ESCRITORIO */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#F50010] font-bold uppercase tracking-wide transition-colors">Inicio</Link>
            <Link to="/catalogo" className="text-gray-700 hover:text-[#F50010] font-bold uppercase tracking-wide transition-colors">Catálogo</Link>
            
            {isAdmin && (
              <Link to="/admin" className="text-[#F50010] font-bold border-2 border-[#F50010] px-3 py-1 rounded-md hover:bg-[#F50010] hover:text-white transition-all">
                Panel Admin
              </Link>
            )}

            <Link to="/carrito" className="relative text-gray-700 hover:text-[#F50010] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F50010] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* BOTÓN MÓVIL */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-500 hover:text-[#F50010] focus:outline-none transition-colors"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4 shadow-inner">
          <div className="px-4 pt-2 pb-3 space-y-2 flex flex-col">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:text-[#F50010] hover:bg-gray-50 uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              to="/catalogo" 
              className="px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:text-[#F50010] hover:bg-gray-50 uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Catálogo
            </Link>
            
            {isAdmin && (
               <Link 
               to="/admin" 
               className="px-3 py-2 rounded-md text-base font-bold text-[#F50010] hover:bg-red-50"
               onClick={() => setIsMobileMenuOpen(false)}
             >
               Panel Admin
             </Link>
            )}

            <Link 
              to="/carrito" 
              className="px-3 py-4 rounded-md text-base font-bold text-white bg-[#F50010] hover:bg-red-700 flex justify-between items-center transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Mi Carrito</span>
              {cartCount > 0 && (
                <span className="bg-white text-[#F50010] text-xs font-bold px-3 py-1 rounded-full">
                  {cartCount} Items
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;