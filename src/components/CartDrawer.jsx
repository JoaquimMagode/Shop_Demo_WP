import React, { useEffect, useState } from 'react';
import { db } from '../data/mockDatabase';
import { formatCurrency } from '../utils/helpers';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }) {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const updateItems = () => setItems(db.getCart());

    useEffect(() => {
        if (isOpen) updateItems();

        window.addEventListener('cart-updated', updateItems);
        return () => window.removeEventListener('cart-updated', updateItems);
    }, [isOpen]);

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleUpdateQty = (id, newQty) => {
        if (newQty < 1) return;
        db.updateCartItem(id, newQty);
        updateItems();
        window.dispatchEvent(new Event('cart-updated')); // Sync nav count
    }

    const handleRemove = (id) => {
        db.removeFromCart(id);
        updateItems();
        window.dispatchEvent(new Event('cart-updated'));
    }

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl flex flex-col`}>

                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-heading text-xl">Shopping Bag ({items.length})</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <ShoppingBag size={48} className="mb-4 opacity-20" />
                            <p>Your bag is empty.</p>
                            <button onClick={onClose} className="mt-4 text-black underline">Continue Shopping</button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-20 h-24 bg-gray-50 flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-heading text-sm pr-4">{item.name}</h4>
                                                <button onClick={() => handleRemove(item.id)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">{item.size} / {item.color}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-gray-200">
                                                <button onClick={() => handleUpdateQty(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100"><Minus size={14} /></button>
                                                <span className="px-2 text-xs font-medium">{item.quantity}</span>
                                                <button onClick={() => handleUpdateQty(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100"><Plus size={14} /></button>
                                            </div>
                                            <div className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-sm uppercase tracking-wider text-gray-500">Subtotal</span>
                            <span className="font-heading text-2xl">{formatCurrency(total)}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">Shipping & Taxes calculated at checkout.</p>
                        <button onClick={() => { onClose(); navigate('/checkout'); }} className="btn w-full">Checkout</button>
                    </div>
                )}

            </div>
        </>
    );
}
