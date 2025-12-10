import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 uppercase tracking-wide">Tu Carrito de Compras</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <p className="text-gray-500 text-xl">Tu carrito está vacío.</p>
            <Link to="/catalogo" className="mt-8 inline-block bg-gray-900 text-white px-8 py-3 rounded font-bold uppercase hover:bg-[#F50010] transition">
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-6 px-4 sm:px-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="uppercase font-bold"><Link to={`/producto/${item.id}`}>{item.name}</Link></h3>
                          <p className="ml-4 font-bold">${(item.price * item.quantity).toLocaleString('es-AR')}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.subcategory}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-700 font-medium">Cantidad: {item.quantity}</p>
                        <button type="button" onClick={() => removeFromCart(item.id)} className="font-medium text-red-600 hover:text-[#F50010] transition uppercase text-xs">
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6 h-fit lg:w-96">
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase">Resumen del pedido</h2>
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${cartTotal.toLocaleString('es-AR')}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500 mb-6">Envío y tasas se calculan en el checkout.</p>
              <Link to="/checkout" className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#F50010] px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-red-700 transition uppercase">
                Finalizar Compra
              </Link>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  o{' '}
                  <Link to="/catalogo" className="font-medium text-[#F50010] hover:text-red-800 uppercase">
                    Continuar Comprando &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;