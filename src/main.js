// Main Application Entry Point
import './style.css';
import './components.css';
import { router } from './utils/router.js';
import { db } from './data/mockDatabase.js';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './components/HomePage.js';
import { ProductGrid } from './components/ProductGrid.js';
import { ProductDetail } from './components/ProductDetail.js';
import { Cart } from './components/Cart.js';
import { Checkout } from './components/Checkout.js';

// Initialize app
class App {
  constructor() {
    this.init();
  }

  init() {
    // Initialize database
    db.init();

    // Render header and footer
    this.renderLayout();

    // Setup routes
    this.setupRoutes();

    // Initialize cart
    this.initCart();
  }

  renderLayout() {
    const headerEl = document.getElementById('header');
    const footerEl = document.getElementById('footer');

    if (headerEl) headerEl.innerHTML = Header();
    if (footerEl) footerEl.innerHTML = Footer();

    // Setup cart toggle
    this.setupCartToggle();
  }

  setupRoutes() {
    router.addRoute('/', () => this.renderPage(HomePage()));
    router.addRoute('/category', () => {
      const category = router.getParam('slug');
      this.renderPage(ProductGrid(category));
    });
    router.addRoute('/product', () => {
      const productId = router.getParam('id');
      this.renderPage(ProductDetail(productId));
    });
    router.addRoute('/cart', () => this.renderPage(Cart()));
    router.addRoute('/checkout', () => this.renderPage(Checkout()));
    router.addRoute('/404', () => this.renderPage('<div class="container section"><h1>404 - Page Not Found</h1></div>'));
  }

  renderPage(content) {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.innerHTML = content;
      window.scrollTo(0, 0);
    }
  }

  setupCartToggle() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.cart-button')) {
        this.toggleCart();
      }
      if (e.target.closest('.cart-backdrop')) {
        this.closeCart();
      }
    });
  }

  toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const backdrop = document.querySelector('.cart-backdrop') || this.createBackdrop();

    sidebar.classList.toggle('open');
    backdrop.classList.toggle('visible');

    if (sidebar.classList.contains('open')) {
      this.renderCartSidebar();
    }
  }

  closeCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const backdrop = document.querySelector('.cart-backdrop');

    sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('visible');
  }

  createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'cart-backdrop';
    document.body.appendChild(backdrop);
    return backdrop;
  }

  renderCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    const cartItems = db.getCart();
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    sidebar.innerHTML = `
      <div class="cart-header">
        <h3 class="cart-title">Shopping Cart</h3>
        <button class="btn-icon cart-close" onclick="document.querySelector('.cart-backdrop').click()">
          ✕
        </button>
      </div>
      <div class="cart-items">
        ${cartItems.length === 0 ? '<p class="text-secondary text-center">Your cart is empty</p>' :
        cartItems.map(item => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-options">${item.size} / ${item.color}</div>
                <div class="cart-item-price">$${item.price} × ${item.quantity}</div>
              </div>
            </div>
          `).join('')
      }
      </div>
      <div class="cart-footer">
        <div class="cart-total">
          <span>Total:</span>
          <span>$${total.toFixed(2)}</span>
        </div>
        <button class="btn btn-primary btn-lg" style="width: 100%;" onclick="window.location.hash = '/checkout'">
          Checkout
        </button>
      </div>
    `;
  }

  initCart() {
    this.updateCartCount();

    // Listen for cart updates
    window.addEventListener('cart-updated', () => {
      this.updateCartCount();
      if (document.getElementById('cart-sidebar').classList.contains('open')) {
        this.renderCartSidebar();
      }
    });
  }

  updateCartCount() {
    const cart = db.getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.cart-count');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
}

// Start the app
new App();
