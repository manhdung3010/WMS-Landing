/**
 * Sales Management JavaScript
 * Xử lý các chức năng liên quan đến quản lý bán hàng
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

// Helpers
function parseNumber(value) {
    if (!value) return 0;
    return Number(String(value).replace(/\./g, '').replace(',', '.')) || 0;
}

function formatNumber(value) {
    return Number(value || 0).toLocaleString('vi-VN');
}

// Add new sale
function addSale() {
    window.location.href = 'sales-create.html';
}

// Edit sale
function editSale(saleId) {
    window.location.href = `sales-detail.html?id=${saleId}`;
}

// Delete sale - Show modal
let currentDeleteSaleId = null;

function deleteSale(saleId, saleCode) {
    currentDeleteSaleId = saleId;
    const modal = document.getElementById('deleteModal');
    const saleCodeSpan = document.getElementById('deleteSaleCode');
    
    if (modal && saleCodeSpan) {
        saleCodeSpan.textContent = saleCode;
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
        currentDeleteSaleId = null;
    }
}

// Confirm delete
function confirmDelete() {
    if (currentDeleteSaleId) {
        console.log('Deleting sale:', currentDeleteSaleId);
        closeDeleteModal();
        showNotification('Đã xóa đơn bán hàng thành công', 'success');
    }
}

// Export to Excel
function exportToExcel() {
    showNotification('Đang xuất file Excel...', 'info');
    setTimeout(() => {
        showNotification('Xuất Excel thành công', 'success');
    }, 2000);
}

// Save sale
function saveSale() {
    showNotification('Tạo phiếu thành công', 'success');
    setTimeout(() => {
        window.location.href = 'sales.html';
    }, 1000);
}

// Add product row (for create page)
let productRowCount = 0;

function addProductRow() {
    productRowCount++;
    const tbody = document.getElementById('productTableBody');
    
    if (tbody) {
        const emptyRow = tbody.querySelector('tr td[colspan]');
        if (emptyRow && emptyRow.parentElement) {
            emptyRow.parentElement.remove();
        }
        
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-4 py-3 text-sm">${productRowCount}</td>
            <td class="px-4 py-3 text-sm">
                <input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500" placeholder="Mã sản phẩm">
            </td>
            <td class="px-4 py-3 text-sm">
                <input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500" placeholder="Tên sản phẩm">
            </td>
            <td class="px-4 py-3 text-sm">
                <input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500" placeholder="Đơn vị">
            </td>
            <td class="px-4 py-3 text-sm">
                <input type="number" class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500" placeholder="Số lượng" onchange="calculateTotal(this)">
            </td>
            <td class="px-4 py-3 text-sm">
                <input type="number" class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500" placeholder="Đơn giá" onchange="calculateTotal(this)">
            </td>
            <td class="px-4 py-3 text-sm">
                <input type="number" class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500" placeholder="Chiết khấu (%)" value="0" onchange="calculateTotal(this)">
            </td>
            <td class="px-4 py-3 text-sm">
                <input type="text" class="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100" placeholder="Thành tiền" readonly>
            </td>
            <td class="px-4 py-3 text-sm">
                <button onclick="removeProductRow(this)" class="text-danger-600 hover:text-danger-800">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
        calculateTotals();
    }
}

// Remove product row
function removeProductRow(button) {
    const row = button.closest('tr');
    if (row) {
        row.remove();
        updateRowNumbers();
        calculateTotals();
    }
}

// Update row numbers
function updateRowNumbers() {
    const tbody = document.getElementById('productTableBody');
    if (tbody) {
        const rows = tbody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const firstCell = row.querySelector('td');
            if (firstCell) {
                firstCell.textContent = index + 1;
            }
        });
    }
}

// Calculate total for product row
function calculateTotal(input) {
    const row = input.closest('tr');
    if (row) {
        const quantityInput = row.querySelector('input[type="number"][placeholder="Số lượng"]');
        const priceInput = row.querySelector('input[type="number"][placeholder="Đơn giá"]');
        const discountInput = row.querySelector('input[type="number"][placeholder="Chiết khấu (%)"]');
        const totalInput = row.querySelector('input[placeholder="Thành tiền"]');
        
        if (quantityInput && priceInput && totalInput) {
            const quantity = parseFloat(quantityInput.value) || 0;
            const price = parseFloat(priceInput.value) || 0;
            const discount = parseFloat(discountInput ? discountInput.value : 0) || 0;
            const total = quantity * price * (1 - discount / 100);
            totalInput.value = formatNumber(total);
        }
    }
    calculateTotals();
}

// Calculate totals summary
function calculateTotals() {
    const tbody = document.getElementById('productTableBody');
    let total = 0;
    if (tbody) {
        const totalInputs = tbody.querySelectorAll('input[placeholder="Thành tiền"]');
        totalInputs.forEach(input => {
            total += parseNumber(input.value);
        });
    }
    const discountInput = document.getElementById('discountAmount');
    const totalAmountInput = document.getElementById('totalAmount');
    const finalAmountInput = document.getElementById('finalAmount');

    const discount = discountInput ? parseFloat(discountInput.value) || 0 : 0;
    if (totalAmountInput) totalAmountInput.value = formatNumber(total);
    const finalValue = Math.max(total - discount, 0);
    if (finalAmountInput) finalAmountInput.value = formatNumber(finalValue);
}

// Remove product (for detail page)
function removeProduct(index) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        showNotification('Đã xóa sản phẩm khỏi đơn bán', 'success');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Auto-generate sale code if on create page
    if (window.location.pathname.includes('sales-create.html')) {
        const codeInput = document.getElementById('saleCode');
        const dateInput = document.getElementById('createdDate');
        const discountInput = document.getElementById('discountAmount');
        
        if (codeInput && !codeInput.value) {
            const now = new Date();
            const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
            const random = Math.floor(Math.random() * 1000);
            codeInput.value = `BH_${dateStr}_${random}`;
        }
        
        if (dateInput && !dateInput.value) {
            const now = new Date();
            dateInput.value = now.toISOString().slice(0, 16);
        }

        if (discountInput) {
            discountInput.addEventListener('input', calculateTotals);
        }

        calculateTotals();
    }
});

