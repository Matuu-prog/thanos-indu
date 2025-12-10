import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const Catalog = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [openMenu, setOpenMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // MENÚ DE CATEGORÍAS ACTUALIZADO PARA ROPA
  const categoriesMenu = [
    { name: 'Todo el Catálogo', type: 'simple', value: 'Todos' },
    { name: 'Indumentaria Superior', type: 'dropdown', subcategories: ['Remeras', 'Buzos', 'Camperas'] },
    { name: 'Indumentaria Inferior', type: 'dropdown', subcategories: ['Pantalones', 'Shorts'] },
    { name: 'Calzado', type: 'dropdown', subcategories: ['Zapatillas', 'Botas'] },
    { name: 'Accesorios', type: 'dropdown', subcategories: ['Gorras', 'Mochilas', 'Medias'] },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesCategory = true;
    if (selectedFilter !== 'Todos') {
      if (product.category === selectedFilter) matchesCategory = true;
      else if (product.subcategory === selectedFilter) matchesCategory = true;
      else matchesCategory = false;
    }
    return matchesSearch && matchesCategory;
  });

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CABECERA */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tighter">
            Catálogo <span className="text-[#F50010]">Thanos</span>
          </h1>
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Buscar remeras, zapatillas..." 
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded focus:border-[#F50010] focus:ring-0 outline-none transition font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* SIDEBAR DE FILTROS */}
          <div className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded shadow-sm sticky top-24 border-t-4 border-[#F50010]">
              <h3 className="text-xl font-black text-gray-900 mb-6 uppercase">Categorías</h3>
              <ul className="space-y-2">
                {categoriesMenu.map((item) => (
                  <li key={item.name}>
                    {item.type === 'simple' ? (
                      <button
                        onClick={() => setSelectedFilter(item.value)}
                        className={`w-full text-left px-3 py-2 rounded transition-colors uppercase font-bold text-sm ${selectedFilter === item.value ? 'bg-[#F50010] text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-[#F50010]'}`}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <div>
                        <button
                          onClick={() => { toggleMenu(item.name); setSelectedFilter(item.name); }}
                          className={`w-full flex justify-between items-center text-left px-3 py-2 rounded transition-colors uppercase font-bold text-sm ${selectedFilter === item.name || openMenu === item.name ? 'text-[#F50010] bg-red-50' : 'text-gray-600 hover:bg-gray-100 hover:text-[#F50010]'}`}
                        >
                          {item.name}
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform transition-transform duration-200 ${openMenu === item.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openMenu === item.name && (
                          <ul className="pl-4 mt-2 space-y-1 border-l-2 border-gray-200 ml-2">
                             <li><button onClick={() => setSelectedFilter(item.name)} className={`w-full text-left px-3 py-1.5 text-xs font-bold uppercase rounded ${selectedFilter === item.name ? 'text-[#F50010]' : 'text-gray-500 hover:text-gray-900'}`}>Ver todo</button></li>
                            {item.subcategories.map((sub) => (
                              <li key={sub}>
                                <button onClick={() => setSelectedFilter(sub)} className={`w-full text-left px-3 py-1.5 text-xs font-bold uppercase rounded ${selectedFilter === sub ? 'text-[#F50010]' : 'text-gray-500 hover:text-gray-900'}`}>{sub}</button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* GRILLA DE PRODUCTOS */}
          <div className="w-full md:w-3/4">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1 group flex flex-col justify-between border-b-4 border-transparent hover:border-[#F50010]">
                    
                    <Link to={`/producto/${product.id}`} className="block relative">
                        <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 h-64 relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-2 right-2 bg-[#F50010] text-white px-2 py-1 text-xs font-bold rounded shadow-sm uppercase">
                                {product.subcategory}
                            </span>
                        </div>
                    </Link>
                    
                    <div className="p-5 flex flex-col flex-grow">
                        <Link to={`/producto/${product.id}`} className="block">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-1">{product.category}</p>
                            <h3 className="text-lg font-black text-gray-900 mb-2 uppercase leading-tight group-hover:text-[#F50010] transition-colors">
                                {product.name}
                            </h3>
                        </Link>
                        
                        <div className="mt-auto">
                            <p className="text-2xl font-black text-[#F50010] mb-4">
                                ${product.price.toLocaleString('es-AR')}
                            </p>
                            
                            <button 
                                onClick={() => addToCart(product)}
                                className="w-full bg-[#F50010] text-white py-3 px-4 rounded hover:bg-red-700 transition-colors font-bold uppercase text-sm flex items-center justify-center gap-2 active:scale-95 shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Agregar
                            </button>
                        </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded shadow-sm border-t-4 border-gray-200">
                <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-bold text-gray-900 uppercase">Sin resultados</h3>
                <p className="text-gray-500 mt-2">No encontramos productos con esos filtros.</p>
                <button onClick={() => {setSearchTerm(''); setSelectedFilter('Todos');}} className="mt-6 text-[#F50010] hover:text-red-700 font-bold uppercase underline">Limpiar filtros</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;