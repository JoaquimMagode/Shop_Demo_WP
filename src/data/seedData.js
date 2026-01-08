// Seed Data for Mock Database
// Initial product catalog and sample data

export const seedProducts = [
    // ═══════════════════════════════════════════════════════════
    // DAILY WEAR T-SHIRTS (6 products)
    // ═══════════════════════════════════════════════════════════
    {
        id: 'prod-daily-001',
        name: 'Classic Black Tee',
        slug: 'classic-black-tee',
        category: 'daily-wear',
        description: 'Premium 100% cotton t-shirt perfect for everyday wear. Soft, breathable, and built to last. Features reinforced stitching and a comfortable regular fit.',
        price: 29.99,
        images: [
            '/daily_tshirt_black_1767121283944.png',
            '/daily_tshirt_black_1767121283944.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Black', hex: '#000000' },
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Grey', hex: '#808080' }
        ],
        inventory: [
            { size: 'S', color: 'Black', quantity: 25 },
            { size: 'M', color: 'Black', quantity: 30 },
            { size: 'L', color: 'Black', quantity: 28 },
            { size: 'XL', color: 'Black', quantity: 20 },
            { size: 'XXL', color: 'Black', quantity: 15 },
        ],
        featured: true,
        authenticityCode: null,
        createdAt: '2025-12-01T00:00:00Z'
    },
    {
        id: 'prod-daily-002',
        name: 'Heather Grey Essential',
        slug: 'heather-grey-essential',
        category: 'daily-wear',
        description: 'Versatile heather grey tee that goes with everything. Made from premium tri-blend fabric for ultimate comfort and durability.',
        price: 32.99,
        images: [
            '/daily_tshirt_grey_1767121345578.png',
            '/daily_tshirt_grey_1767121345578.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Heather Grey', hex: '#B8B8B8' },
            { name: 'Charcoal', hex: '#36454F' },
            { name: 'Navy', hex: '#000080' }
        ],
        inventory: [
            { size: 'S', color: 'Heather Grey', quantity: 18 },
            { size: 'M', color: 'Heather Grey', quantity: 24 },
            { size: 'L', color: 'Heather Grey', quantity: 20 },
            { size: 'XL', color: 'Heather Grey', quantity: 16 },
            { size: 'XXL', color: 'Heather Grey', quantity: 10 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-02T00:00:00Z'
    },
    {
        id: 'prod-daily-003',
        name: 'Pure White Classic',
        slug: 'pure-white-classic',
        category: 'daily-wear',
        description: 'Crisp white tee made from organic cotton. Perfect base layer for any outfit. Pre-shrunk and colorfast.',
        price: 28.99,
        images: [
            '/daily_tshirt_black_1767121283944.png',
            '/daily_tshirt_black_1767121283944.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Cream', hex: '#FFFDD0' }
        ],
        inventory: [
            { size: 'S', color: 'White', quantity: 22 },
            { size: 'M', color: 'White', quantity: 28 },
            { size: 'L', color: 'White', quantity: 25 },
            { size: 'XL', color: 'White', quantity: 18 },
            { size: 'XXL', color: 'White', quantity: 12 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-03T00:00:00Z'
    },
    {
        id: 'prod-daily-004',
        name: 'Navy Blue Essential',
        slug: 'navy-blue-essential',
        category: 'daily-wear',
        description: 'Deep navy blue tee with a modern fit. Versatile piece that works for casual or smart-casual looks.',
        price: 31.99,
        images: [
            '/daily_tshirt_grey_1767121345578.png',
            '/daily_tshirt_grey_1767121345578.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Navy', hex: '#000080' },
            { name: 'Royal Blue', hex: '#4169E1' }
        ],
        inventory: [
            { size: 'S', color: 'Navy', quantity: 20 },
            { size: 'M', color: 'Navy', quantity: 26 },
            { size: 'L', color: 'Navy', quantity: 23 },
            { size: 'XL', color: 'Navy', quantity: 17 },
            { size: 'XXL', color: 'Navy', quantity: 11 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-04T00:00:00Z'
    },
    {
        id: 'prod-daily-005',
        name: 'Olive Green Casual',
        slug: 'olive-green-casual',
        category: 'daily-wear',
        description: 'Trendy olive green tee with a relaxed fit. Made from sustainable bamboo-cotton blend for eco-conscious consumers.',
        price: 34.99,
        images: [
            '/daily_tshirt_black_1767121283944.png',
            '/daily_tshirt_black_1767121283944.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Olive', hex: '#808000' },
            { name: 'Forest Green', hex: '#228B22' }
        ],
        inventory: [
            { size: 'S', color: 'Olive', quantity: 19 },
            { size: 'M', color: 'Olive', quantity: 24 },
            { size: 'L', color: 'Olive', quantity: 21 },
            { size: 'XL', color: 'Olive', quantity: 15 },
            { size: 'XXL', color: 'Olive', quantity: 9 },
        ],
        featured: true,
        authenticityCode: null,
        createdAt: '2025-12-05T00:00:00Z'
    },
    {
        id: 'prod-daily-006',
        name: 'Burgundy Premium',
        slug: 'burgundy-premium',
        category: 'daily-wear',
        description: 'Rich burgundy tee with premium finishing. Elevated everyday wear with subtle luxury details.',
        price: 36.99,
        images: [
            '/daily_tshirt_grey_1767121345578.png',
            '/daily_tshirt_grey_1767121345578.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Burgundy', hex: '#800020' },
            { name: 'Wine', hex: '#722F37' }
        ],
        inventory: [
            { size: 'S', color: 'Burgundy', quantity: 16 },
            { size: 'M', color: 'Burgundy', quantity: 21 },
            { size: 'L', color: 'Burgundy', quantity: 18 },
            { size: 'XL', color: 'Burgundy', quantity: 13 },
            { size: 'XXL', color: 'Burgundy', quantity: 8 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-06T00:00:00Z'
    },

    // ═══════════════════════════════════════════════════════════
    // GYM T-SHIRTS (6 products)
    // ═══════════════════════════════════════════════════════════
    {
        id: 'prod-gym-001',
        name: 'Performance Navy Tee',
        slug: 'performance-navy-tee',
        category: 'gym',
        description: 'High-performance athletic tee with moisture-wicking technology. Lightweight, breathable fabric keeps you cool during intense workouts. Anti-odor treatment.',
        price: 39.99,
        images: [
            '/gym_tshirt_navy_1767121298504.png',
            '/gym_tshirt_navy_1767121298504.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Navy', hex: '#000080' },
            { name: 'Black', hex: '#000000' },
            { name: 'Charcoal', hex: '#36454F' }
        ],
        inventory: [
            { size: 'S', color: 'Navy', quantity: 22 },
            { size: 'M', color: 'Navy', quantity: 28 },
            { size: 'L', color: 'Navy', quantity: 25 },
            { size: 'XL', color: 'Navy', quantity: 20 },
            { size: 'XXL', color: 'Navy', quantity: 14 },
        ],
        featured: true,
        authenticityCode: null,
        createdAt: '2025-12-07T00:00:00Z'
    },
    {
        id: 'prod-gym-002',
        name: 'Athletic Red Power Tee',
        slug: 'athletic-red-power-tee',
        category: 'gym',
        description: 'Bold red performance tee designed for maximum movement. Features 4-way stretch fabric and flatlock seams to prevent chafing.',
        price: 42.99,
        images: [
            '/gym_tshirt_red_1767121361229.png',
            '/gym_tshirt_red_1767121361229.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Red', hex: '#FF0000' },
            { name: 'Orange', hex: '#FF4500' }
        ],
        inventory: [
            { size: 'S', color: 'Red', quantity: 15 },
            { size: 'M', color: 'Red', quantity: 20 },
            { size: 'L', color: 'Red', quantity: 18 },
            { size: 'XL', color: 'Red', quantity: 12 },
            { size: 'XXL', color: 'Red', quantity: 8 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-08T00:00:00Z'
    },
    {
        id: 'prod-gym-003',
        name: 'Dri-Fit Black Pro',
        slug: 'dri-fit-black-pro',
        category: 'gym',
        description: 'Professional-grade black athletic tee with advanced moisture management. Ideal for high-intensity training sessions.',
        price: 44.99,
        images: [
            '/gym_tshirt_navy_1767121298504.png',
            '/gym_tshirt_navy_1767121298504.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Black', hex: '#000000' },
            { name: 'Dark Grey', hex: '#2F2F2F' }
        ],
        inventory: [
            { size: 'S', color: 'Black', quantity: 24 },
            { size: 'M', color: 'Black', quantity: 30 },
            { size: 'L', color: 'Black', quantity: 27 },
            { size: 'XL', color: 'Black', quantity: 21 },
            { size: 'XXL', color: 'Black', quantity: 16 },
        ],
        featured: true,
        authenticityCode: null,
        createdAt: '2025-12-09T00:00:00Z'
    },
    {
        id: 'prod-gym-004',
        name: 'Electric Blue Training',
        slug: 'electric-blue-training',
        category: 'gym',
        description: 'Vibrant electric blue training tee with reflective details. Perfect for outdoor workouts and night runs.',
        price: 41.99,
        images: [
            '/gym_tshirt_red_1767121361229.png',
            '/gym_tshirt_red_1767121361229.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Electric Blue', hex: '#0080FF' },
            { name: 'Cyan', hex: '#00FFFF' }
        ],
        inventory: [
            { size: 'S', color: 'Electric Blue', quantity: 18 },
            { size: 'M', color: 'Electric Blue', quantity: 23 },
            { size: 'L', color: 'Electric Blue', quantity: 20 },
            { size: 'XL', color: 'Electric Blue', quantity: 15 },
            { size: 'XXL', color: 'Electric Blue', quantity: 10 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-10T00:00:00Z'
    },
    {
        id: 'prod-gym-005',
        name: 'Neon Green Intensity',
        slug: 'neon-green-intensity',
        category: 'gym',
        description: 'High-visibility neon green performance tee. Engineered for athletes who demand both style and functionality.',
        price: 43.99,
        images: [
            '/gym_tshirt_navy_1767121298504.png',
            '/gym_tshirt_navy_1767121298504.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Neon Green', hex: '#39FF14' },
            { name: 'Lime', hex: '#32CD32' }
        ],
        inventory: [
            { size: 'S', color: 'Neon Green', quantity: 16 },
            { size: 'M', color: 'Neon Green', quantity: 21 },
            { size: 'L', color: 'Neon Green', quantity: 19 },
            { size: 'XL', color: 'Neon Green', quantity: 14 },
            { size: 'XXL', color: 'Neon Green', quantity: 9 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-11T00:00:00Z'
    },
    {
        id: 'prod-gym-006',
        name: 'White Performance Elite',
        slug: 'white-performance-elite',
        category: 'gym',
        description: 'Premium white athletic tee with UV protection and cooling technology. The ultimate in performance wear.',
        price: 46.99,
        images: [
            '/gym_tshirt_red_1767121361229.png',
            '/gym_tshirt_red_1767121361229.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Light Grey', hex: '#D3D3D3' }
        ],
        inventory: [
            { size: 'S', color: 'White', quantity: 20 },
            { size: 'M', color: 'White', quantity: 25 },
            { size: 'L', color: 'White', quantity: 22 },
            { size: 'XL', color: 'White', quantity: 17 },
            { size: 'XXL', color: 'White', quantity: 12 },
        ],
        featured: true,
        authenticityCode: null,
        createdAt: '2025-12-12T00:00:00Z'
    },

    // ═══════════════════════════════════════════════════════════
    // OVERSIZED T-SHIRTS (6 products)
    // ═══════════════════════════════════════════════════════════
    {
        id: 'prod-oversized-001',
        name: 'Oversized White Streetwear',
        slug: 'oversized-white-streetwear',
        category: 'oversized',
        description: 'Premium oversized fit for that perfect streetwear look. Drop shoulder design with extended length. Heavy-weight 100% cotton.',
        price: 44.99,
        images: [
            '/oversized_tshirt_white_1767121313513.png',
            '/oversized_tshirt_white_1767121313513.png'
        ],
        video: null,
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Black', hex: '#000000' },
            { name: 'Sand', hex: '#C2B280' }
        ],
        inventory: [
            { size: 'M', color: 'White', quantity: 20 },
            { size: 'L', color: 'White', quantity: 25 },
            { size: 'XL', color: 'White', quantity: 22 },
            { size: 'XXL', color: 'White', quantity: 18 },
        ],
        featured: true,
        authenticityCode: null,
        createdAt: '2025-12-13T00:00:00Z'
    },
    {
        id: 'prod-oversized-002',
        name: 'Oversized Beige Relaxed',
        slug: 'oversized-beige-relaxed',
        category: 'oversized',
        description: 'Relaxed oversized tee in trendy beige. Perfect for layering or wearing solo. Boxy fit with ribbed collar.',
        price: 46.99,
        images: [
            '/oversized_tshirt_white_1767121313513.png',
            '/oversized_tshirt_white_1767121313513.png'
        ],
        video: null,
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Beige', hex: '#F5F5DC' },
            { name: 'Olive', hex: '#808000' },
            { name: 'Burgundy', hex: '#800020' }
        ],
        inventory: [
            { size: 'M', color: 'Beige', quantity: 16 },
            { size: 'L', color: 'Beige', quantity: 20 },
            { size: 'XL', color: 'Beige', quantity: 18 },
            { size: 'XXL', color: 'Beige', quantity: 14 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-14T00:00:00Z'
    },
    {
        id: 'prod-oversized-003',
        name: 'Black Oversized Statement',
        slug: 'black-oversized-statement',
        category: 'oversized',
        description: 'Bold black oversized tee that makes a statement. Extra-long sleeves and dropped shoulders for the ultimate street style.',
        price: 48.99,
        images: [
            '/oversized_tshirt_white_1767121313513.png',
            '/oversized_tshirt_white_1767121313513.png'
        ],
        video: null,
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Black', hex: '#000000' },
            { name: 'Charcoal', hex: '#36454F' }
        ],
        inventory: [
            { size: 'M', color: 'Black', quantity: 22 },
            { size: 'L', color: 'Black', quantity: 27 },
            { size: 'XL', color: 'Black', quantity: 24 },
            { size: 'XXL', color: 'Black', quantity: 19 },
        ],
        featured: true,
        authenticityCode: null,
        createdAt: '2025-12-15T00:00:00Z'
    },
    {
        id: 'prod-oversized-004',
        name: 'Vintage Wash Oversized',
        slug: 'vintage-wash-oversized',
        category: 'oversized',
        description: 'Vintage-washed oversized tee with a lived-in feel. Soft, broken-in texture that gets better with every wash.',
        price: 52.99,
        images: [
            '/oversized_tshirt_white_1767121313513.png',
            '/oversized_tshirt_white_1767121313513.png'
        ],
        video: null,
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Vintage Grey', hex: '#8B8680' },
            { name: 'Faded Black', hex: '#2C2C2C' }
        ],
        inventory: [
            { size: 'M', color: 'Vintage Grey', quantity: 15 },
            { size: 'L', color: 'Vintage Grey', quantity: 19 },
            { size: 'XL', color: 'Vintage Grey', quantity: 17 },
            { size: 'XXL', color: 'Vintage Grey', quantity: 13 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-16T00:00:00Z'
    },
    {
        id: 'prod-oversized-005',
        name: 'Cream Oversized Luxury',
        slug: 'cream-oversized-luxury',
        category: 'oversized',
        description: 'Luxurious cream oversized tee made from premium organic cotton. Elevated streetwear with a sophisticated edge.',
        price: 54.99,
        images: [
            '/oversized_tshirt_white_1767121313513.png',
            '/oversized_tshirt_white_1767121313513.png'
        ],
        video: null,
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Cream', hex: '#FFFDD0' },
            { name: 'Ivory', hex: '#FFFFF0' }
        ],
        inventory: [
            { size: 'M', color: 'Cream', quantity: 18 },
            { size: 'L', color: 'Cream', quantity: 23 },
            { size: 'XL', color: 'Cream', quantity: 20 },
            { size: 'XXL', color: 'Cream', quantity: 16 },
        ],
        featured: true,
        authenticityCode: null,
        createdAt: '2025-12-17T00:00:00Z'
    },
    {
        id: 'prod-oversized-006',
        name: 'Forest Green Oversized',
        slug: 'forest-green-oversized',
        category: 'oversized',
        description: 'Rich forest green oversized tee perfect for autumn vibes. Heavyweight cotton with a relaxed, comfortable fit.',
        price: 49.99,
        images: [
            '/oversized_tshirt_white_1767121313513.png',
            '/oversized_tshirt_white_1767121313513.png'
        ],
        video: null,
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Forest Green', hex: '#228B22' },
            { name: 'Hunter Green', hex: '#355E3B' }
        ],
        inventory: [
            { size: 'M', color: 'Forest Green', quantity: 17 },
            { size: 'L', color: 'Forest Green', quantity: 21 },
            { size: 'XL', color: 'Forest Green', quantity: 19 },
            { size: 'XXL', color: 'Forest Green', quantity: 15 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-18T00:00:00Z'
    },

    // ═══════════════════════════════════════════════════════════
    // PAINTABLE T-SHIRTS (6 products)
    // ═══════════════════════════════════════════════════════════
    {
        id: 'prod-paintable-001',
        name: 'Canvas Cream Paintable',
        slug: 'canvas-cream-paintable',
        category: 'paintable',
        description: 'Artist-grade paintable t-shirt with specially treated fabric. Perfect for custom designs, fabric paints, and screen printing. Pre-washed and ready to create.',
        price: 34.99,
        images: [
            '/paintable_tshirt_cream_1767121327728.png',
            '/paintable_tshirt_cream_1767121327728.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Cream', hex: '#FFFDD0' },
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Light Grey', hex: '#D3D3D3' }
        ],
        inventory: [
            { size: 'S', color: 'Cream', quantity: 30 },
            { size: 'M', color: 'Cream', quantity: 35 },
            { size: 'L', color: 'Cream', quantity: 32 },
            { size: 'XL', color: 'Cream', quantity: 28 },
            { size: 'XXL', color: 'Cream', quantity: 20 },
        ],
        featured: true,
        authenticityCode: null,
        createdAt: '2025-12-19T00:00:00Z'
    },
    {
        id: 'prod-paintable-002',
        name: 'Pure White Art Canvas',
        slug: 'pure-white-art-canvas',
        category: 'paintable',
        description: 'Premium white canvas tee for artists and creators. Smooth surface ideal for detailed work. Heavyweight fabric holds paint beautifully.',
        price: 36.99,
        images: [
            '/paintable_tshirt_cream_1767121327728.png',
            '/paintable_tshirt_cream_1767121327728.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Natural', hex: '#FAF0E6' }
        ],
        inventory: [
            { size: 'S', color: 'White', quantity: 25 },
            { size: 'M', color: 'White', quantity: 30 },
            { size: 'L', color: 'White', quantity: 28 },
            { size: 'XL', color: 'White', quantity: 24 },
            { size: 'XXL', color: 'White', quantity: 18 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-20T00:00:00Z'
    },
    {
        id: 'prod-paintable-003',
        name: 'Light Grey Artist Tee',
        slug: 'light-grey-artist-tee',
        category: 'paintable',
        description: 'Light grey base perfect for colorful designs. Pre-treated surface ensures paint adhesion and color vibrancy.',
        price: 35.99,
        images: [
            '/paintable_tshirt_cream_1767121327728.png',
            '/paintable_tshirt_cream_1767121327728.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Light Grey', hex: '#D3D3D3' },
            { name: 'Silver', hex: '#C0C0C0' }
        ],
        inventory: [
            { size: 'S', color: 'Light Grey', quantity: 28 },
            { size: 'M', color: 'Light Grey', quantity: 33 },
            { size: 'L', color: 'Light Grey', quantity: 30 },
            { size: 'XL', color: 'Light Grey', quantity: 26 },
            { size: 'XXL', color: 'Light Grey', quantity: 19 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-21T00:00:00Z'
    },
    {
        id: 'prod-paintable-004',
        name: 'Natural Canvas Pro',
        slug: 'natural-canvas-pro',
        category: 'paintable',
        description: 'Professional-grade natural canvas tee. Unbleached organic cotton provides the perfect neutral base for artistic expression.',
        price: 38.99,
        images: [
            '/paintable_tshirt_cream_1767121327728.png',
            '/paintable_tshirt_cream_1767121327728.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Natural', hex: '#FAF0E6' },
            { name: 'Ecru', hex: '#F5F5DC' }
        ],
        inventory: [
            { size: 'S', color: 'Natural', quantity: 24 },
            { size: 'M', color: 'Natural', quantity: 29 },
            { size: 'L', color: 'Natural', quantity: 27 },
            { size: 'XL', color: 'Natural', quantity: 23 },
            { size: 'XXL', color: 'Natural', quantity: 17 },
        ],
        featured: true,
        authenticityCode: null,
        createdAt: '2025-12-22T00:00:00Z'
    },
    {
        id: 'prod-paintable-005',
        name: 'Vintage White Canvas',
        slug: 'vintage-white-canvas',
        category: 'paintable',
        description: 'Vintage-style white canvas with a slightly aged look. Perfect for retro-inspired designs and vintage aesthetics.',
        price: 37.99,
        images: [
            '/paintable_tshirt_cream_1767121327728.png',
            '/paintable_tshirt_cream_1767121327728.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Vintage White', hex: '#FDF6E3' },
            { name: 'Antique White', hex: '#FAEBD7' }
        ],
        inventory: [
            { size: 'S', color: 'Vintage White', quantity: 26 },
            { size: 'M', color: 'Vintage White', quantity: 31 },
            { size: 'L', color: 'Vintage White', quantity: 29 },
            { size: 'XL', color: 'Vintage White', quantity: 25 },
            { size: 'XXL', color: 'Vintage White', quantity: 20 },
        ],
        featured: false,
        authenticityCode: null,
        createdAt: '2025-12-23T00:00:00Z'
    },
    {
        id: 'prod-paintable-006',
        name: 'Premium Artist Canvas',
        slug: 'premium-artist-canvas',
        category: 'paintable',
        description: 'Top-tier artist canvas tee with museum-quality fabric treatment. Designed for professional artists and serious creators.',
        price: 42.99,
        images: [
            '/paintable_tshirt_cream_1767121327728.png',
            '/paintable_tshirt_cream_1767121327728.png'
        ],
        video: null,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Pure White', hex: '#FFFFFF' },
            { name: 'Canvas White', hex: '#F8F8FF' }
        ],
        inventory: [
            { size: 'S', color: 'Pure White', quantity: 22 },
            { size: 'M', color: 'Pure White', quantity: 27 },
            { size: 'L', color: 'Pure White', quantity: 25 },
            { size: 'XL', color: 'Pure White', quantity: 21 },
            { size: 'XXL', color: 'Pure White', quantity: 16 },
        ],
        featured: true,
        authenticityCode: null,
        createdAt: '2025-12-24T00:00:00Z'
    },
];

// ═══════════════════════════════════════════════════════════
// SAMPLE REVIEWS
// ═══════════════════════════════════════════════════════════

export const seedReviews = [
    {
        id: 'rev-001',
        productId: 'prod-daily-001',
        customerName: 'João Silva',
        rating: 5,
        comment: 'Perfect fit and amazing quality! The fabric is so soft and comfortable. Will definitely buy more.',
        createdAt: '2025-12-15T10:30:00Z'
    },
    {
        id: 'rev-002',
        productId: 'prod-daily-001',
        customerName: 'Maria Santos',
        rating: 5,
        comment: 'Love this tee! Great for everyday wear. The black color hasn\'t faded after multiple washes.',
        createdAt: '2025-12-18T14:20:00Z'
    },
    {
        id: 'rev-003',
        productId: 'prod-gym-001',
        customerName: 'Carlos Mendes',
        rating: 5,
        comment: 'Best gym shirt I\'ve owned. Stays dry even during intense workouts. Highly recommend!',
        createdAt: '2025-12-20T09:15:00Z'
    },
    {
        id: 'rev-004',
        productId: 'prod-gym-001',
        customerName: 'Ana Costa',
        rating: 4,
        comment: 'Great quality and fit. Only wish it came in more colors!',
        createdAt: '2025-12-22T16:45:00Z'
    },
    {
        id: 'rev-005',
        productId: 'prod-oversized-001',
        customerName: 'Pedro Alves',
        rating: 5,
        comment: 'Perfect oversized fit! Exactly what I was looking for. The quality is top-notch.',
        createdAt: '2025-12-25T11:00:00Z'
    },
    {
        id: 'rev-006',
        productId: 'prod-paintable-001',
        customerName: 'Sofia Rodrigues',
        rating: 5,
        comment: 'As an artist, this is perfect for my custom designs. The fabric holds paint really well!',
        createdAt: '2025-12-26T13:30:00Z'
    },
];

// ═══════════════════════════════════════════════════════════
// SAMPLE ORDERS
// ═══════════════════════════════════════════════════════════

export const seedOrders = [
    {
        id: 'order-001',
        orderNumber: 'ORD-1735567200000',
        customerName: 'João Silva',
        customerEmail: 'joao@example.com',
        customerPhone: '+258 84 123 4567',
        deliveryAddress: 'Av. Julius Nyerere, 123, Maputo',
        items: [
            {
                productId: 'prod-daily-001',
                productName: 'Classic Black Tee',
                size: 'M',
                color: 'Black',
                quantity: 2,
                price: 29.99,
                authenticityCode: 'SC-1735567200000-ABC123XYZ'
            }
        ],
        subtotal: 59.98,
        shipping: 5.00,
        total: 64.98,
        paymentMethod: 'card',
        status: 'completed',
        deliveryConfirmed: true,
        deliveryDate: '2025-12-28T14:30:00Z',
        createdAt: '2025-12-20T10:00:00Z'
    },
    {
        id: 'order-002',
        orderNumber: 'ORD-1735653600000',
        customerName: 'Maria Santos',
        customerEmail: 'maria@example.com',
        customerPhone: '+258 82 987 6543',
        deliveryAddress: 'Rua da Resistência, 456, Matola',
        items: [
            {
                productId: 'prod-gym-001',
                productName: 'Performance Navy Tee',
                size: 'L',
                color: 'Navy',
                quantity: 1,
                price: 39.99,
                authenticityCode: 'SC-1735653600000-DEF456UVW'
            }
        ],
        subtotal: 39.99,
        shipping: 5.00,
        total: 44.99,
        paymentMethod: 'mpesa',
        status: 'processing',
        deliveryConfirmed: false,
        createdAt: '2025-12-25T15:00:00Z'
    },
    {
        id: 'order-003',
        orderNumber: 'ORD-1735740000000',
        customerName: 'Carlos Mendes',
        customerEmail: 'carlos@example.com',
        customerPhone: '+258 86 555 1234',
        deliveryAddress: 'Av. Eduardo Mondlane, 789, Beira',
        items: [
            {
                productId: 'prod-oversized-001',
                productName: 'Oversized White Streetwear',
                size: 'XL',
                color: 'White',
                quantity: 1,
                price: 44.99,
                authenticityCode: 'SC-1735740000000-GHI789RST'
            }
        ],
        subtotal: 44.99,
        shipping: 8.00,
        total: 52.99,
        paymentMethod: 'cod',
        status: 'pending',
        deliveryConfirmed: false,
        createdAt: '2025-12-28T09:00:00Z'
    },
];
