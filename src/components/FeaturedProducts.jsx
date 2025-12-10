import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FeaturedProducts = () => {
  const { addToCart } = useCart();

  // DEFINIMOS LOS PRODUCTOS DE ROPA MANUALMENTE AQUÍ PARA QUE SE VEAN YA MISMO
  const featured = [
    {
      id: 101, // IDs nuevos para no chocar con las bicis
      name: 'Hoodie Oversize Black',
      category: 'Buzos',
      subcategory: 'Streetwear',
      price: 48500,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1480&auto=format&fit=crop',
    },
    {
      id: 102,
      name: 'Air Thunder Red',
      category: 'Zapatillas',
      subcategory: 'Running',
      price: 145000,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop',
    },
    {
      id: 103,
      name: 'Trucker Cap Original',
      category: 'Accesorios',
      subcategory: 'Gorras',
      price: 18900,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1480&auto=format&fit=crop',
    },
    {
      id: 104,
      name: 'Remera Graphic Tee',
      category: 'Remeras',
      subcategory: 'Urban',
      price: 24000,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1374&auto=format&fit=crop',
    }
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TÍTULO ACTUALIZADO CON ROJO THANOS */}
        <h2 className="text-3xl font-black text-gray-900 mb-10 text-center uppercase tracking-wider italic">
          Lo último en <span className="text-[#F50010]">THANOS</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1 flex flex-col justify-between border-b-4 border-transparent hover:border-[#F50010]"
            >
              <Link to={`/producto/${product.id}`} className="block relative">
                <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 lg:aspect-none lg:h-64 relative"> {/* Aumenté un poco la altura a h-64 para ropa */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Etiqueta Roja */}
                  <span className="absolute top-2 right-2 bg-[#F50010] text-white px-2 py-1 text-xs font-bold rounded shadow-sm uppercase">
                    {product.subcategory}
                  </span>
                </div>
              </Link>
              
              <div className="p-5 flex flex-col flex-grow">
                <Link to={`/producto/${product.id}`} className="block">
                    {/* Texto color Carbón (negro) */}
                    <p className="text-xs font-bold text-[#000000] uppercase tracking-wide mb-1">
                    {product.category}
                    </p>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-2 leading-tight group-hover:text-[#F50010] transition-colors uppercase">
                    {product.name}
                    </h3>
                </Link>

                <div className="mt-auto">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-2xl font-black text-[#F50010]">${product.price.toLocaleString('es-AR')}</p>
                    </div>

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
        
        <div className="mt-12 text-center">
            <Link to="/catalogo" className="inline-block px-8 py-3 border-2 border-gray-300 shadow-sm text-base font-bold rounded text-gray-700 bg-white hover:border-[#F50010] hover:text-[#F50010] transition uppercase">
                Ver todo el catálogo
            </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;