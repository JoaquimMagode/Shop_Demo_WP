import { db } from '../data/mockDatabase.js';
import { formatCurrency, showToast, createElement } from '../utils/helpers.js';
import { generateAuthCode } from '../utils/qrcode.js';

export function ProductManager() {
    const products = db.getAllProducts();

    // Defer event listeners until after render
    setTimeout(() => setupProductManagerListeners(), 100);

    return `
        <div class="flex justify-between items-center mb-8">
            <h1>Product Management</h1>
            <button class="btn btn-primary" id="add-product-btn">
                <span>+</span> Add New Product
            </button>
        </div>

        <div class="card">
            <div class="card-body">
                <table style="width: 100%; text-align: left; border-collapse: collapse;">
                    <thead>
                        <tr class="text-secondary text-sm" style="border-bottom: 1px solid var(--color-border);">
                            <th class="p-4">Product</th>
                            <th class="p-4">Category</th>
                            <th class="p-4">Price</th>
                            <th class="p-4">Stock</th>
                            <th class="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="product-list-body">
                        ${renderProductRows(products)}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Add/Edit Product Modal -->
        <div id="product-modal" class="modal hidden" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: var(--z-modal); display: none; align-items: center; justify-content: center;">
            <div class="card p-8" style="width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto;">
                <h2 class="mb-6" id="modal-title">Add Product</h2>
                <form id="product-form">
                    <input type="hidden" id="product-id">
                    
                    <div class="form-group">
                        <label class="form-label">Product Name</label>
                        <input type="text" id="product-name" class="form-input" required>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="form-group">
                            <label class="form-label">Category</label>
                            <select id="product-category" class="form-select" required>
                                <option value="daily-wear">Daily Wear</option>
                                <option value="gym">Gym</option>
                                <option value="oversized">Oversized</option>
                                <option value="paintable">Paintable</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Price</label>
                            <input type="number" id="product-price" class="form-input" step="0.01" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea id="product-description" class="form-textarea" required></textarea>
                    </div>

                    <div class="flex justify-end gap-3 mt-6">
                        <button type="button" class="btn btn-secondary" id="cancel-product-btn">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Product</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function renderProductRows(products) {
    return products.map(product => {
        const totalStock = product.inventory?.reduce((sum, i) => sum + i.quantity, 0) || 0;
        return `
            <tr style="border-bottom: 1px solid var(--color-border);">
                <td class="p-4">
                    <div class="flex items-center gap-3">
                        <img src="${product.images[0]}" alt="" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;">
                        <span class="font-medium">${product.name}</span>
                    </div>
                </td>
                <td class="p-4 text-sm text-secondary">${product.category}</td>
                <td class="p-4 font-medium">${formatCurrency(product.price)}</td>
                <td class="p-4">
                    <span class="badge badge-${totalStock > 10 ? 'success' : totalStock > 0 ? 'warning' : 'error'}">
                        ${totalStock} Units
                    </span>
                </td>
                <td class="p-4 text-right">
                    <button class="btn btn-ghost btn-sm edit-product" data-id="${product.id}">Edit</button>
                    <button class="btn btn-ghost btn-sm text-error delete-product" data-id="${product.id}">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

function setupProductManagerListeners() {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');

    // Add Product
    document.getElementById('add-product-btn').addEventListener('click', () => {
        document.getElementById('modal-title').textContent = 'Add Product';
        form.reset();
        document.getElementById('product-id').value = '';
        modal.style.display = 'flex';
    });

    // Cancel
    document.getElementById('cancel-product-btn').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Save
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('product-id').value;
        const productData = {
            name: document.getElementById('product-name').value,
            category: document.getElementById('product-category').value,
            price: parseFloat(document.getElementById('product-price').value),
            description: document.getElementById('product-description').value,
            // For demo simplicity, we preserve existing images/inventory or add defaults
            images: ['/daily_tshirt_black_1767121283944.png'], // Default placeholder
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Black', hex: '#000000' }],
            inventory: []
        };

        if (id) {
            // Update existing
            const existing = db.getProductById(id);
            db.updateProduct(id, { ...existing, ...productData });
            showToast('Product updated', 'success');
        } else {
            // Create new
            db.addProduct(productData);
            showToast('Product created', 'success');
        }

        modal.style.display = 'none';
        // Re-render list
        document.getElementById('product-list-body').innerHTML = renderProductRows(db.getAllProducts());
        attachRowListeners();
    });

    attachRowListeners();
}

function attachRowListeners() {
    const modal = document.getElementById('product-modal');

    // Edit buttons
    document.querySelectorAll('.edit-product').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = db.getProductById(btn.dataset.id);
            if (product) {
                document.getElementById('modal-title').textContent = 'Edit Product';
                document.getElementById('product-id').value = product.id;
                document.getElementById('product-name').value = product.name;
                document.getElementById('product-category').value = product.category;
                document.getElementById('product-price').value = product.price;
                document.getElementById('product-description').value = product.description;
                modal.style.display = 'flex';
            }
        });
    });

    // Delete buttons
    document.querySelectorAll('.delete-product').forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this product?')) {
                db.deleteProduct(btn.dataset.id);
                showToast('Product deleted', 'success');
                document.getElementById('product-list-body').innerHTML = renderProductRows(db.getAllProducts());
                attachRowListeners();
            }
        });
    });
}
