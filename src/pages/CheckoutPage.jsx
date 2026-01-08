import React, { useState } from 'react';
import { db } from '../data/mockDatabase';
import { formatCurrency } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { generateAuthCode } from '../utils/qrcode';

export default function CheckoutPage() {
    const navigate = useNavigate();
    const items = db.getCart();

    const [formData, setFormData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 890',
        address: '123 Fashion St, Milan',
        zip: '20121'
    });
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);

    const subtotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const total = subtotal + 15; // Flat rate shipping

    if (items.length === 0) {
        return <div className="h-screen flex items-center justify-center">Your cart is empty.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate Processing
        await new Promise(r => setTimeout(r, 1500));

        // Generate Auth Codes for Items
        const orderItems = items.map((item) => ({
            ...item,
            authenticityCode: generateAuthCode()
        }));

        const order = {
            customerName: formData.name,
            email: formData.email,
            total: total,
            paymentMethod,
            items: orderItems,
            shippingAddress: formData.address
        };

        const newOrder = db.createOrder(order);
        db.clearCart();
        window.dispatchEvent(new Event('cart-updated'));

        alert(`Order Placed! #${newOrder.orderNumber}`);
        navigate('/');
    };

    return (
        <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
            <div className="container max-w-4xl">
                <h1 className="font-heading text-3xl mb-12 text-center">Secure Checkout</h1>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Form */}
                    <div className="flex-1">
                        <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <section className="bg-white p-8 shadow-sm">
                                <h2 className="text-sm uppercase tracking-widest mb-6 border-b pb-2">Contact Information</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                                    <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                    <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                                </div>
                            </section>

                            <section className="bg-white p-8 shadow-sm">
                                <h2 className="text-sm uppercase tracking-widest mb-6 border-b pb-2">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Address" className="col-span-2" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} required />
                                    <input type="text" placeholder="City" required defaultValue="Milan" />
                                    <input type="text" placeholder="ZIP" value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} required />
                                </div>
                            </section>

                            <section className="bg-white p-8 shadow-sm">
                                <h2 className="text-sm uppercase tracking-widest mb-6 border-b pb-2">Payment</h2>
                                <div className="flex flex-col gap-3">
                                    <label className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                                        <input type="radio" name="pay" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                                        <span>Credit Card</span>
                                    </label>
                                    <label className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${paymentMethod === 'mpesa' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                                        <input type="radio" name="pay" checked={paymentMethod === 'mpesa'} onChange={() => setPaymentMethod('mpesa')} />
                                        <span>M-Pesa</span>
                                    </label>
                                    <label className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                                        <input type="radio" name="pay" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                                        <span>Cash on Delivery</span>
                                    </label>
                                </div>
                            </section>
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="w-full md:w-80">
                        <div className="bg-white p-8 shadow-sm sticky top-24">
                            <h3 className="font-heading text-lg mb-6">Order Summary</h3>
                            <div className="flex flex-col gap-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {items.map(item => (
                                    <div key={item.id} className="flex gap-4 text-sm">
                                        <img src={item.image} className="w-12 h-16 object-cover" />
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-gray-500">Qty: {item.quantity}</p>
                                            <p>{formatCurrency(item.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>{formatCurrency(15)}</span></div>
                                <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t"><span>Total</span><span>{formatCurrency(total)}</span></div>
                            </div>

                            <button form="checkout-form" disabled={loading} className="btn w-full mt-6">
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
