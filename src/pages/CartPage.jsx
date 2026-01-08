import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../data/mockDatabase';
import { formatCurrency } from '../utils/helpers';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CartPage() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const updateItems = () => setItems(db.getCart());

    useEffect(() => {
        updateItems();
        window.addEventListener('cart-updated', updateItems);
        return () => window.removeEventListener('cart-updated', updateItems);
    }, []);

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleUpdateQty = (id, newQty) => {
        if (newQty < 1) return;
        db.updateCartItem(id, newQty);
        updateItems();
        window.dispatchEvent(new Event('cart-updated'));
    }

    const handleRemove = (id) => {
        db.removeFromCart(id);
        updateItems();
        window.dispatchEvent(new Event('cart-updated'));
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-gray-50">
                <h1 className="font-heading text-3xl mb-4">Your Bag is Empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven't made your choice yet.</p>
                <Link to="/" className="btn">Start Shopping</Link>
            </div>
        )
    }

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="container max-w-4xl">
                <h1 className="font-heading text-4xl mb-12">Shopping Bag</h1>

                <div className="flex flex-col gap-8">
                    {/* Cart Header (Desktop) */}
                    <div className="hidden md:grid grid-cols-12 text-xs uppercase tracking-widest text-gray-400 border-b pb-4">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Total</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {/* Items */}
                    {items.map(item => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-gray-100 pb-6">
                            <div className="col-span-6 flex gap-6">
                                <img src={item.image} alt={item.name} className="w-24 h-32 object-cover bg-gray-50" />
                                <div>
                                    <h3 className="font-heading text-lg mb-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{item.price} USD</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Size: {item.size} / {item.color}</p>
                                </div>
                            </div>

                            <div className="col-span-2 flex justify-center">
                                <div className="flex items-center border border-gray-200">
                                    <button onClick={() => handleUpdateQty(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-50"><Minus size={14} /></button>
                                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                                    <button onClick={() => handleUpdateQty(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-50"><Plus size={14} /></button>
                                </div>
                            </div>

                            <div className="col-span-2 text-right font-medium">
                                {formatCurrency(item.price * item.quantity)}
                            </div>

                            <div className="col-span-2 text-right">
                                <button onClick={() => handleRemove(item.id)} className="text-gray-400 hover:text-black transition-colors"><X size={20} /></button>
                            </div>
                        </div>
                    ))}

                    {/* Summary */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8 pt-8 bg-gray-50 p-8">
                        <div>
                            <h3 className="font-heading text-xl mb-2">Subtotal</h3>
                            <p className="text-gray-500 text-sm">Shipping & taxes calculated at checkout</p>
                        </div>
                        <div className="text-right mt-4 md:mt-0">
                            <p className="font-heading text-3xl mb-6">{formatCurrency(total)}</p>
                            <button onClick={() => navigate('/checkout')} className="btn w-full md:w-auto px-12 py-4 flex items-center justify-center gap-3">
                                Checkout <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
