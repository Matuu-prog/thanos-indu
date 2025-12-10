import React from 'react';
import { Link } from 'react-router-dom';

const HeroFull = () => {
  // Usamos una URL directa de Unsplash de una tienda de ropa moderna
  const bgImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  return (
    <div 
      className="relative bg-cover bg-center h-[80vh] flex items-center bg-[#000000]" // Mantenemos el fondo negro de respaldo
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Capa oscura para que el texto blanco resalte sobre la foto de la tienda */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* NUEVO TÍTULO */}
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl drop-shadow-lg uppercase leading-tight">
          La mejor indumentaria de <span className="text-[#F50010]">Salta</span>
        </h1>
        
        {/* NUEVO TEXTO THANOS */}
        <p className="mt-6 max-w-md mx-auto text-lg text-gray-200 sm:text-xl md:mt-8 md:max-w-3xl drop-shadow font-medium">
          Equípate con lo mejor en Thanos. Ropa urbana diseñada para quienes no aceptan límites.
        </p>
        
        <div className="mt-10 flex justify-center gap-4 font-bold">
          <Link
            to="/catalogo"
            className="px-8 py-3 border border-transparent rounded text-white bg-[#F50010] hover:bg-red-700 md:py-4 md:text-lg md:px-10 transition shadow-lg transform hover:-translate-y-1 uppercase"
          >
            Ver Catálogo
          </Link>
          
          {/* BOTÓN WHATSAPP ACTUALIZADO (Con icono para que quede mejor) */}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-white rounded text-white hover:bg-white hover:text-black md:py-4 md:text-lg md:px-10 transition shadow-lg flex items-center gap-2 uppercase"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.757-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroFull;