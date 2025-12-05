/**
 * Inventory Report Management JavaScript
 * Xử lý các chức năng liên quan đến báo cáo hàng tồn
 */

// Toggle search section
function toggleSearchSection() {
    const searchSection = document.getElementById('searchSection');
    const arrow = document.getElementById('searchArrow');
    if (searchSection && arrow) {
        searchSection.classList.toggle('hidden');
        arrow.classList.toggle('fa-chevron-down');
        arrow.classList.toggle('fa-chevron-up');
    }
}

// Add new inventory report
function addInventoryReport() {
    window.location.href = 'inventory-report-create.html';
}

// Export to Excel
function exportToExcel() {
    showNotification('Đang xuất file Excel...', 'info');
    setTimeout(() => {
        showNotification('Xuất Excel thành công', 'success');
    }, 2000);
}

// Save inventory report
function saveInventoryReport() {
    showNotification('Tạo báo cáo thành công', 'success');
    
    // Redirect back to list after 1 second
    setTimeout(() => {
        window.location.href = 'inventory-report.html';
    }, 1000);
}

// Cancel report
function cancelReport() {
    if (confirm('Bạn có chắc chắn muốn hủy báo cáo này?')) {
        window.location.href = 'inventory-report.html';
    }
}

// Calculate inventory values
function calculateInventory(row) {
    const inputs = row.querySelectorAll('input[type="number"]');
    if (inputs.length >= 4) {
        const tonCuoiThangTruoc = parseFloat(inputs[0].value) || 0;
        const nhapTrongThang = parseFloat(inputs[1].value) || 0;
        const xuatTrongThang = parseFloat(inputs[2].value) || 0;
        const tonCuoiThang = tonCuoiThangTruoc + nhapTrongThang - xuatTrongThang;
        
        // Update tồn cuối tháng (readonly)
        if (inputs[3]) {
            inputs[3].value = tonCuoiThang;
        }
        
        // Calculate giá trị tồn (giả sử đơn giá là 100.000)
        const donGia = 100000;
        const giaTriTon = tonCuoiThang * donGia;
        
        // Update giá trị tồn (readonly)
        const giaTriInput = row.querySelector('input[type="text"][readonly]');
        if (giaTriInput) {
            giaTriInput.value = giaTriTon.toLocaleString('vi-VN');
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for calculation on create page
    if (window.location.pathname.includes('inventory-report-create.html')) {
        const tbody = document.getElementById('reportTableBody');
        if (tbody) {
            const rows = tbody.querySelectorAll('tr');
            rows.forEach(row => {
                const inputs = row.querySelectorAll('input[type="number"]:not([readonly])');
                inputs.forEach(input => {
                    input.addEventListener('change', () => calculateInventory(row));
                    input.addEventListener('input', () => calculateInventory(row));
                });
            });
        }
    }
});

