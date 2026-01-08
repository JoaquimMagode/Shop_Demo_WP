import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { db } from './data/mockDatabase';

// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import VerifyPage from './pages/VerifyPage';

// Components
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';

export default function App() {
    const [cartOpen, setCartOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    // Sync cart count
    useEffect(() => {
        const updateCount = () => {
            const items = db.getCart();
            const count = items.reduce((sum, i) => sum + i.quantity, 0);
            setCartCount(count);
        };

        // Initial load
        updateCount();

        // Listen for custom event from DB or other components
        window.addEventListener('cart-updated', updateCount);
        return () => window.removeEventListener('cart-updated', updateCount);
    }, []);

    return (
        <Router>
            <div className="app">
                <Navbar onOpenCart={() => setCartOpen(true)} count={cartCount} />

                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/category/:category" element={<CategoryPage />} />
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/admin/*" element={<AdminPage />} />
                        <Route path="/verify" element={<VerifyPage />} />
                    </Routes>
                </main>

                <Footer />

                <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
            </div>
        </Router>
    );
}

function Navbar({ onOpenCart, count }) {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Left Navigation */}
                    <nav className="hidden lg:flex items-center space-x-12">
                        <Link to="/category/daily-wear" className="text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity cursor-pointer">Daily</Link>
                        <Link to="/category/gym" className="text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity cursor-pointer">Gym</Link>
                        <Link to="/category/oversized" className="text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity cursor-pointer">Oversized</Link>
                    </nav>

                    {/* Center Logo */}
                    <div className="flex-1 flex justify-center">
                        <Link to="/" className="font-heading text-2xl font-bold tracking-widest cursor-pointer hover:opacity-80 transition-opacity">
                            STREETCORE
                        </Link>
                    </div>

                    {/* Right Navigation */}
                    <div className="hidden lg:flex items-center space-x-12">
                        <Link to="/category/paintable" className="text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity cursor-pointer">Paintable</Link>
                        <Link to="/verify" className="text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity cursor-pointer">Verify</Link>
                        <div className="flex items-center space-x-6">
                            <Link to="/admin" className="cursor-pointer hover:opacity-70 transition-opacity">
                                <User size={20} />
                            </Link>
                            <button 
                                onClick={onOpenCart} 
                                className="relative cursor-pointer hover:opacity-70 transition-opacity"
                            >
                                <ShoppingBag size={20} />
                                {count > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                                        {count}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="lg:hidden cursor-pointer hover:opacity-70 transition-opacity"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 py-4">
                        <nav className="flex flex-col space-y-4">
                            <Link to="/category/daily-wear" className="text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity cursor-pointer px-4 py-2" onClick={() => setMobileMenuOpen(false)}>Daily</Link>
                            <Link to="/category/gym" className="text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity cursor-pointer px-4 py-2" onClick={() => setMobileMenuOpen(false)}>Gym</Link>
                            <Link to="/category/oversized" className="text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity cursor-pointer px-4 py-2" onClick={() => setMobileMenuOpen(false)}>Oversized</Link>
                            <Link to="/category/paintable" className="text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity cursor-pointer px-4 py-2" onClick={() => setMobileMenuOpen(false)}>Paintable</Link>
                            <Link to="/verify" className="text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity cursor-pointer px-4 py-2" onClick={() => setMobileMenuOpen(false)}>Verify</Link>
                            <div className="flex items-center justify-between px-4 py-2">
                                <Link to="/admin" className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
                                    <User size={20} />
                                </Link>
                                <button 
                                    onClick={() => { setMobileMenuOpen(false); onOpenCart(); }} 
                                    className="relative cursor-pointer hover:opacity-70 transition-opacity"
                                >
                                    <ShoppingBag size={20} />
                                    {count > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                                            {count}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer className="bg-black text-white py-16 mt-20">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
                <div>
                    <h3 className="font-heading text-xl mb-6">STREETCORE</h3>
                    <p className="text-gray-400 text-sm"> redefining luxury streetwear.</p>
                </div>
                <div>
                    <h4 className="uppercase tracking-wider text-sm mb-4">Shop</h4>
                    <div className="flex flex-col gap-2 text-sm text-gray-400">
                        <Link to="/">New Arrivals</Link>
                        <Link to="/">Bestsellers</Link>
                        <Link to="/verify">Authenticity</Link>
                    </div>
                </div>
                <div>
                    <h4 className="uppercase tracking-wider text-sm mb-4">Service</h4>
                    <div className="flex flex-col gap-2 text-sm text-gray-400">
                        <Link to="/">Contact</Link>
                        <Link to="/">Shipping</Link>
                        <Link to="/admin">Admin Login</Link>
                    </div>
                </div>
                <div>
                    <h4 className="uppercase tracking-wider text-sm mb-4">Newsletter</h4>
                    <div className="flex border-b border-gray-700 pb-2">
                        <input type="email" placeholder="Email Address" className="bg-transparent border-none text-white w-full outline-none placeholder-gray-600" />
                        <button className="text-sm uppercase font-medium">Join</button>
                    </div>
                </div>
            </div>
            <div className="container mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs uppercase tracking-widest">
                &copy; 2025 StreetCore. All rights reserved.
            </div>
        </footer>
    );
}
