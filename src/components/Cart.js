// Cart Component
import { db } from '../data/mockDatabase.js';
import { formatCurrency } from '../utils/helpers.js';

export function Cart() {
    const cartItems = db.getCart();
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 5.00 : 0;
    const total = subtotal + shipping;

    setTimeout(() => setupCartListeners(), 100);

    return `
    <section class="section">
      <div class="container" style="max-width: 1000px;">
        <h1 class="mb-8">Shopping Cart</h1>

        ${cartItems.length === 0 ? `
          <div class="text-center p-8">
            <p class="text-secondary text-lg mb-6">Your cart is empty</p>
            <a href="#/" class="btn btn-primary">Continue Shopping</a>
          </div>
        ` : `
          <div class="grid" style="grid-template-columns: 2fr 1fr; gap: var(--space-8);">
            <!-- Cart Items -->
            <div>
              ${cartItems.map(item => `
                <div class="cart-item" data-item-id="${item.id}">
                  <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                  <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-options">Size: ${item.size} | Color: ${item.color}</div>
                    <div class="flex items-center gap-4 mt-3">
                      <div class="quantity-selector">
                        <button class="quantity-btn qty-minus" data-id="${item.id}">−</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn qty-plus" data-id="${item.id}">+</button>
                      </div>
                      <button class="btn btn-ghost btn-sm remove-item" data-id="${item.id}">Remove</button>
                    </div>
                  </div>
                  <div class="cart-item-price">${formatCurrency(item.price * item.quantity)}</div>
                </div>
              `).join('')}
            </div>

            <!-- Order Summary -->
            <div>
              <div class="card">
                <div class="card-body">
                  <h3 class="mb-4">Order Summary</h3>
                  <div class="flex justify-between mb-3">
                    <span class="text-secondary">Subtotal</span>
                    <span>${formatCurrency(subtotal)}</span>
                  </div>
                  <div class="flex justify-between mb-3">
                    <span class="text-secondary">Shipping</span>
                    <span>${formatCurrency(shipping)}</span>
                  </div>
                  <div class="flex justify-between mb-6 pt-4" style="border-top: 1px solid var(--color-border); font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);">
                    <span>Total</span>
                    <span>${formatCurrency(total)}</span>
                  </div>
                  <a href="#/checkout" class="btn btn-primary btn-lg" style="width: 100%;">
                    Proceed to Checkout
                  </a>
                  <a href="#/" class="btn btn-ghost mt-3" style="width: 100%;">
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          </div>
        `}
      </div>
    </section>
  `;
}

function setupCartListeners() {
    // Quantity controls
    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const item = db.getCart().find(i => i.id === id);
            if (item && item.quantity > 1) {
                db.updateCartItem(id, item.quantity - 1);
                window.location.reload();
            }
        });
    });

    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const item = db.getCart().find(i => i.id === id);
            if (item) {
                db.updateCartItem(id, item.quantity + 1);
                window.location.reload();
            }
        });
    });

    // Remove item
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            db.removeFromCart(id);
            window.location.reload();
        });
    });
}
