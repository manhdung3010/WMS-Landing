/**
 * Products Management JavaScript
 * Xử lý các chức năng liên quan đến quản lý sản phẩm
 */

// Toggle search section
function toggleProductSearch() {
    const searchSection = document.getElementById('productSearchSection');
    const arrow = document.getElementById('productSearchArrow');
    if (searchSection && arrow) {
        searchSection.classList.toggle('hidden');
        arrow.classList.toggle('fa-chevron-down');
        arrow.classList.toggle('fa-chevron-up');
    }
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById('productSearch');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    // Filter table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Delete product - Show modal
let currentDeleteProductId = null;

function deleteProduct(productId, productName) {
    currentDeleteProductId = productId;
    const modal = document.getElementById('deleteModal');
    const productNameSpan = document.getElementById('deleteProductName');
    
    if (modal && productNameSpan) {
        productNameSpan.textContent = productName;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// Close delete modal
function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        currentDeleteProductId = null;
    }
}

// Confirm delete
function confirmDelete() {
    if (currentDeleteProductId) {
        // Xử lý xóa sản phẩm
        console.log('Deleting product:', currentDeleteProductId);
        
        // Đóng modal
        closeDeleteModal();
        
        // Hiển thị thông báo thành công
        showNotification('Đã xóa sản phẩm thành công', 'success');
        
        // In real app, you would make an API call here and reload the table
        // For now, we'll just show the notification
    }
}

// Edit product
function editProduct(productId) {
    // Chuyển đến trang chi tiết sản phẩm với ID
    window.location.href = `product-detail.html?id=${productId}`;
}

// Export to Excel
function exportToExcel() {
    showNotification('Đang xuất file Excel...', 'info');
    // Xử lý xuất Excel
    setTimeout(() => {
        showNotification('Xuất Excel thành công', 'success');
    }, 2000);
}

// Add new product
function addProduct() {
    // Chuyển đến trang chi tiết sản phẩm (không có ID = thêm mới)
    window.location.href = 'product-detail.html';
}

// Load product data (mock function)
function loadProductData(productId) {
    // Mock data - in real app, fetch from API
    const products = {
        '100000001': {
            code: '100000001',
            name: 'Thép A125',
            unit: 'Cái',
            group: 'Vật liệu xây dựng',
            status: true
        },
        '100000002': {
            code: '100000002',
            name: 'Thép C854',
            unit: 'Cái',
            group: 'Vật liệu xây dựng',
            status: false
        },
        '100000003': {
            code: '100000003',
            name: 'Trụ sắt A541',
            unit: 'Cái',
            group: 'Vật liệu xây dựng',
            status: false
        },
        '100000004': {
            code: '100000004',
            name: 'Ống thép phi 25',
            unit: 'Thanh',
            group: 'Vật liệu xây dựng',
            status: true
        }
    };

    const product = products[productId];
    if (product) {
        const codeInput = document.getElementById('productCode');
        const nameInput = document.getElementById('productName');
        const unitSelect = document.getElementById('productUnit');
        const groupSelect = document.getElementById('productGroup');
        const statusCheckbox = document.getElementById('productStatus');
        
        if (codeInput) codeInput.value = product.code;
        if (nameInput) nameInput.value = product.name;
        if (unitSelect) unitSelect.value = product.unit;
        if (groupSelect) groupSelect.value = product.group;
        if (statusCheckbox) statusCheckbox.checked = product.status;
    }
}

// Save product function
function saveProduct() {
    const codeInput = document.getElementById('productCode');
    const nameInput = document.getElementById('productName');
    
    const code = codeInput ? codeInput.value : '';
    const name = nameInput ? nameInput.value : '';
    
    if (!code || !name) {
        showNotification('Vui lòng điền đầy đủ thông tin', 'error');
        return;
    }

    // In real app, save to API
    showNotification('Đã lưu thông tin sản phẩm thành công', 'success');
    
    // Redirect back to products list after 1 second
    setTimeout(() => {
        window.location.href = 'products.html';
    }, 1000);
}

// Initialize product detail page
function initProductDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        // Load product data (in real app, this would be an API call)
        loadProductData(productId);
    } else {
        // New product mode - clear form
        const codeInput = document.getElementById('productCode');
        const nameInput = document.getElementById('productName');
        
        if (codeInput) codeInput.value = '';
        if (nameInput) nameInput.value = '';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        initProductDetailPage();
    }
});

