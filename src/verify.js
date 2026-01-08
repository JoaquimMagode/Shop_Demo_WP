// Verification Page Logic
import './style.css';
import './components.css';
import { db } from './data/mockDatabase.js';
import { router } from './utils/router.js';

// Initialize DB
db.init();

document.addEventListener('DOMContentLoaded', () => {
    // Check if we have a code in the URL
    // e.g., verify.html#/verify/code/SC-123456
    router.init();

    // We can also parse the hash manually here since verify.html is a separate entry point
    handleVerificationRoute();

    // Listen for hash changes
    window.addEventListener('hashchange', handleVerificationRoute);

    // Setup manual form submission
    setupVerificationForm();
});

function handleVerificationRoute() {
    const hash = window.location.hash;
    if (hash.startsWith('#/verify/code/')) {
        const code = hash.replace('#/verify/code/', '');
        verifyCode(code);
    }
}

function setupVerificationForm() {
    const form = document.querySelector('.verification-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            const code = input.value.trim();
            if (code) {
                verifyCode(code);
            }
        });
    }
}

function verifyCode(code) {
    const resultContainer = document.getElementById('verification-result');
    const initialView = document.getElementById('initial-view');

    // Hide initial view
    if (initialView) initialView.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'block';

    // Verify against DB
    const result = db.verifyAuthenticity(code);

    if (result.valid) {
        renderValidResult(result, resultContainer);
    } else {
        renderInvalidResult(code, resultContainer);
    }
}

function renderValidResult(result, container) {
    const product = result.product;
    const order = result.order;
    const scanCount = result.scanCount;

    let warningMsg = '';
    let statusClass = 'success';
    let icon = '✓';
    let title = 'Verified Authentic';

    if (scanCount > 1) {
        warningMsg = `<div class="alert alert-warning mt-4">
            <strong>Note:</strong> This code has been scanned ${scanCount} times. 
            First scan was on ${new Date(result.firstScan).toLocaleDateString()}.
            If you are the original owner, this is normal. If you are buying second-hand, verify the seller.
        </div>`;
    }

    // High risk warning if scanned too many times
    if (scanCount > 10) {
        statusClass = 'error'; // Use error color for warning
        icon = '⚠️';
        title = 'Multiple Scans Detected';
        warningMsg = `<div class="alert alert-error mt-4">
            <strong>Warning:</strong> This code has been scanned ${scanCount} times. 
            This high number of scans is suspicious and may indicate a cloned code.
        </div>`;
    }

    container.innerHTML = `
        <div class="card p-8 text-center animate-fade-in">
            <div class="verification-badge badge-${statusClass} mb-6 mx-auto" style="width: 80px; height: 80px; border-radius: 50%; display: flex; items-center; justify-content: center; font-size: 40px;">
                ${icon}
            </div>
            
            <h1 class="mb-2">${title}</h1>
            <p class="text-secondary mb-6">Code: ${result.code}</p>

            ${warningMsg}

            <div class="product-info-card bg-tertiary p-6 rounded-lg text-left mt-8">
                <div class="flex gap-4">
                    <img src="${product.images[0]}" alt="${product.name}" class="w-24 h-24 object-cover rounded-md">
                    <div>
                        <h3 class="mb-1">${product.name}</h3>
                        <div class="text-secondary mb-2">${product.category}</div>
                        <div class="flex gap-4 text-sm">
                            <span class="badge badge-secondary">Size: ${result.item.size}</span>
                            <span class="badge badge-secondary">Color: ${result.item.color}</span>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-color">
                    <div>
                        <div class="text-sm text-secondary">Purchase Date</div>
                        <div class="font-medium">${new Date(order.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div>
                        <div class="text-sm text-secondary">Order Number</div>
                        <div class="font-mono">${order.orderNumber}</div>
                    </div>
                </div>
            </div>

            <div class="mt-8">
                <a href="/" class="btn btn-primary">Shop This Look</a>
            </div>
        </div>
    `;
}

function renderInvalidResult(code, container) {
    container.innerHTML = `
        <div class="card p-8 text-center animate-fade-in border-error">
            <div class="verification-badge badge-error mb-6 mx-auto" style="width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px;">
                ✕
            </div>
            
            <h1 class="mb-2 text-error">Verification Failed</h1>
            <p class="text-secondary mb-6">The code you scanned could not be verified in our system.</p>

            <div class="bg-tertiary p-4 rounded-lg mb-6">
                <div class="font-mono text-error">${code}</div>
            </div>

            <p class="text-sm text-secondary mb-8">
                This item may be counterfeit or the code may have been entered incorrectly.<br>
                Please check the code and try again.
            </p>

            <button onclick="window.location.reload()" class="btn btn-outline">Try Again</button>
        </div>
    `;
}
