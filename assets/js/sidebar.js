/**
 * Sidebar Component
 * Tạo sidebar động cho tất cả các trang
 */

function renderSidebar(currentPage = '', isRootPage = false) {
    const basePath = isRootPage ? './pages/' : '';
    const homePath = isRootPage ? './index.html' : '../index.html';
    
    const menuItems = [
        { id: 'home', name: 'Trang chủ', icon: 'fa-home', href: homePath, hasSubIcon: false },
        { id: 'products', name: 'Sản phẩm', icon: 'fa-cube', href: basePath + 'products.html', hasSubIcon: false },
        { id: 'import-notes', name: 'Phiếu nhập', icon: 'fa-file-alt', href: basePath + 'import-notes.html', hasSubIcon: true, subIcon: 'fa-arrow-down' },
        { id: 'export-notes', name: 'Phiếu xuất', icon: 'fa-file-alt', href: basePath + 'export-notes.html', hasSubIcon: true, subIcon: 'fa-arrow-up' },
        { id: 'inventory-check', name: 'Kiểm kê', icon: 'fa-clipboard-check', href: basePath + 'inventory-check.html', hasSubIcon: false },
        { id: 'cancel-notes', name: 'Phiếu hủy', icon: 'fa-file-alt', href: basePath + 'cancel-notes.html', hasSubIcon: true, subIcon: 'fa-times' },
        { id: 'sales', name: 'Bán hàng', icon: 'fa-truck', href: basePath + 'sales.html', hasSubIcon: false },
        { id: 'inventory-report', name: 'Báo cáo hàng tồn', icon: 'fa-boxes', href: basePath + 'inventory-report.html', hasSubIcon: false },
        { id: 'revenue-statistics', name: 'Thống kê doanh thu', icon: 'fa-boxes', href: basePath + 'revenue-statistics.html', hasSubIcon: true, subIcon: 'fa-arrow-trend-up' }
    ];

    let sidebarHTML = `
        <!-- Search Bar -->
        <div class="p-4 border-b border-primary-400">
            <div class="flex items-center bg-primary-800 border border-white rounded-lg px-3 py-2">
                <input type="text" placeholder="Search" class="bg-primary-800 text-white placeholder-gray-300 flex-1 outline-none text-sm">
                <i class="fas fa-search text-white cursor-pointer"></i>
            </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="py-2">
    `;

    menuItems.forEach(item => {
        const isActive = currentPage === item.id;
        const activeClass = isActive ? 'bg-primary-700' : '';
        
        sidebarHTML += `
            <a href="${item.href}" class="flex items-center justify-between px-4 py-3 ${activeClass} hover:bg-primary-600 transition-colors">
                <div class="flex items-center space-x-3">
        `;
        
        if (item.hasSubIcon) {
            sidebarHTML += `
                    <div class="relative">
                        <i class="fas ${item.icon} text-lg"></i>
                        <i class="fas ${item.subIcon} text-xs absolute -top-1 -right-1"></i>
                    </div>
            `;
        } else {
            sidebarHTML += `<i class="fas ${item.icon} text-lg"></i>`;
        }
        
        sidebarHTML += `
                    <span>${item.name}</span>
                </div>
                <i class="fas fa-chevron-right text-sm"></i>
            </a>
        `;
    });

    sidebarHTML += `
        </nav>
    `;

    return sidebarHTML;
}

// Render sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        // Get current page from URL
        const currentPath = window.location.pathname;
        const isRootPage = !currentPath.includes('/pages/');
        let currentPage = '';
        
        if (currentPath.includes('products.html') || currentPath.includes('product-detail.html')) {
            currentPage = 'products';
        } else if (currentPath.includes('import-notes.html') || currentPath.includes('import-note')) {
            currentPage = 'import-notes';
        } else if (currentPath.includes('export-notes.html') || currentPath.includes('export-note')) {
            currentPage = 'export-notes';
        } else if (currentPath.includes('inventory-check.html')) {
            currentPage = 'inventory-check';
        } else if (currentPath.includes('cancel-notes.html') || currentPath.includes('cancel-note')) {
            currentPage = 'cancel-notes';
        } else if (currentPath.includes('sales.html')) {
            currentPage = 'sales';
        } else if (currentPath.includes('inventory-report.html')) {
            currentPage = 'inventory-report';
        } else if (currentPath.includes('revenue-statistics.html')) {
            currentPage = 'revenue-statistics';
        } else if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
            currentPage = 'home';
        }
        
        sidebar.innerHTML = renderSidebar(currentPage, isRootPage);
    }
});

