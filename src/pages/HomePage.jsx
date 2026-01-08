import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../data/mockDatabase';
import { formatCurrency } from '../utils/helpers';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(db.getAllProducts());
    }, []);

    const categories = [
        { id: 'daily-wear', name: 'Everyday Series', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80', description: 'Essentials redefined.' },
        { id: 'gym', name: 'Performance Gym', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80', description: 'Built for the grind.' },
        { id: 'oversized', name: 'Oversized Collection', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80', description: 'Streetwear silhouette.' },
        { id: 'paintable', name: 'Artist Canvas', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80', description: 'Create your masterpiece.' }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0 bg-gray-200">
                    <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Hero" />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="relative h-full container flex items-center justify-center text-center text-white">
                    <div className="max-w-3xl">
                        <h2 className="font-heading text-6xl md:text-8xl mb-6 animate-fade-in">UNAPOLOGETICALLY<br />PREMIUM</h2>
                        <p className="text-lg md:text-xl font-light tracking-wide mb-10 max-w-lg mx-auto">
                            Luxury streetwear designed for the modern individual. Handcrafted quality, sustainable materials.
                        </p>
                        <a href="#daily-wear" className="btn btn-light cursor-pointer select-none">
                            Explore Collection
                        </a>
                    </div>
                </div>
            </section>

            {/* Categories Grid (Masonry-ish) */}
            <section className="py-24 bg-white">
                <div className="container">
                    {categories.map((cat, idx) => (
                        <div key={cat.id} id={cat.id} className={`flex flex-col md:flex-row gap-12 items-center mb-32 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="w-full md:w-1/2">
                                <div className="aspect-[3/4] overflow-hidden relative group">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 md:p-12 text-center md:text-left">
                                <h2 className="font-heading text-4xl md:text-5xl mb-4">{cat.name}</h2>
                                <p className="text-gray-500 mb-8 max-w-md">{cat.description}</p>
                                <Link to={`/category/${cat.id}`} className="inline-flex items-center gap-2 uppercase tracking-widest text-sm border-b border-black pb-1 hover:opacity-50 transition-opacity cursor-pointer">
                                    View Products <ArrowRight size={16} />
                                </Link>

                                {/* Product Preview Grid for this Category */}
                                <div className="grid grid-cols-2 gap-4 mt-12">
                                    {products.filter(p => p.category === cat.id).slice(0, 2).map(p => (
                                        <Link to={`/product/${p.id}`} key={p.id} className="group">
                                            <div className="aspect-[4/5] bg-gray-100 mb-2 overflow-hidden">
                                                <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.name} />
                                            </div>
                                            <h4 className="font-heading text-lg">{p.name}</h4>
                                            <p className="text-sm text-gray-500">{formatCurrency(p.price)}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
