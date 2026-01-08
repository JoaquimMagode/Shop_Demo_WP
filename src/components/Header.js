// Header Component
import { CATEGORIES } from '../utils/helpers.js';

export function Header() {
    return `
    <header class="header">
      <div class="container header-container">
        <a href="#/" class="header-logo">StreetCore</a>
        
        <nav class="header-nav">
          ${Object.entries(CATEGORIES).map(([slug, name]) => `
            <a href="#/category/slug/${slug}" class="nav-link">${name}</a>
          `).join('')}
        </nav>
        
        <div class="header-actions">
          <button class="cart-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span class="cart-count" style="display: none;">0</span>
          </button>
          
          <button class="mobile-menu-button hide-desktop">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `;
}
