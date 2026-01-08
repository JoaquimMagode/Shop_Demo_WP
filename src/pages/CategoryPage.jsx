import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../data/mockDatabase';
import { formatCurrency } from '../utils/helpers';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';

export default function CategoryPage() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('name');
    const [filterColor, setFilterColor] = useState('');
    const [filterSize, setFilterSize] = useState('');
    const [viewMode, setViewMode] = useState('grid');

    // Category display names
    const categoryNames = {
        'daily-wear': 'Daily Wear Collection',
        'gym': 'Performance Gym Collection',
        'oversized': 'Oversized Streetwear Collection',
        'paintable': 'Artist Canvas Collection'
    };

    const categoryDescriptions = {
        'daily-wear': 'Essential everyday t-shirts crafted for comfort and style. Perfect for any casual occasion.',
        'gym': 'High-performance athletic wear designed for intense workouts and active lifestyles.',
        'oversized': 'Trendy oversized fits that define modern streetwear culture and urban fashion.',
        'paintable': 'Artist-grade canvas tees ready for your creative expression and custom designs.'
    };

    useEffect(() => {
        const categoryProducts = db.getProductsByCategory(category);
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
        setLoading(false);
    }, [category]);

    useEffect(() => {
        let filtered = [...products];

        // Filter by color
        if (filterColor) {
            filtered = filtered.filter(product => 
                product.colors.some(color => color.name === filterColor)
            );
        }

        // Filter by size
        if (filterSize) {
            filtered = filtered.filter(product => 
                product.sizes.includes(filterSize)
            );
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        setFilteredProducts(filtered);
    }, [products, filterColor, filterSize, sortBy]);

    // Get unique colors and sizes from all products
    const allColors = [...new Set(products.flatMap(p => p.colors.map(c => c.name)))];
    const allSizes = [...new Set(products.flatMap(p => p.sizes))];

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-2xl mb-4">Category Not Found</h1>
                    <p className="text-gray-500 mb-8">The category you're looking for doesn't exist.</p>
                    <Link to="/" className="btn">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-12">
            <div className="container">
                {/* Category Header */}
                <div className="text-center mb-16">
                    <h1 className="font-heading text-4xl md:text-5xl mb-4">
                        {categoryNames[category] || category}
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        {categoryDescriptions[category]}
                    </p>
                    <div className="mt-8 text-sm text-gray-400">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </div>
                </div>

                {/* Filters and Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-6 border-b border-gray-100">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-4">
                        {/* Color Filter */}
                        <div className="relative">
                            <select 
                                value={filterColor} 
                                onChange={(e) => setFilterColor(e.target.value)}
                                className="appearance-none bg-white border border-gray-200 px-4 py-2 pr-8 text-sm cursor-pointer hover:border-black transition-colors"
                            >
                                <option value="">All Colors</option>
                                {allColors.map(color => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Size Filter */}
                        <div className="relative">
                            <select 
                                value={filterSize} 
                                onChange={(e) => setFilterSize(e.target.value)}
                                className="appearance-none bg-white border border-gray-200 px-4 py-2 pr-8 text-sm cursor-pointer hover:border-black transition-colors"
                            >
                                <option value="">All Sizes</option>
                                {allSizes.map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Sort and View Controls */}
                    <div className="flex items-center gap-4">
                        {/* Sort */}
                        <div className="relative">
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-white border border-gray-200 px-4 py-2 pr-8 text-sm cursor-pointer hover:border-black transition-colors"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* View Mode */}
                        <div className="flex border border-gray-200">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'} transition-colors`}
                            >
                                <Grid size={16} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'} transition-colors`}
                            >
                                <List size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Grid/List */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <Filter size={48} className="mx-auto mb-4 text-gray-300" />
                        <h3 className="font-heading text-xl mb-2">No products found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your filters to see more products.</p>
                        <button 
                            onClick={() => {
                                setFilterColor('');
                                setFilterSize('');
                            }}
                            className="btn btn-outline"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className={viewMode === 'grid' 
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
                        : 'flex flex-col gap-6'
                    }>
                        {filteredProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                viewMode={viewMode}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function ProductCard({ product, viewMode }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    if (viewMode === 'list') {
        return (
            <Link to={`/product/${product.id}`} className="flex gap-6 p-6 bg-white border border-gray-100 hover:border-gray-200 transition-colors group">
                <div className="w-32 h-40 bg-gray-100 flex-shrink-0 overflow-hidden">
                    <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>
                <div className="flex-1">
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                        {product.category.replace('-', ' ')}
                    </div>
                    <h3 className="font-heading text-xl mb-3">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                        <div className="font-heading text-lg">{formatCurrency(product.price)}</div>
                        <div className="flex gap-2">
                            {product.colors.slice(0, 3).map(color => (
                                <div 
                                    key={color.name}
                                    className="w-4 h-4 rounded-full border border-gray-200"
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                />
                            ))}
                            {product.colors.length > 3 && (
                                <div className="text-xs text-gray-400">+{product.colors.length - 3}</div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link to={`/product/${product.id}`} className="group">
            <div className="aspect-[4/5] bg-gray-100 mb-4 overflow-hidden relative">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onLoad={() => setImageLoaded(true)}
                />
                {product.featured && (
                    <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 text-xs uppercase tracking-wider">
                        Featured
                    </div>
                )}
            </div>
            
            <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {product.category.replace('-', ' ')}
            </div>
            <h3 className="font-heading text-lg mb-2 group-hover:opacity-70 transition-opacity">
                {product.name}
            </h3>
            <div className="flex items-center justify-between">
                <div className="font-heading text-lg">{formatCurrency(product.price)}</div>
                <div className="flex gap-1">
                    {product.colors.slice(0, 4).map(color => (
                        <div 
                            key={color.name}
                            className="w-3 h-3 rounded-full border border-gray-200"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>
        </Link>
    );
}