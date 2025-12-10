import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // USAMOS EL CÓDIGO HEXADECIMAL DIRECTO ENTRE CORCHETES
    <footer className="bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            {/* Rojo Thanos directo: text-[#F50010] */}
            <h3 className="text-2xl font-black text-[#F50010] mb-4 uppercase italic">Thanos Indumentaria</h3>
            <p className="text-gray-300 text-sm">
              Tu estilo define tu fuerza. Encontrá la mejor indumentaria urbana y deportiva para destacar en cada paso.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white uppercase">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/catalogo" className="hover:text-[#F50010] transition">Catálogo Completo</Link></li>
              <li><Link to="#" className="hover:text-[#F50010] transition">Sobre Nosotros</Link></li>
              <li><Link to="#" className="hover:text-[#F50010] transition">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white uppercase">Visítanos</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#F50010]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Av. Belgrano 1234, Salta Capital
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#F50010]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +54 387 412 3456
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#F50010]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                contacto@thanosindumentaria.com
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-500 flex flex-col items-center">
          <p>&copy; {new Date().getFullYear()} Thanos Indumentaria. Todos los derechos reservados.</p>
          <Link to="/login" className="mt-2 text-gray-600 hover:text-[#F50010] text-xs transition uppercase font-bold">
            Acceso Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;