// Checkout Component
import { db } from '../data/mockDatabase.js';
import { formatCurrency, showToast, validateEmail, validatePhone, validateRequired } from '../utils/helpers.js';
import { generateAuthCode } from '../utils/qrcode.js';

export function Checkout() {
  const cartItems = db.getCart();

  if (cartItems.length === 0) {
    window.location.hash = '/cart';
    return '';
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  setTimeout(() => setupCheckoutListeners(cartItems, total), 100);

  return `
    <section class="section">
      <div class="container" style="max-width: 1200px;">
        <h1 class="mb-8">Checkout</h1>

        <div class="grid" style="grid-template-columns: 1.5fr 1fr; gap: var(--space-8);">
          <!-- Checkout Form -->
          <div>
            <form id="checkout-form">
              <!-- Customer Information -->
              <div class="card mb-6">
                <div class="card-body">
                  <h3 class="mb-4">Customer Information</h3>
                  
                  <div class="form-group">
                    <label class="form-label">Full Name *</label>
                    <input type="text" class="form-input" id="customer-name" required>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Email *</label>
                    <input type="email" class="form-input" id="customer-email" required>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Phone Number *</label>
                    <input type="tel" class="form-input" id="customer-phone" placeholder="+258 84 123 4567" required>
                  </div>
                </div>
              </div>

              <!-- Delivery Address -->
              <div class="card mb-6">
                <div class="card-body">
                  <h3 class="mb-4">Delivery Address</h3>
                  
                  <div class="form-group">
                    <label class="form-label">Street Address *</label>
                    <input type="text" class="form-input" id="delivery-address" required>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div class="form-group">
                      <label class="form-label">City *</label>
                      <input type="text" class="form-input" id="delivery-city" required>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Postal Code</label>
                      <input type="text" class="form-input" id="delivery-postal">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Payment Method -->
              <div class="card mb-6">
                <div class="card-body">
                  <h3 class="mb-4">Payment Method</h3>
                  
                  <div class="flex flex-col gap-3">
                    <label class="flex items-center gap-3 p-4 bg-tertiary border border-color rounded-lg cursor-pointer">
                      <input type="radio" name="payment-method" value="card" checked>
                      <div>
                        <div class="font-semibold">Credit/Debit Card</div>
                        <div class="text-sm text-secondary">Pay securely with your card</div>
                      </div>
                    </label>

                    <label class="flex items-center gap-3 p-4 bg-tertiary border border-color rounded-lg cursor-pointer">
                      <input type="radio" name="payment-method" value="mpesa">
                      <div>
                        <div class="font-semibold">M-Pesa</div>
                        <div class="text-sm text-secondary">Mobile money payment</div>
                      </div>
                    </label>

                    <label class="flex items-center gap-3 p-4 bg-tertiary border border-color rounded-lg cursor-pointer">
                      <input type="radio" name="payment-method" value="cod">
                      <div>
                        <div class="font-semibold">Cash on Delivery</div>
                        <div class="text-sm text-secondary">Pay when you receive your order</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
                Place Order
              </button>
            </form>
          </div>

          <!-- Order Summary -->
          <div>
            <div class="card" style="position: sticky; top: 100px;">
              <div class="card-body">
                <h3 class="mb-4">Order Summary</h3>
                
                <div class="mb-4" style="max-height: 300px; overflow-y: auto;">
                  ${cartItems.map(item => `
                    <div class="flex gap-3 mb-3 pb-3" style="border-bottom: 1px solid var(--color-border);">
                      <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-md);">
                      <div class="flex-1">
                        <div class="font-semibold text-sm">${item.name}</div>
                        <div class="text-xs text-secondary">${item.size} / ${item.color}</div>
                        <div class="text-sm mt-1">${formatCurrency(item.price)} × ${item.quantity}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <div class="flex justify-between mb-2">
                  <span class="text-secondary">Subtotal</span>
                  <span>${formatCurrency(subtotal)}</span>
                </div>
                <div class="flex justify-between mb-4">
                  <span class="text-secondary">Shipping</span>
                  <span>${formatCurrency(shipping)}</span>
                </div>
                <div class="flex justify-between pt-4" style="border-top: 1px solid var(--color-border); font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);">
                  <span>Total</span>
                  <span>${formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function setupCheckoutListeners(cartItems, total) {
  const form = document.getElementById('checkout-form');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate form
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('delivery-address').value;
    const city = document.getElementById('delivery-city').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    if (!validateRequired(name) || !validateEmail(email) || !validatePhone(phone) || !validateRequired(address) || !validateRequired(city)) {
      showToast('Please fill in all required fields correctly', 'error');
      return;
    }

    // Generate authenticity codes for each item
    const orderItems = cartItems.map(item => ({
      ...item,
      authenticityCode: generateAuthCode()
    }));

    // Create order
    const order = {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      deliveryAddress: `${address}, ${city}`,
      items: orderItems,
      subtotal: total - 5,
      shipping: 5,
      total: total,
      paymentMethod: paymentMethod
    };

    const createdOrder = db.createOrder(order);
    db.clearCart();

    showToast('Order placed successfully!', 'success');

    // Redirect to confirmation
    setTimeout(() => {
      window.location.hash = '/';
      showToast(`Order Confirmed! Order #${createdOrder.orderNumber}`, 'success');
      console.log('Order Confirmed', createdOrder);
    }, 1000);
  });
}
