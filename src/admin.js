// Admin Application Entry Point
import './style.css';
import './components.css'; // Using shared components styles
import './admin-components/admin.css'; // Admin specific styles
import { router } from './utils/router.js';
import { db } from './data/mockDatabase.js';
import { login, logout, requireAuth } from './utils/auth.js';
import { Dashboard } from './admin-components/Dashboard.js';
import { ProductManager } from './admin-components/ProductManager.js';
import { OrderManager } from './admin-components/OrderManager.js';
import { clearElement } from './utils/helpers.js';

class AdminApp {
    constructor() {
        this.init();
    }

    init() {
        db.init();
        this.setupRoutes();
        this.checkAuth();
    }

    setupRoutes() {
        // We use a different router instance or just handle hash changes manually for admin
        // Since we are reusing the same router utility, we need to be careful.
        // For simplicity in this demo, admin.html will use the same router but different routes.

        router.addRoute('/', () => this.renderDashboard());
        router.addRoute('/products', () => this.renderProductManager());
        router.addRoute('/orders', () => this.renderOrderManager());

        // Login route
        router.addRoute('/login', () => this.renderLogin());
    }

    checkAuth() {
        if (!requireAuth()) {
            window.location.hash = '/login';
        } else {
            // Render sidebar if logged in
            this.renderSidebar();
            // If on login page but authenticated, go to dashboard
            if (window.location.hash === '#/login' || window.location.hash === '') {
                window.location.hash = '/';
            }
        }
    }

    renderLogin() {
        document.getElementById('admin-dashboard').style.display = 'none';
        const loginScreen = document.getElementById('login-screen');
        loginScreen.style.display = 'flex';

        loginScreen.innerHTML = `
            <div class="admin-login-container">
                <div class="card p-8" style="width: 100%; max-width: 400px;">
                    <h2 class="text-center mb-6">Admin Login</h2>
                    <form id="login-form">
                        <div class="form-group">
                            <label class="form-label">Username</label>
                            <input type="text" id="username" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" id="password" class="form-input" required>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;

            const result = login(username, password);
            if (result.success) {
                loginScreen.style.display = 'none';
                document.getElementById('admin-dashboard').style.display = 'flex';
                this.renderSidebar();
                window.location.hash = '/';
            } else {
                alert(result.error);
            }
        });
    }

    renderSidebar() {
        const sidebar = document.getElementById('admin-sidebar');
        sidebar.innerHTML = `
            <div class="admin-sidebar-header">
                <h3>Store Admin</h3>
            </div>
            <nav class="admin-nav">
                <a href="#/" class="admin-nav-link ${this.isActive('/')}">Dashboard</a>
                <a href="#/products" class="admin-nav-link ${this.isActive('/products')}">Products</a>
                <a href="#/orders" class="admin-nav-link ${this.isActive('/orders')}">Orders</a>
                <a href="#" id="logout-btn" class="admin-nav-link text-error">Logout</a>
            </nav>
        `;

        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    isActive(path) {
        return window.location.hash === `#${path}` ? 'active' : '';
    }

    renderDashboard() {
        if (!requireAuth()) return;
        this.updateActiveLink('/');
        const content = document.getElementById('admin-content');
        content.innerHTML = Dashboard();
    }

    renderProductManager() {
        if (!requireAuth()) return;
        this.updateActiveLink('/products');
        const content = document.getElementById('admin-content');
        content.innerHTML = ProductManager();
        // Initialize Product Manager Listeners
        window.dispatchEvent(new Event('init-product-manager'));
    }

    renderOrderManager() {
        if (!requireAuth()) return;
        this.updateActiveLink('/orders');
        const content = document.getElementById('admin-content');
        content.innerHTML = OrderManager();
    }

    updateActiveLink(path) {
        document.querySelectorAll('.admin-nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${path}`) {
                link.classList.add('active');
            }
        });
    }
}

new AdminApp();
