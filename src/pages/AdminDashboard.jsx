import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { products, orders, deleteProduct, addProduct, updateProduct } = useProducts();
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // PROTECCIÓN DE RUTA
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  const [activeTab, setActiveTab] = useState('products');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const initialFormState = { id: null, name: '', description: '', price: '', listPrice: '', category: 'Indumentaria', subcategory: '', image: '' };
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, image: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) updateProduct(formData);
    else addProduct(formData);
    setFormData(initialFormState);
    setShowForm(false);
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      
      {/* SIDEBAR NEGRO THANOS */}
      <aside className="w-full md:w-64 bg-black text-white md:min-h-screen p-6 shadow-xl z-10">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-8 text-[#F50010]" style={{ fontFamily: 'Impact, sans-serif' }}>
            THANOS
        </h1>
        <nav className="space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-0">
          <button 
            onClick={() => { setActiveTab('products'); setShowForm(false); }}
            className={`whitespace-nowrap w-full text-left py-3 px-4 rounded font-bold uppercase text-sm transition ${activeTab === 'products' ? 'bg-[#F50010] text-white' : 'hover:bg-gray-800 text-gray-400'}`}
          >
            Productos
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`whitespace-nowrap w-full text-left py-3 px-4 rounded font-bold uppercase text-sm transition ${activeTab === 'orders' ? 'bg-[#F50010] text-white' : 'hover:bg-gray-800 text-gray-400'}`}
          >
            Ventas
          </button>
          <button 
            onClick={() => { logout(); navigate('/'); }} 
            className="whitespace-nowrap w-full text-left py-3 px-4 hover:bg-red-900 text-red-500 font-bold uppercase text-sm mt-auto md:mt-8 transition"
          >
            Salir
          </button>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        
        {/* VISTA DE PRODUCTOS */}
        {activeTab === 'products' && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-3xl font-black text-gray-900 uppercase">Productos</h2>
                {!showForm && (
                  <button 
                    onClick={() => { setFormData(initialFormState); setShowForm(true); }} 
                    className="w-full sm:w-auto bg-[#F50010] text-white px-6 py-3 rounded shadow-lg hover:bg-red-700 font-bold uppercase text-sm transition flex items-center justify-center gap-2"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                      Nuevo Producto
                  </button>
                )}
            </div>

            {showForm ? (
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-2xl mx-auto border-t-4 border-[#F50010]">
                    <h3 className="text-2xl font-black mb-6 text-center uppercase text-gray-800">{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input required name="name" placeholder="Nombre del Producto" value={formData.name} onChange={handleChange} className="w-full border-2 border-gray-200 p-3 rounded focus:border-[#F50010] focus:ring-0 outline-none font-bold" />
                        
                        <div>
                            <label className="text-sm font-bold text-gray-500 uppercase">Descripción</label>
                            <textarea 
                                required 
                                name="description" 
                                rows="3"
                                placeholder="Detalles del producto..." 
                                value={formData.description} 
                                onChange={handleChange} 
                                className="w-full border-2 border-gray-200 p-3 rounded mt-1 focus:border-[#F50010] focus:ring-0 outline-none resize-none" 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-[#F50010] font-black uppercase">Precio Contado</label>
                                <input required type="number" name="price" placeholder="$" value={formData.price} onChange={handleChange} className="w-full border-2 border-gray-200 p-3 rounded focus:border-[#F50010] outline-none" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-bold uppercase">Precio Lista</label>
                                <input required type="number" name="listPrice" placeholder="$" value={formData.listPrice} onChange={handleChange} className="w-full border-2 border-gray-200 p-3 rounded focus:border-[#F50010] outline-none" />
                            </div>
                        </div>

                        <select name="category" value={formData.category} onChange={handleChange} className="w-full border-2 border-gray-200 p-3 rounded bg-white font-medium">
                            <option>Remeras</option>
                            <option>Buzos</option>
                            <option>Pantalones</option>
                            <option>Zapatillas</option>
                            <option>Accesorios</option>
                            <option>Camperas</option>
                        </select>
                        <input name="subcategory" placeholder="Subcategoría (ej: Streetwear)" value={formData.subcategory} onChange={handleChange} className="w-full border-2 border-gray-200 p-3 rounded" />
                        
                        <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center hover:bg-gray-50 transition cursor-pointer">
                             <input type="file" onChange={handleImageChange} className="w-full text-sm text-gray-500" />
                             {formData.image && <img src={formData.image} alt="Preview" className="mx-auto mt-4 h-32 object-contain" />}
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border-2 border-gray-300 rounded hover:bg-gray-100 text-gray-600 font-bold uppercase text-sm">Cancelar</button>
                            <button type="submit" className="px-6 py-3 bg-[#F50010] text-white rounded hover:bg-red-700 font-bold uppercase text-sm shadow-md">Guardar</button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                {/* VISTA ESCRITORIO (Tabla) - Oculta en móvil */}
                <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Producto</th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Precios</th>
                                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 flex items-center">
                                        <img src={p.image} className="h-12 w-12 rounded object-cover mr-4 border border-gray-200" alt="" />
                                        <div>
                                            <div className="font-bold text-gray-900">{p.name}</div>
                                            <div className="text-gray-500 text-xs uppercase font-bold">{p.category}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-[#F50010] font-black">${p.price?.toLocaleString()}</div>
                                        <div className="text-gray-400 text-xs line-through">${p.listPrice?.toLocaleString()}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <button onClick={() => handleEdit(p)} className="text-gray-600 hover:text-black font-bold text-sm">Editar</button>
                                        <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-[#F50010] font-bold text-sm">Borrar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* VISTA MÓVIL (Tarjetas) - Visible solo en móvil */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                    {products.map((p) => (
                        <div key={p.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#F50010] flex gap-4">
                            <img src={p.image} className="h-24 w-24 rounded object-cover bg-gray-100" alt="" />
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-900 leading-tight">{p.name}</h3>
                                    <p className="text-xs text-gray-500 uppercase font-bold mt-1">{p.category}</p>
                                    <p className="text-lg font-black text-[#F50010] mt-1">${p.price?.toLocaleString()}</p>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <button 
                                        onClick={() => handleEdit(p)} 
                                        className="flex-1 bg-gray-100 text-gray-800 py-2 rounded text-xs font-bold uppercase hover:bg-gray-200"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => deleteProduct(p.id)} 
                                        className="flex-1 bg-red-50 text-[#F50010] py-2 rounded text-xs font-bold uppercase hover:bg-red-100"
                                    >
                                        Borrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </>
            )}
          </>
        )}

        {/* VISTA DE VENTAS */}
        {activeTab === 'orders' && (
            <div>
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase">Ventas</h2>
                {orders.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-lg shadow border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">Aún no hay ventas registradas.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-[#F50010]">
                                <div className="flex justify-between items-start mb-4 border-b pb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">Orden #{order.id}</h3>
                                        <p className="text-xs text-gray-500">{order.date}</p>
                                    </div>
                                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded uppercase">Pagado</span>
                                </div>
                                
                                <ul className="mb-4 space-y-1 bg-gray-50 p-3 rounded">
                                    {order.items.map((item, idx) => (
                                        <li key={idx} className="flex justify-between text-sm">
                                            <span><span className="font-bold">{item.quantity}x</span> {item.name}</span>
                                            <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <div className="flex justify-between items-center pt-2">
                                    <p className="text-sm text-gray-600">Cliente: <span className="font-bold">{order.customer}</span></p>
                                    <p className="text-xl font-black text-[#F50010]">
                                        ${order.total.toLocaleString('es-AR')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;