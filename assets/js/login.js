/**
 * Login Page JavaScript
 * Xử lý đăng nhập
 */

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validation
    if (!username || !password) {
        showNotification('Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }
    
    // Simulate login (thay thế bằng API call thực tế)
    showNotification('Đang đăng nhập...', 'info');
    
    setTimeout(() => {
        // Redirect to dashboard
        window.location.href = 'index.html';
    }, 1000);
}

// Initialize login page
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

