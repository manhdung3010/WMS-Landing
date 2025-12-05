/**
 * Dashboard JavaScript
 * Xử lý các chức năng cho trang chủ
 */

// Handle function button clicks
function handleFunctionClick(functionName) {
    console.log('Function clicked:', functionName);
    // Có thể thêm animation hoặc loading state ở đây
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Thêm event listeners cho các nút chức năng
    const functionButtons = document.querySelectorAll('[data-function]');
    functionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const functionName = this.getAttribute('data-function');
            handleFunctionClick(functionName);
        });
    });
});

