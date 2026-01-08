// Helper Utilities

// ═══════════════════════════════════════════════════════════
// FORMATTING
// ═══════════════════════════════════════════════════════════

export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

export function formatDateTime(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// ═══════════════════════════════════════════════════════════
// TOAST NOTIFICATIONS
// ═══════════════════════════════════════════════════════════

export function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
    <div class="flex items-center gap-3">
      <span>${getToastIcon(type)}</span>
      <span>${message}</span>
    </div>
  `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 250ms ease-in-out';
        setTimeout(() => toast.remove(), 250);
    }, duration);
}

function getToastIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

// ═══════════════════════════════════════════════════════════
// VALIDATION
// ═══════════════════════════════════════════════════════════

export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function validatePhone(phone) {
    const re = /^\+?[\d\s-()]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 9;
}

export function validateRequired(value) {
    return value && value.trim().length > 0;
}

// ═══════════════════════════════════════════════════════════
// DOM HELPERS
// ═══════════════════════════════════════════════════════════

export function createElement(tag, className, innerHTML) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
}

export function clearElement(element) {
    if (element) {
        element.innerHTML = '';
    }
}

// ═══════════════════════════════════════════════════════════
// PERFORMANCE
// ═══════════════════════════════════════════════════════════

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ═══════════════════════════════════════════════════════════
// STARS RATING
// ═══════════════════════════════════════════════════════════

export function renderStars(rating, maxStars = 5) {
    let html = '<div class="stars">';
    for (let i = 1; i <= maxStars; i++) {
        html += `<span class="star ${i <= rating ? '' : 'empty'}">★</span>`;
    }
    html += '</div>';
    return html;
}

// ═══════════════════════════════════════════════════════════
// IMAGE LAZY LOADING
// ═══════════════════════════════════════════════════════════

export function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ═══════════════════════════════════════════════════════════
// LOCAL STORAGE HELPERS
// ═══════════════════════════════════════════════════════════

export function getFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

export function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

// ═══════════════════════════════════════════════════════════
// CATEGORY HELPERS
// ═══════════════════════════════════════════════════════════

export const CATEGORIES = {
    'daily-wear': 'Daily Wear T-Shirts',
    'gym': 'Gym T-Shirts',
    'oversized': 'Oversized T-Shirts',
    'paintable': 'Paintable T-Shirts'
};

export function getCategoryName(slug) {
    return CATEGORIES[slug] || slug;
}

export function getCategorySlug(name) {
    return Object.keys(CATEGORIES).find(key => CATEGORIES[key] === name) || name;
}
