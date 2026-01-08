# StreetCore - Premium Streetwear E-commerce Demo

A fully functional e-commerce demo prototype for a modern streetwear t-shirt brand, inspired by the clean, minimalist design of luxury fashion websites like Kemo Sabe. Built with React/Vite and designed for easy migration to WordPress + WooCommerce.

## 🎯 Features

### Customer Experience
- **Clean, Minimalist Design**: Kemo Sabe-inspired aesthetic with large imagery and elegant typography
- **Responsive Layout**: Mobile-first design with seamless desktop experience
- **Product Categories**: Daily Wear, Gym, Oversized, and Paintable t-shirts
- **Advanced Product Pages**: Image galleries, size/color selection, stock levels
- **Authenticity System**: Unique QR codes and verification for each product
- **Shopping Cart**: Smooth cart drawer with quantity management
- **Secure Checkout**: Multiple payment options (Card, M-Pesa, Cash on Delivery)
- **Customer Reviews**: Product feedback and ratings system

### Admin Panel
- **Dashboard**: Sales overview, order tracking, fraud alerts
- **Order Management**: Process orders, confirm deliveries, track COD payments
- **Product Management**: Add/edit products with automatic authenticity code generation
- **Analytics**: Sales reports, best-selling products, low stock alerts
- **Anti-Fraud**: Duplicate authenticity code detection

### Technical Features
- **Mock Database**: LocalStorage-based system mimicking WordPress/WooCommerce structure
- **QR Code Generation**: Automatic authenticity verification codes
- **Responsive Design**: Clean utility-based CSS system
- **Modern Stack**: React 19, Vite, React Router
- **Easy Migration**: Data structure compatible with WooCommerce

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd Shop_Demo_WP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production
```bash
npm run build
npm run preview
```

## 📱 Demo Accounts

### Admin Access
- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `admin123`

### Test Data
The application comes pre-loaded with:
- 8 sample products across 4 categories
- Customer reviews and ratings
- Sample orders with different payment methods
- Authenticity codes for fraud detection testing

## 🛍️ Product Categories

1. **Daily Wear** - Essential everyday t-shirts
2. **Gym** - Performance athletic wear with moisture-wicking
3. **Oversized** - Streetwear silhouette with drop shoulders
4. **Paintable** - Artist canvas tees for custom designs

## 🔐 Authenticity System

Each product includes:
- Unique alphanumeric code (SC-TIMESTAMP-RANDOM)
- QR code for mobile verification
- Anti-fraud duplicate detection
- Scan tracking and analytics

### Verification Process
1. Customer receives product with authenticity tag
2. Scans QR code or enters code manually at `/verify`
3. System validates against registered sales
4. Displays verification status and sale details

## 💳 Payment Methods

- **Credit Card**: Mock payment processing
- **M-Pesa**: Mobile money integration (simulated)
- **Cash on Delivery**: Admin confirmation required

## 📊 Admin Features

### Dashboard Metrics
- Total sales (online vs COD)
- Order counts and status
- Fraud alert monitoring
- Best-selling products
- Low stock warnings

### Order Management
- View all orders with customer details
- Update order status
- Confirm COD payments
- Track delivery status

## 🎨 Design System

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Spacing**: Consistent 8px grid system

### Colors
- **Primary**: Pure white backgrounds
- **Text**: Deep black for contrast
- **Accents**: Minimal gray tones
- **Borders**: Light gray (#E8E8E8)

### Layout Principles
- Large, full-width hero images
- Generous white space
- Clean product grids
- Subtle hover animations
- Mobile-first responsive design

## 🔧 Technical Architecture

### Frontend Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── data/               # Mock database and seed data
├── utils/              # Helper functions and utilities
└── styles/             # CSS and design system
```

### Data Structure (WooCommerce Compatible)
```javascript
// Products
{
  id, name, slug, category, description, price,
  images, sizes, colors, inventory, featured,
  authenticityCode, createdAt
}

// Orders
{
  id, orderNumber, customerName, email, phone,
  deliveryAddress, items, total, paymentMethod,
  status, deliveryConfirmed, createdAt
}

// Authenticity
{
  code, productId, orderId, registeredDate,
  status, scans, duplicateAttempts
}
```

## 🚀 Migration to WordPress + WooCommerce

The demo is designed for easy migration:

1. **Database Structure**: Matches WooCommerce tables and fields
2. **Product Data**: Compatible with WooCommerce product structure
3. **Order System**: Mirrors WooCommerce order management
4. **Custom Fields**: Authenticity codes can be added as meta fields
5. **Categories**: Direct mapping to WooCommerce taxonomies

### Migration Steps
1. Export product data from mock database
2. Import into WooCommerce using CSV or API
3. Recreate custom authenticity system as WordPress plugin
4. Migrate order data and customer information
5. Implement payment gateway integrations
6. Set up admin dashboard extensions

## 📦 Dependencies

### Core
- **React 19.2.3**: UI framework
- **React Router 7.11.0**: Client-side routing
- **Vite 7.2.4**: Build tool and dev server

### UI & Icons
- **Lucide React 0.562.0**: Icon library
- **QRCode 1.5.4**: QR code generation

### Analytics
- **Chart.js 4.5.1**: Admin dashboard charts

## 🎯 Performance Features

- **Lazy Loading**: Images load on demand
- **Optimized Assets**: Compressed images and minified code
- **Fast Navigation**: Client-side routing
- **Efficient State**: LocalStorage for persistence
- **Responsive Images**: Proper sizing for all devices

## 🔒 Security Considerations

- **Input Validation**: Form data sanitization
- **XSS Protection**: Safe HTML rendering
- **Admin Authentication**: Session-based access control
- **Fraud Detection**: Authenticity code monitoring
- **Data Persistence**: Secure local storage usage

## 🌟 Future Enhancements

### Planned Features
- Real payment gateway integration
- Email notifications for orders
- Advanced product filtering
- Wishlist functionality
- Customer account system
- Inventory management alerts
- Multi-language support
- SEO optimization

### WordPress Migration
- Custom authenticity verification plugin
- WooCommerce theme development
- Payment gateway setup
- Email template customization
- Admin dashboard extensions

## 📞 Support

For questions about the demo or migration assistance:
- Review the code structure in `/src`
- Check the mock database in `/src/data`
- Examine component implementations
- Test admin features at `/admin`

## 📄 License

This is a demonstration project. All design inspiration credited to original sources. Product images are placeholders for demo purposes only.

---

**Built with ❤️ for modern streetwear brands**