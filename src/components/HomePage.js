// Home Page Component
import { db } from '../data/mockDatabase.js';
import { ProductCard } from './ProductCard.js';
import { CATEGORIES } from '../utils/helpers.js';

export function HomePage() {
    const featuredProducts = db.getAllProducts().filter(p => p.featured);

    return `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content fade-in">
        <h1 class="hero-title">
          Authentic Streetwear<br>
          <span style="background: var(--color-accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Verified & Guaranteed
          </span>
        </h1>
        <p class="hero-subtitle">
          Premium T-shirts with unique QR authenticity codes. Every piece is verified, every style is original.
        </p>
        <div class="hero-cta">
          <a href="#/category/slug/daily-wear" class="btn btn-primary btn-lg">Shop Now</a>
          <a href="/verify.html" class="btn btn-outline btn-lg">Verify Authenticity</a>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section">
      <div class="container">
        <h2 class="text-center mb-8">Shop by Category</h2>
        <div class="grid grid-cols-4 gap-6">
          ${Object.entries(CATEGORIES).map(([slug, name]) => `
            <a href="#/category/slug/${slug}" class="card" style="text-decoration: none;">
              <div class="card-body text-center">
                <h3 class="card-title">${name}</h3>
                <p class="card-text">Explore collection →</p>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section bg-secondary">
      <div class="container">
        <h2 class="text-center mb-8">Featured Products</h2>
        <div class="product-grid">
          ${featuredProducts.map(product => ProductCard(product)).join('')}
        </div>
      </div>
    </section>

    <!-- Authenticity Section -->
    <section class="section">
      <div class="container">
        <div class="text-center" style="max-width: 800px; margin: 0 auto;">
          <h2 class="mb-4">Authenticity Guaranteed</h2>
          <p class="text-secondary text-lg mb-6">
            Every StreetCore product comes with a unique QR code for authenticity verification. 
            Scan to confirm your item is genuine and registered in our system.
          </p>
          <div class="flex justify-center gap-8 mt-8">
            <div class="text-center">
              <div class="text-4xl mb-2">🔒</div>
              <h4>Secure</h4>
              <p class="text-secondary text-sm">Blockchain-verified codes</p>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-2">✓</div>
              <h4>Verified</h4>
              <p class="text-secondary text-sm">Instant verification</p>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-2">🛡️</div>
              <h4>Protected</h4>
              <p class="text-secondary text-sm">Anti-fraud system</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
