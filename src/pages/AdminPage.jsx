import React, { useState, useEffect } from 'react';
import { db } from '../data/mockDatabase';
import { login, logout, requireAuth } from '../utils/auth';
import { formatCurrency } from '../utils/helpers';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Package, Tag, BarChart, LogOut, Search } from 'lucide-react';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (requireAuth()) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const user = e.target.username.value;
        const pass = e.target.password.value;
        const result = login(user, pass);
        if (result.success) {
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <form onSubmit={handleLogin} className="bg-white p-12 shadow-xl max-w-sm w-full">
                    <h1 className="font-heading text-2xl mb-8 text-center">Admin Access</h1>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs uppercase tracking-widest">Username</label>
                            <input name="username" className="mt-1" defaultValue="admin" />
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-widest">Password</label>
                            <input name="password" type="password" className="mt-1" defaultValue="admin123" />
                        </div>
                        <button className="btn w-full mt-4">Login</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex mt-20">
            {/* Sidebar */}
            <aside className="w-64 bg-black text-white p-6 fixed h-full">
                <h2 className="font-heading text-xl mb-12">Admin Panel</h2>
                <nav className="flex flex-col gap-4 text-sm tracking-wider uppercase">
                    <Link to="/admin" className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><BarChart size={18} /> Dashboard</Link>
                    <Link to="/admin/orders" className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><Package size={18} /> Orders</Link>
                    <Link to="/admin/products" className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><Tag size={18} /> Products</Link>
                    <button onClick={() => { logout(); setIsAuthenticated(false); }} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity mt-12 text-red-400"><LogOut size={18} /> Logout</button>
                </nav>
            </aside>

            {/* Content */}
            <main className="ml-64 flex-1 p-12">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </main>
        </div>
    );
}

function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        setStats(db.getAnalytics());
    }, []);

    if (!stats) return <div>Loading simulated data...</div>;

    return (
        <div>
            <h1 className="font-heading text-3xl mb-8">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-8 shadow-sm">
                    <h3 className="text-xs uppercase text-gray-400 mb-2">Total Sales</h3>
                    <p className="text-3xl font-heading">{formatCurrency(stats.totalSales)}</p>
                </div>
                <div className="bg-white p-8 shadow-sm">
                    <h3 className="text-xs uppercase text-gray-400 mb-2">Orders</h3>
                    <p className="text-3xl font-heading">{stats.totalOrders} <span className="text-sm text-gray-400">({stats.pendingOrders} pending)</span></p>
                </div>
                <div className="bg-white p-8 shadow-sm border-l-4 border-red-500">
                    <h3 className="text-xs uppercase text-gray-400 mb-2">Fraud Alerts</h3>
                    <p className="text-3xl font-heading text-red-500">{stats.fraudAlerts}</p>
                </div>
            </div>
        </div>
    );
}

function Orders() {
    const [orders, setOrders] = useState([]);
    useEffect(() => setOrders(db.getAllOrders()), []);

    const updateStatus = (id, status) => {
        db.updateOrderStatus(id, status);
        setOrders(db.getAllOrders()); // Refresh (inefficient but fine for demo)
    }

    return (
        <div>
            <h1 className="font-heading text-3xl mb-8">Orders</h1>
            <div className="bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.slice().reverse().map(order => (
                            <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-mono text-sm">{order.orderNumber}</td>
                                <td className="p-4">
                                    <div className="font-medium">{order.customerName}</div>
                                    <div className="text-xs text-gray-400">{order.paymentMethod.toUpperCase()}</div>
                                </td>
                                <td className="p-4">{formatCurrency(order.total)}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs uppercase tracking-wider ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    {order.status !== 'completed' && (
                                        <button onClick={() => updateStatus(order.id, 'completed')} className="text-xs btn py-2 px-4">
                                            Confirm
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Products() {
    const [products, setProducts] = useState(db.getAllProducts());
    return (
        <div>
            <h1 className="font-heading text-3xl mb-8">Products</h1>
            <div className="bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
                        <tr>
                            <th className="p-4">Product</th>
                            <th className="p-4">Category</th>
                            <th className="p-4 text-right">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} className="border-t border-gray-100">
                                <td className="p-4 flex items-center gap-3">
                                    <img src={p.images[0]} className="w-10 h-10 object-cover" />
                                    <span className="font-medium">{p.name}</span>
                                </td>
                                <td className="p-4 text-sm text-gray-500">{p.category}</td>
                                <td className="p-4 text-right">{formatCurrency(p.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
