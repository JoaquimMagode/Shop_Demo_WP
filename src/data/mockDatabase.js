// Mock Database - LocalStorage wrapper simulating WooCommerce structure
// This mimics WordPress database tables for easy migration

import { seedProducts, seedReviews, seedOrders } from './seedData.js';

class MockDatabase {
    constructor() {
        this.init();
    }

    init() {
        // Initialize tables if they don't exist
        if (!localStorage.getItem('wp_products')) {
            this.resetDatabase();
        }
    }

    resetDatabase() {
        // Safe access to imported data
        try {
            localStorage.setItem('wp_products', JSON.stringify(seedProducts));
            localStorage.setItem('wp_reviews', JSON.stringify(seedReviews));
            localStorage.setItem('wp_orders', JSON.stringify(seedOrders));
            localStorage.setItem('wp_authenticity', JSON.stringify([]));
            localStorage.setItem('wp_customers', JSON.stringify([]));
            localStorage.setItem('wp_cart', JSON.stringify([]));
        } catch (e) {
            console.error('Seed error', e);
        }
    }

    // ═══════════════════════════════════════════════════════════
    // PRODUCTS
    // ═══════════════════════════════════════════════════════════

    getAllProducts() {
        return JSON.parse(localStorage.getItem('wp_products') || '[]');
    }

    getProductById(id) {
        const products = this.getAllProducts();
        return products.find(p => p.id === id);
    }

    getProductsByCategory(category) {
        const products = this.getAllProducts();
        return products.filter(p => p.category === category);
    }

    addProduct(product) {
        const products = this.getAllProducts();
        const newProduct = {
            ...product,
            id: this.generateId(),
            createdAt: new Date().toISOString()
        };
        products.push(newProduct);
        localStorage.setItem('wp_products', JSON.stringify(products));
        return newProduct;
    }

    updateProduct(id, updates) {
        const products = this.getAllProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            localStorage.setItem('wp_products', JSON.stringify(products));
            return products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const products = this.getAllProducts();
        const filtered = products.filter(p => p.id !== id);
        localStorage.setItem('wp_products', JSON.stringify(filtered));
        return true;
    }

    updateStock(productId, size, color, quantity) {
        const product = this.getProductById(productId);
        if (product && product.inventory) {
            const item = product.inventory.find(i => i.size === size && i.color === color);
            if (item) {
                item.quantity = Math.max(0, item.quantity + quantity);
                this.updateProduct(productId, product);
                return true;
            }
        }
        return false;
    }

    // ═══════════════════════════════════════════════════════════
    // ORDERS
    // ═══════════════════════════════════════════════════════════

    getAllOrders() {
        return JSON.parse(localStorage.getItem('wp_orders') || '[]');
    }

    getOrderById(id) {
        const orders = this.getAllOrders();
        return orders.find(o => o.id === id);
    }

    createOrder(orderData) {
        const orders = this.getAllOrders();
        const newOrder = {
            ...orderData,
            id: this.generateId(),
            orderNumber: `ORD-${Date.now()}`,
            status: 'pending',
            createdAt: new Date().toISOString(),
            deliveryConfirmed: false
        };
        orders.push(newOrder);
        localStorage.setItem('wp_orders', JSON.stringify(orders));

        // Update stock
        newOrder.items.forEach(item => {
            this.updateStock(item.productId, item.size, item.color, -item.quantity);
        });

        // Register authenticity codes
        newOrder.items.forEach(item => {
            if (item.authenticityCode) {
                this.registerAuthenticity(item.authenticityCode, item.productId, newOrder.id);
            }
        });

        return newOrder;
    }

    updateOrderStatus(id, status) {
        const orders = this.getAllOrders();
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) {
            orders[index].status = status;
            orders[index].updatedAt = new Date().toISOString();
            localStorage.setItem('wp_orders', JSON.stringify(orders));
            return orders[index];
        }
        return null;
    }

    confirmDelivery(id) {
        const orders = this.getAllOrders();
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) {
            orders[index].deliveryConfirmed = true;
            orders[index].deliveryDate = new Date().toISOString();
            orders[index].status = 'completed';
            localStorage.setItem('wp_orders', JSON.stringify(orders));
            return orders[index];
        }
        return null;
    }

    // ═══════════════════════════════════════════════════════════
    // REVIEWS
    // ═══════════════════════════════════════════════════════════

    getAllReviews() {
        return JSON.parse(localStorage.getItem('wp_reviews') || '[]');
    }

    getReviewsByProduct(productId) {
        const reviews = this.getAllReviews();
        return reviews.filter(r => r.productId === productId);
    }

    addReview(review) {
        const reviews = this.getAllReviews();
        const newReview = {
            ...review,
            id: this.generateId(),
            createdAt: new Date().toISOString()
        };
        reviews.push(newReview);
        localStorage.setItem('wp_reviews', JSON.stringify(reviews));
        return newReview;
    }

    // ═══════════════════════════════════════════════════════════
    // AUTHENTICITY
    // ═══════════════════════════════════════════════════════════

    registerAuthenticity(code, productId, orderId) {
        const authenticity = JSON.parse(localStorage.getItem('wp_authenticity') || '[]');

        // Check if code already exists
        const existing = authenticity.find(a => a.code === code);
        if (existing) {
            // Mark as fraud
            existing.status = 'fraud';
            existing.duplicateAttempts = (existing.duplicateAttempts || 0) + 1;
            localStorage.setItem('wp_authenticity', JSON.stringify(authenticity));
            return { status: 'fraud', message: 'Duplicate code detected' };
        }

        const newAuth = {
            code,
            productId,
            orderId,
            registeredDate: new Date().toISOString(),
            status: 'authentic',
            scans: 0
        };
        authenticity.push(newAuth);
        localStorage.setItem('wp_authenticity', JSON.stringify(authenticity));
        return newAuth;
    }

    verifyAuthenticity(code) {
        const authenticity = JSON.parse(localStorage.getItem('wp_authenticity') || '[]');
        const record = authenticity.find(a => a.code === code);

        if (!record) {
            return {
                status: 'unregistered',
                message: 'Warning: This code has not been registered in our system'
            };
        }

        if (record.status === 'fraud') {
            return {
                status: 'fraud',
                message: 'Fraud Alert: This code has been duplicated',
                attempts: record.duplicateAttempts
            };
        }

        // Increment scan count
        record.scans += 1;
        localStorage.setItem('wp_authenticity', JSON.stringify(authenticity));

        const order = this.getOrderById(record.orderId);
        const product = this.getProductById(record.productId);

        return {
            status: 'authentic',
            message: `Authentic item — Sale registered #${order?.orderNumber} on ${new Date(record.registeredDate).toLocaleDateString()}`,
            product: product?.name,
            registeredDate: record.registeredDate,
            scans: record.scans
        };
    }

    getFraudAlerts() {
        const authenticity = JSON.parse(localStorage.getItem('wp_authenticity') || '[]');
        return authenticity.filter(a => a.status === 'fraud');
    }

    // ═══════════════════════════════════════════════════════════
    // CART
    // ═══════════════════════════════════════════════════════════

    getCart() {
        return JSON.parse(localStorage.getItem('wp_cart') || '[]');
    }

    addToCart(item) {
        const cart = this.getCart();

        // Check if item already exists with same options
        const existingIndex = cart.findIndex(
            i => i.productId === item.productId &&
                i.size === item.size &&
                i.color === item.color
        );

        if (existingIndex !== -1) {
            cart[existingIndex].quantity += item.quantity;
        } else {
            cart.push({
                ...item,
                id: this.generateId(),
                addedAt: new Date().toISOString()
            });
        }

        localStorage.setItem('wp_cart', JSON.stringify(cart));
        return cart;
    }

    updateCartItem(id, quantity) {
        const cart = this.getCart();
        const index = cart.findIndex(i => i.id === id);
        if (index !== -1) {
            if (quantity <= 0) {
                cart.splice(index, 1);
            } else {
                cart[index].quantity = quantity;
            }
            localStorage.setItem('wp_cart', JSON.stringify(cart));
        }
        return cart;
    }

    removeFromCart(id) {
        const cart = this.getCart();
        const filtered = cart.filter(i => i.id !== id);
        localStorage.setItem('wp_cart', JSON.stringify(filtered));
        return filtered;
    }

    clearCart() {
        localStorage.setItem('wp_cart', JSON.stringify([]));
        return [];
    }

    // ═══════════════════════════════════════════════════════════
    // ANALYTICS
    // ═══════════════════════════════════════════════════════════

    getAnalytics() {
        const orders = this.getAllOrders();
        const products = this.getAllProducts();

        const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
        const onlineSales = orders
            .filter(o => o.paymentMethod !== 'cod')
            .reduce((sum, order) => sum + order.total, 0);
        const codSales = orders
            .filter(o => o.paymentMethod === 'cod')
            .reduce((sum, order) => sum + order.total, 0);

        // Best selling products
        const productSales = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                if (!productSales[item.productId]) {
                    productSales[item.productId] = 0;
                }
                productSales[item.productId] += item.quantity;
            });
        });

        const bestSelling = Object.entries(productSales)
            .map(([productId, quantity]) => ({
                product: products.find(p => p.id === productId),
                quantity
            }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);

        // Low stock items
        const lowStock = products.filter(p => {
            const totalStock = p.inventory?.reduce((sum, i) => sum + i.quantity, 0) || 0;
            return totalStock < 10;
        });

        return {
            totalSales,
            onlineSales,
            codSales,
            totalOrders: orders.length,
            pendingOrders: orders.filter(o => o.status === 'pending').length,
            completedOrders: orders.filter(o => o.status === 'completed').length,
            bestSelling,
            lowStock,
            fraudAlerts: this.getFraudAlerts().length
        };
    }

    // ═══════════════════════════════════════════════════════════
    // UTILITIES
    // ═══════════════════════════════════════════════════════════

    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    generateAuthCode() {
        return `SC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }
}

// Export singleton instance
export const db = new MockDatabase();
