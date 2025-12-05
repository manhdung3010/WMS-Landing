/**
 * WMS - Main JavaScript File
 * Chứa các hàm chung cho toàn bộ ứng dụng
 */

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }
}

// Toggle Search Section
function toggleSearch() {
    const searchSection = document.getElementById('searchSection');
    const arrow = document.getElementById('searchArrow');
    if (searchSection && arrow) {
        searchSection.classList.toggle('hidden');
        arrow.classList.toggle('fa-chevron-down');
        arrow.classList.toggle('fa-chevron-up');
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date(date));
}

// Show notification
function showNotification(message, type = 'info') {
    // Tạo notification element
    const notification = document.createElement('div');
    
    // Icons cho từng loại thông báo
    const icons = {
        success: '<i class="fas fa-check-circle mr-2"></i>',
        error: '<i class="fas fa-exclamation-circle mr-2"></i>',
        warning: '<i class="fas fa-exclamation-triangle mr-2"></i>',
        info: '<i class="fas fa-info-circle mr-2"></i>'
    };
    
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-xl z-50 flex items-center animate-slide-in ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        type === 'warning' ? 'bg-yellow-500' :
        'bg-blue-500'
    } text-white min-w-[300px]`;
    
    notification.innerHTML = `
        ${icons[type] || icons.info}
        <span class="flex-1">${message}</span>
        <button onclick="this.parentElement.remove()" class="ml-4 hover:opacity-80">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
        notification.style.animation = 'slide-out 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Thêm các event listeners chung ở đây
    console.log('WMS System Loaded');
});

