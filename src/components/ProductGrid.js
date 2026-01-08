// Product Grid Component
import { db } from '../data/mockDatabase.js';
import { ProductCard } from './ProductCard.js';
import { getCategoryName } from '../utils/helpers.js';

export function ProductGrid(categorySlug) {
    const products = categorySlug ? db.getProductsByCategory(categorySlug) : db.getAllProducts();
    const categoryName = categorySlug ? getCategoryName(categorySlug) : 'All Products';

    return `
    <section class="section">
      <div class="container">
        <div class="mb-8">
          <h1 class="mb-2">${categoryName}</h1>
          <p class="text-secondary">${products.length} products available</p>
        </div>
        
        ${products.length === 0 ? `
          <div class="text-center p-8">
            <p class="text-secondary text-lg">No products found in this category.</p>
            <a href="#/" class="btn btn-primary mt-4">Back to Home</a>
          </div>
        ` : `
          <div class="product-grid">
            ${products.map(product => ProductCard(product)).join('')}
          </div>
        `}
      </div>
    </section>
  `;
}
