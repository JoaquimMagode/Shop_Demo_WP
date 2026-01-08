// Product Detail Component
import { db } from '../data/mockDatabase.js';
import { formatCurrency, renderStars, showToast } from '../utils/helpers.js';
import { generateAuthCode } from '../utils/qrcode.js';

export function ProductDetail(productId) {
    const product = db.getProductById(productId);

    if (!product) {
        return `
      <section class="section">
        <div class="container text-center">
          <h1>Product Not Found</h1>
          <p class="text-secondary mt-4">The product you're looking for doesn't exist.</p>
          <a href="#/" class="btn btn-primary mt-6">Back to Home</a>
        </div>
      </section>
    `;
    }

    const reviews = db.getReviewsByProduct(productId);
    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    // Setup event listeners after render
    setTimeout(() => setupProductDetailListeners(product), 100);

    return `
    <section class="product-detail">
      <div class="container">
        <div class="product-detail-grid">
          <!-- Gallery -->
          <div class="product-gallery">
            <div class="gallery-main" id="gallery-main">
              <img src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="gallery-thumbnails">
              ${product.images.map((img, idx) => `
                <div class="gallery-thumbnail ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                  <img src="${img}" alt="${product.name}">
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-detail-info">
            <div class="product-detail-header">
              <div class="product-category">${product.category.replace('-', ' ')}</div>
              <h1 class="product-detail-title">${product.name}</h1>
              <div class="product-detail-price">${formatCurrency(product.price)}</div>
              <p class="text-secondary mt-4">${product.description}</p>
            </div>

            <!-- Options -->
            <div class="product-options">
              <!-- Size Selection -->
              <div class="option-group">
                <label>Select Size</label>
                <div class="size-options" id="size-options">
                  ${product.sizes.map(size => `
                    <div class="size-option" data-size="${size}">${size}</div>
                  `).join('')}
                </div>
              </div>

              <!-- Color Selection -->
              <div class="option-group">
                <label>Select Color</label>
                <div class="color-options" id="color-options">
                  ${product.colors.map(color => `
                    <div class="color-option" data-color="${color.name}" style="background: ${color.hex};" title="${color.name}"></div>
                  `).join('')}
                </div>
              </div>

              <!-- Quantity -->
              <div class="option-group">
                <label>Quantity</label>
                <div class="quantity-selector">
                  <button class="quantity-btn" id="qty-minus">−</button>
                  <span class="quantity-value" id="qty-value">1</span>
                  <button class="quantity-btn" id="qty-plus">+</button>
                </div>
              </div>

              <!-- Stock Status -->
              <div class="stock-status">
                <span class="stock-indicator"></span>
                <span id="stock-text">Select size and color to check availability</span>
              </div>

              <!-- Add to Cart -->
              <button class="btn btn-primary btn-lg" style="width: 100%;" id="add-to-cart-btn">
                Add to Cart
              </button>
            </div>

            <!-- Authenticity -->
            <div class="authenticity-section">
              <h3 class="authenticity-title">
                <span>🔒</span>
                Authenticity Guaranteed
              </h3>
              <p class="text-secondary text-sm mb-4">
                Each product includes a unique QR code for verification. Scan after purchase to confirm authenticity.
              </p>
              <div class="text-center">
                <div class="badge badge-success">Verified Authentic Product</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="reviews-section">
          <div class="reviews-header">
            <div>
              <h2>Customer Reviews</h2>
              ${reviews.length > 0 ? `
                <div class="reviews-summary mt-4">
                  <div class="average-rating">${averageRating.toFixed(1)}</div>
                  <div>
                    ${renderStars(Math.round(averageRating))}
                    <p class="text-secondary text-sm mt-2">${reviews.length} reviews</p>
                  </div>
                </div>
              ` : '<p class="text-secondary mt-2">No reviews yet</p>'}
            </div>
          </div>

          ${reviews.length > 0 ? `
            <div class="review-list">
              ${reviews.map(review => `
                <div class="review-item">
                  <div class="review-header">
                    <div>
                      <div class="review-author">${review.customerName}</div>
                      ${renderStars(review.rating)}
                    </div>
                    <div class="review-date">${new Date(review.createdAt).toLocaleDateString()}</div>
                  </div>
                  <p class="review-text">${review.comment}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </section>
  `;
}

function setupProductDetailListeners(product) {
    let selectedSize = null;
    let selectedColor = null;
    let quantity = 1;

    // Gallery thumbnails
    document.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            document.querySelectorAll('.gallery-thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            const index = thumb.dataset.index;
            document.querySelector('#gallery-main img').src = product.images[index];
        });
    });

    // Size selection
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedSize = option.dataset.size;
            updateStock();
        });
    });

    // Color selection
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedColor = option.dataset.color;
            updateStock();
        });
    });

    // Quantity controls
    document.getElementById('qty-minus')?.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            document.getElementById('qty-value').textContent = quantity;
        }
    });

    document.getElementById('qty-plus')?.addEventListener('click', () => {
        quantity++;
        document.getElementById('qty-value').textContent = quantity;
    });

    // Add to cart
    document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
        if (!selectedSize || !selectedColor) {
            showToast('Please select size and color', 'warning');
            return;
        }

        const item = {
            productId: product.id,
            name: product.name,
            price: product.price,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
            image: product.images[0]
        };

        db.addToCart(item);
        showToast('Added to cart!', 'success');
        window.dispatchEvent(new Event('cart-updated'));
    });

    function updateStock() {
        if (!selectedSize || !selectedColor) return;

        const stockItem = product.inventory?.find(
            i => i.size === selectedSize && i.color === selectedColor
        );

        const stockText = document.getElementById('stock-text');
        const stockIndicator = document.querySelector('.stock-indicator');

        if (stockItem) {
            if (stockItem.quantity > 20) {
                stockText.textContent = `In Stock (${stockItem.quantity} available)`;
                stockIndicator.className = 'stock-indicator';
            } else if (stockItem.quantity > 0) {
                stockText.textContent = `Low Stock (${stockItem.quantity} left)`;
                stockIndicator.className = 'stock-indicator low';
            } else {
                stockText.textContent = 'Out of Stock';
                stockIndicator.className = 'stock-indicator out';
            }
        } else {
            stockText.textContent = 'Not available in this combination';
            stockIndicator.className = 'stock-indicator out';
        }
    }
}
