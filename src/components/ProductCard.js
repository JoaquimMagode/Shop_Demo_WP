// Product Card Component
import { formatCurrency } from '../utils/helpers.js';

export function ProductCard(product) {
    const stockTotal = product.inventory?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    const stockStatus = stockTotal > 20 ? 'In Stock' : stockTotal > 0 ? 'Low Stock' : 'Out of Stock';
    const stockClass = stockTotal > 20 ? 'success' : stockTotal > 0 ? 'warning' : 'error';

    return `
    <div class="product-card" onclick="window.location.hash = '/product/id/${product.id}'">
      <div class="product-image-container">
        <img src="${product.images[0]}" alt="${product.name}" class="product-image">
        ${stockTotal < 10 && stockTotal > 0 ? `<span class="product-badge badge badge-warning">Low Stock</span>` : ''}
        ${product.featured ? `<span class="product-badge badge badge-info" style="top: 3rem;">Featured</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-category">${product.category.replace('-', ' ')}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">${formatCurrency(product.price)}</div>
        <div class="product-actions">
          <button class="btn btn-primary btn-sm" style="flex: 1;">View Details</button>
          <span class="badge badge-${stockClass} btn-sm">${stockStatus}</span>
        </div>
      </div>
    </div>
  `;
}
