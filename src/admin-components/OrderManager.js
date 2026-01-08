import { db } from '../data/mockDatabase.js';
import { formatCurrency, showToast, formatDateTime } from '../utils/helpers.js';

export function OrderManager() {
    const orders = db.getAllOrders();

    // Defer event listeners until after render
    setTimeout(() => setupOrderManagerListeners(), 100);

    return `
        <div class="mb-8">
            <h1>Order Management</h1>
        </div>

        <div class="card">
            <div class="card-body">
                <table style="width: 100%; text-align: left; border-collapse: collapse;">
                    <thead>
                        <tr class="text-secondary text-sm" style="border-bottom: 1px solid var(--color-border);">
                            <th class="p-4">Order ID</th>
                            <th class="p-4">Date</th>
                            <th class="p-4">Customer</th>
                            <th class="p-4">Status</th>
                            <th class="p-4">Total</th>
                            <th class="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="order-list-body">
                        ${renderOrderRows(orders)}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Order Detail Modal -->
        <div id="order-modal" class="modal hidden" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: var(--z-modal); display: none; align-items: center; justify-content: center;">
            <div class="card p-8" style="width: 100%; max-width: 700px; max-height: 90vh; overflow-y: auto;">
                <div class="flex justify-between items-start mb-6">
                    <h2 id="modal-order-number">Order Details</h2>
                    <button class="btn btn-icon" id="close-order-modal">✕</button>
                </div>
                
                <div id="order-detail-content"></div>
            </div>
        </div>
    `;
}

function renderOrderRows(orders) {
    return orders.slice().reverse().map(order => `
        <tr style="border-bottom: 1px solid var(--color-border);">
            <td class="p-4 font-mono text-sm">${order.orderNumber}</td>
            <td class="p-4 text-sm text-secondary">${formatDateTime(order.createdAt)}</td>
            <td class="p-4">
                <div class="font-medium">${order.customerName}</div>
                <div class="text-xs text-secondary">${order.paymentMethod.toUpperCase()}</div>
            </td>
            <td class="p-4">
                <span class="badge badge-${getStatusColor(order.status)}">${order.status}</span>
            </td>
            <td class="p-4 font-bold text-accent">${formatCurrency(order.total)}</td>
            <td class="p-4 text-right">
                <button class="btn btn-secondary btn-sm view-order" data-id="${order.id}">View</button>
            </td>
        </tr>
    `).join('');
}

function getStatusColor(status) {
    switch (status) {
        case 'completed': return 'success';
        case 'pending': return 'warning';
        case 'processing': return 'info';
        case 'cancelled': return 'error';
        default: return 'secondary';
    }
}

function setupOrderManagerListeners() {
    const modal = document.getElementById('order-modal');

    // Close modal
    document.getElementById('close-order-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    attachRowListeners();
}

function attachRowListeners() {
    const modal = document.getElementById('order-modal');
    const content = document.getElementById('order-detail-content');

    document.querySelectorAll('.view-order').forEach(btn => {
        btn.addEventListener('click', () => {
            const order = db.getOrderById(btn.dataset.id);
            if (!order) return;

            document.getElementById('modal-order-number').textContent = `Order ${order.orderNumber}`;
            content.innerHTML = renderOrderDetail(order);

            modal.style.display = 'flex';

            // Attach listeners inside modal (e.g., Status update)
            setupModalListeners(order);
        });
    });
}

function renderOrderDetail(order) {
    return `
        <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
                <h4 class="mb-2 text-sm text-secondary">Customer Info</h4>
                <p><strong>${order.customerName}</strong></p>
                <p>${order.customerEmail}</p>
                <p>${order.customerPhone}</p>
            </div>
            <div>
                <h4 class="mb-2 text-sm text-secondary">Shipping Address</h4>
                <p>${order.deliveryAddress}</p>
            </div>
        </div>

        <div class="mb-6">
            <h4 class="mb-2 text-sm text-secondary">Order Items</h4>
            <div class="border border-color rounded-lg overflow-hidden">
                ${order.items.map(item => `
                    <div class="flex gap-4 p-3 border-b border-color">
                        <img src="${item.image}" class="w-12 h-12 object-cover rounded">
                        <div class="flex-1">
                            <div class="font-medium">${item.name}</div>
                            <div class="text-sm text-secondary">Size: ${item.size} | Color: ${item.color}</div>
                            <div class="text-xs font-mono mt-1 text-accent">Auth Code: ${item.authenticityCode}</div>
                        </div>
                        <div class="text-right">
                            <div>${formatCurrency(item.price)}</div>
                            <div class="text-secondary">x${item.quantity}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="flex justify-between items-center bg-tertiary p-4 rounded-lg mb-6">
            <div>
                <div class="text-sm text-secondary">Payment Method</div>
                <div class="font-bold">${order.paymentMethod.toUpperCase()}</div>
            </div>
            <div class="text-right">
                <div class="text-sm text-secondary">Total Amount</div>
                <div class="text-2xl font-bold text-accent">${formatCurrency(order.total)}</div>
            </div>
        </div>

        <div class="flex justify-between items-center border-t border-color pt-6">
            <div class="flex items-center gap-3">
                <label class="text-sm font-medium">Update Status:</label>
                <select id="status-select" class="form-select" style="width: auto;">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
                <button id="update-status-btn" class="btn btn-primary btn-sm">Update</button>
            </div>
            
            ${order.status === 'processing' ? `
                <button id="confirm-delivery-btn" class="btn btn-success btn-sm">Confirm Delivery</button>
            ` : ''}
        </div>
    `;
}

function setupModalListeners(order) {
    // Update Status
    document.getElementById('update-status-btn').addEventListener('click', () => {
        const newStatus = document.getElementById('status-select').value;
        db.updateOrderStatus(order.id, newStatus);
        showToast('Order status updated', 'success');
        document.getElementById('order-modal').style.display = 'none';
        document.getElementById('order-list-body').innerHTML = renderOrderRows(db.getAllOrders());
        attachRowListeners();
    });

    // Confirm Delivery
    const deliveryBtn = document.getElementById('confirm-delivery-btn');
    if (deliveryBtn) {
        deliveryBtn.addEventListener('click', () => {
            db.confirmDelivery(order.id);
            showToast('Delivery confirmed', 'success');
            document.getElementById('order-modal').style.display = 'none';
            document.getElementById('order-list-body').innerHTML = renderOrderRows(db.getAllOrders());
            attachRowListeners();
        });
    }
}
