import React from 'react';
import { Link } from 'react-router-dom'; // Si quieres que sean clicables, agregamos Link

const categories = [
  {
    id: 1,
    name: 'REMERAS',
    description: 'Estilo urbano y corte oversize.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop', // Foto de remera con estilo
    colSpan: 'col-span-1 md:col-span-2', 
    link: '/catalogo?category=Remeras'
  },
  {
    id: 2,
    name: 'GORRAS',
    description: 'Snapbacks y Truckers oficiales.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1480&auto=format&fit=crop', // Foto de gorras
    colSpan: 'col-span-1',
    link: '/catalogo?category=Gorras'
  },
  {
    id: 3,
    name: 'ZAPATILLAS',
    description: 'Tracción y diseño para el asfalto.',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1480&auto=format&fit=crop', // Foto de sneakers
    colSpan: 'col-span-1',
    link: '/catalogo?category=Zapatillas'
  },
  {
    id: 4,
    name: 'BUZOS',
    description: 'Hoodies técnicos para el frío.',
    image: 'https://images.unsplash.com/photo-1512400930990-e0bc0bd809df?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Foto de hoodie
    colSpan: 'col-span-1 md:col-span-2',
    link: '/catalogo?category=Buzos'
  },
];

const Categories = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TÍTULO ESTILO THANOS */}
        <h2 className="text-4xl font-black text-gray-900 mb-10 text-center uppercase italic tracking-tighter">
          Todo para tu <span className="text-[#F50010]">Outfit</span>
        </h2>
        
        {/* Grid estilo "Mosaico" */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              to="/catalogo" // Aquí podrías usar category.link si filtras por URL
              key={category.id} 
              className={`relative group rounded-lg overflow-hidden h-64 cursor-pointer ${category.colSpan} shadow-md hover:shadow-xl transition-shadow`}
            >
              {/* Imagen de fondo con efecto Zoom */}
              <div className="absolute inset-0">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Capa oscura (gradiente) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* Texto */}
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="border-l-4 border-[#F50010] pl-4 transform transition-transform duration-300 group-hover:translate-x-2">
                    <h3 className="text-2xl font-black text-white mb-1 uppercase italic tracking-wide">
                        {category.name}
                    </h3>
                    <p className="text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        {category.description}
                    </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;