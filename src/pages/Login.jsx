import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    // console.log("Ingresando...", email);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      {/* Tarjeta con borde superior Rojo Thanos */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 border-t-4 border-[#F50010]">
        <div className="text-center mb-10">
          {/* LOGO TIPOGRÁFICO */}
          <h2 className="text-5xl font-black text-[#F50010] uppercase italic tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
            THANOS
          </h2>
          <p className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-1">
            Indumentaria
          </p>
          <p className="mt-6 text-sm text-gray-500 font-medium">
            Acceso exclusivo administración
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
              Usuario / Email
            </label>
            <input
              id="email"
              type="text"
              required
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F50010] focus:border-[#F50010] transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F50010] focus:border-[#F50010] transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded shadow-lg text-sm font-black text-white bg-[#F50010] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F50010] transition uppercase tracking-widest active:scale-95"
            >
              Ingresar al Panel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;