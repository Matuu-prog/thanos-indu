import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams(); 
  const { products } = useProducts();
  // Buscamos el producto (asegurando que el ID sea número)
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  if (!product) return <div className="text-center py-20 text-2xl font-bold text-gray-900">Producto no encontrado 😢</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Migas de pan (Breadcrumbs) */}
        <nav className="text-sm text-gray-500 mb-6 font-medium">
            <Link to="/catalogo" className="hover:text-[#F50010] uppercase font-bold">CATÁLOGO</Link> &gt; <span className="text-gray-900 ml-1">{product.name}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden border-t-4 border-[#F50010]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Imagen del Producto */}
            <div className="h-96 md:h-[600px] bg-gray-100 flex items-center justify-center p-6 relative">
               <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
            </div>

            {/* Detalles */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-[#F50010] font-bold uppercase text-sm mb-2 tracking-widest">
                {product.category} {product.subcategory && `/ ${product.subcategory}`}
              </span>
              <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase italic leading-tight">
                {product.name}
              </h1>
              
              <div className="mb-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-500 text-lg mb-1">
                      Precio de Lista: <span className="font-semibold text-gray-700">${product.listPrice?.toLocaleString('es-AR')}</span>
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-5xl font-black text-[#F50010]">
                          ${product.price.toLocaleString('es-AR')}
                      </p>
                      {/* ETIQUETA AZUL */}
                      <span className="bg-[#E0EEFF] text-[#0356C9] text-xs font-bold px-2 py-1 rounded uppercase tracking-wide border border-blue-200">
                          Contado / Transferencia
                      </span>
                  </div>
              </div>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed whitespace-pre-line border-l-4 border-gray-300 pl-4">
                 {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                 {/* BOTÓN ROJO DE COMPRA (CORREGIDO) */}
                 <button 
                    onClick={() => addToCart(product)} 
                    className="flex-1 bg-[#F50010] text-white font-black uppercase py-4 px-6 rounded hover:bg-red-700 transition shadow-lg hover:shadow-red-500/30 flex justify-center items-center gap-2"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Agregar al Carrito
                 </button>
                 
                 {/* BOTÓN AZUL DE WHATSAPP (CORREGIDO CON ICONO) */}
                 <a 
                    href={`https://wa.me/543874123456?text=Quiero ${product.name}`} 
                    target="_blank" 
                    rel="noopener noreferrer" // Importante por seguridad
                    className="flex-1 border-2 border-[#0356C9] text-[#0356C9] font-bold uppercase py-4 px-6 rounded hover:bg-blue-50 transition text-center flex items-center justify-center gap-2"
                 >
                    {/* SVG COMPLETO DE WHATSAPP */}
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.757-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    Consultar WhatsApp
                 </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;