import { db } from '../data/mockDatabase.js';
import { formatCurrency } from '../utils/helpers.js';

export function Dashboard() {
    const analytics = db.getAnalytics();

    return `
        <div class="mb-8">
            <h1>Dashboard Overview</h1>
            <p class="text-secondary">Welcome back, Admin</p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-4 gap-6 mb-8">
            <div class="stat-card">
                <div class="stat-label">Total Sales</div>
                <div class="stat-value">${formatCurrency(analytics.totalSales)}</div>
                <div class="text-sm text-success">↗ +12% this week</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Orders</div>
                <div class="stat-value">${analytics.totalOrders}</div>
                <div class="text-sm text-secondary">${analytics.pendingOrders} pending</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">COD Sales</div>
                <div class="stat-value">${formatCurrency(analytics.codSales)}</div>
                <div class="text-sm text-secondary">${((analytics.codSales / analytics.totalSales) * 100).toFixed(0)}% of total</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Online Sales</div>
                <div class="stat-value">${formatCurrency(analytics.onlineSales)}</div>
                <div class="text-sm text-secondary">M-Pesa & Card</div>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-8">
            <!-- Recent Orders -->
            <div class="card">
                <div class="card-body">
                    <h3 class="mb-4">Recent Orders</h3>
                    <div class="overflow-x-auto">
                        <table style="width: 100%; text-align: left; border-collapse: collapse;">
                            <thead>
                                <tr class="text-secondary text-sm" style="border-bottom: 1px solid var(--color-border);">
                                    <th class="p-2">Order ID</th>
                                    <th class="p-2">Customer</th>
                                    <th class="p-2">Status</th>
                                    <th class="p-2 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${db.getAllOrders().slice(-5).reverse().map(order => `
                                    <tr style="border-bottom: 1px solid var(--color-border);">
                                        <td class="p-2 font-mono text-sm">${order.orderNumber}</td>
                                        <td class="p-2">${order.customerName}</td>
                                        <td class="p-2"><span class="badge badge-${getStatusColor(order.status)}">${order.status}</span></td>
                                        <td class="p-2 text-right font-medium">${formatCurrency(order.total)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4 text-center">
                        <a href="#/orders" class="btn btn-ghost btn-sm">View All Orders</a>
                    </div>
                </div>
            </div>

            <!-- Fraud Alerts -->
            <div class="card">
                <div class="card-body">
                    <div class="flex justify-between items-center mb-4">
                        <h3>Authentication Alerts</h3>
                        ${analytics.fraudAlerts > 0 ? `<span class="badge badge-error">${analytics.fraudAlerts} Issues</span>` : '<span class="badge badge-success">System Healthy</span>'}
                    </div>
                    
                    ${analytics.fraudAlerts === 0 ? `
                        <div class="text-center py-8 text-secondary">
                            <div class="text-4xl mb-2">🛡️</div>
                            <p>No fraud attempts detected.</p>
                        </div>
                    ` : `
                        <div class="flex flex-col gap-3">
                            ${db.getFraudAlerts().map(alert => `
                                <div class="p-3 bg-tertiary border border-error rounded-md flex justify-between items-center">
                                    <div>
                                        <div class="font-bold text-error">Duplicate Code Scan</div>
                                        <div class="text-xs font-mono">${alert.code}</div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-xl font-bold">${alert.duplicateAttempts}</div>
                                        <div class="text-xs text-secondary">Attempts</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
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
