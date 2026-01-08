import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../data/mockDatabase';
import { formatCurrency } from '../utils/helpers';
import { generateQRCode } from '../utils/qrcode';
import { Check, ShieldCheck, Star } from 'lucide-react';

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    // Selections
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [qrCode, setQrCode] = useState(null);

    useEffect(() => {
        // Simulate lookup
        const found = db.getProductById(id);
        setProduct(found);
        if (found) {
            setSelectedSize(found.sizes[0]);
            setSelectedColor(found.colors[0].name);
            setReviews(db.getReviewsByProduct(id));
            
            // Generate demo QR code
            generateQRCode(`https://streetcore.com/verify/SC-DEMO-${id}`).then(setQrCode);
        }
        setLoading(false);
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        
        // Check stock availability
        const stockItem = product.inventory?.find(
            i => i.size === selectedSize && i.color === selectedColor
        );
        
        if (!stockItem || stockItem.quantity < 1) {
            alert('Sorry, this item is out of stock in the selected size/color.');
            return;
        }
        
        db.addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: selectedSize,
            color: selectedColor,
            quantity: 1
        });
        
        // Dispatch event to update navbar count
        window.dispatchEvent(new Event('cart-updated'));
        
        // Show success message
        alert('Added to cart successfully!');
    }

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="h-screen flex items-center justify-center">Product not found.</div>;

    return (
        <div className="pt-24 pb-12 bg-white">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Gallery (Left) - Sticky on Desktop */}
                    <div className="w-full lg:w-3/5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {product.images.map((img, i) => (
                                <div key={i} className="aspect-[4/5] bg-gray-50">
                                    <img src={img} alt={`View ${i}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                            {/* Mock Video Placeholder */}
                            <div className="aspect-[4/5] bg-black flex items-center justify-center text-white">
                                <span className="uppercase tracking-widest text-xs">Video Preview</span>
                            </div>
                        </div>
                    </div>

                    {/* Info (Right) - Sticky Container */}
                    <div className="w-full lg:w-2/5">
                        <div className="sticky top-24">
                            <div className="mb-2 text-sm text-gray-500 uppercase tracking-widest">{product.category.replace('-', ' ')}</div>
                            <h1 className="font-heading text-4xl mb-4">{product.name}</h1>
                            <p className="text-xl mb-8">{formatCurrency(product.price)}</p>

                            <div className="prose text-gray-600 mb-8 text-sm leading-relaxed">
                                {product.description}
                            </div>

                            {/* Selectors */}
                            <div className="mb-6">
                                <label className="block text-xs uppercase tracking-widest mb-3">Color: <span className="text-gray-900">{selectedColor}</span></label>
                                <div className="flex gap-3">
                                    {product.colors.map(c => (
                                        <button
                                            key={c.name}
                                            onClick={() => setSelectedColor(c.name)}
                                            className={`w-8 h-8 rounded-full border border-gray-200 shadow-sm relative ${selectedColor === c.name ? 'ring-1 ring-black ring-offset-2' : ''}`}
                                            style={{ backgroundColor: c.hex }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="block text-xs uppercase tracking-widest mb-3">Size: <span className="text-gray-900">{selectedSize}</span></label>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setSelectedSize(s)}
                                            className={`h-10 px-4 min-w-[3rem] border ${selectedSize === s ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600 hover:border-black'} text-sm transition-colors`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={handleAddToCart} 
                                className="btn w-full mb-6 py-4 text-sm cursor-pointer select-none"
                                type="button"
                            >
                                Add to Cart
                            </button>

                            <div className="border-t border-gray-100 pt-6">
                                <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                    <ShieldCheck size={18} />
                                    <span>Includes Authenticity Digital Certificate</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <Check size={18} />
                                    <span>Free shipping on all orders</span>
                                </div>
                            </div>

                            {/* Auth Preview */}
                            <div className="mt-8 p-6 bg-gray-50 text-center">
                                <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Authenticity Guaranteed</p>
                                <div className="inline-block bg-white p-4 shadow-sm">
                                    {qrCode ? (
                                        <img src={qrCode} alt="QR Code" className="w-24 h-24" />
                                    ) : (
                                        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-xs text-gray-400">QR CODE</div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-400 mt-3">Unique code generated at checkout</p>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Reviews Section */}
                {reviews.length > 0 && (
                    <div className="mt-20 pt-12 border-t border-gray-100">
                        <h3 className="font-heading text-2xl mb-8">Customer Reviews</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {reviews.map(review => (
                                <div key={review.id} className="bg-gray-50 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium">{review.customerName}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                                    <p className="text-xs text-gray-400 mt-3">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
