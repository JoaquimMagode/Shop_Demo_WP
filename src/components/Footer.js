// Footer Component

export function Footer() {
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-section">
            <h4>StreetCore</h4>
            <p class="text-secondary">Premium streetwear with authenticity guarantee. Every piece tells a story.</p>
          </div>
          
          <div class="footer-section">
            <h4>Shop</h4>
            <div class="footer-links">
              <a href="#/category/slug/daily-wear" class="footer-link">Daily Wear</a>
              <a href="#/category/slug/gym" class="footer-link">Gym Wear</a>
              <a href="#/category/slug/oversized" class="footer-link">Oversized</a>
              <a href="#/category/slug/paintable" class="footer-link">Paintable</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h4>Support</h4>
            <div class="footer-links">
              <a href="#" class="footer-link">Contact Us</a>
              <a href="#" class="footer-link">Shipping Info</a>
              <a href="#" class="footer-link">Returns</a>
              <a href="#" class="footer-link">Size Guide</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h4>Connect</h4>
            <div class="footer-links">
              <a href="#" class="footer-link">Instagram</a>
              <a href="#" class="footer-link">Facebook</a>
              <a href="#" class="footer-link">Twitter</a>
              <a href="/admin.html" class="footer-link">Admin</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} StreetCore. All rights reserved. | Authenticity Guaranteed</p>
        </div>
      </div>
    </footer>
  `;
}
