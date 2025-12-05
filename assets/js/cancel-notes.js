/**
 * Cancel Notes Management JavaScript
 * Xử lý các chức năng liên quan đến quản lý phiếu hủy
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

// Add new cancel note
function addCancelNote() {
    window.location.href = 'cancel-note-create.html';
}

// Edit cancel note
function editCancelNote(noteId) {
    window.location.href = `cancel-note-detail.html?id=${noteId}`;
}

// Delete cancel note - Show modal
let currentDeleteNoteId = null;

function deleteCancelNote(noteId, noteCode) {
    currentDeleteNoteId = noteId;
    const modal = document.getElementById('deleteModal');
    const noteCodeSpan = document.getElementById('deleteCancelNoteCode');
    
    if (modal && noteCodeSpan) {
        noteCodeSpan.textContent = noteCode;
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
        currentDeleteNoteId = null;
    }
}

// Confirm delete
function confirmDelete() {
    if (currentDeleteNoteId) {
        // Xử lý xóa phiếu hủy
        console.log('Deleting cancel note:', currentDeleteNoteId);
        
        // Đóng modal
        closeDeleteModal();
        
        // Hiển thị thông báo thành công
        showNotification('Đã xóa phiếu hủy thành công', 'success');
        
        // In real app, you would make an API call here and reload the table
    }
}

// Export to Excel
function exportToExcel() {
    showNotification('Đang xuất file Excel...', 'info');
    setTimeout(() => {
        showNotification('Xuất Excel thành công', 'success');
    }, 2000);
}

// Save cancel note
function saveCancelNote() {
    showNotification('Tạo phiếu thành công', 'success');
    
    // Redirect back to list after 1 second
    setTimeout(() => {
        window.location.href = 'cancel-notes.html';
    }, 1000);
}

// Add product row (for create page)
let productRowCount = 0;

function addProductRow() {
    productRowCount++;
    const tbody = document.getElementById('productTableBody');
    
    if (tbody) {
        // Remove empty message if exists
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
                <input type="text" class="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100" placeholder="Thành tiền" readonly>
            </td>
            <td class="px-4 py-3 text-sm">
                <button onclick="removeProductRow(this)" class="text-danger-600 hover:text-danger-800">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    }
}

// Remove product row
function removeProductRow(button) {
    const row = button.closest('tr');
    if (row) {
        row.remove();
        updateRowNumbers();
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
        const totalInput = row.querySelector('input[placeholder="Thành tiền"]');
        
        if (quantityInput && priceInput && totalInput) {
            const quantity = parseFloat(quantityInput.value) || 0;
            const price = parseFloat(priceInput.value) || 0;
            const total = quantity * price;
            totalInput.value = total.toLocaleString('vi-VN');
        }
    }
}

// Remove product (for detail page)
function removeProduct(index) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        showNotification('Đã xóa sản phẩm khỏi phiếu hủy', 'success');
        // In real app, remove from table and update
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Auto-generate cancel note code if on create page
    if (window.location.pathname.includes('cancel-note-create.html')) {
        const codeInput = document.getElementById('cancelNoteCode');
        const nameInput = document.getElementById('cancelNoteName');
        const dateInput = document.getElementById('createdDate');
        
        if (codeInput && !codeInput.value) {
            const now = new Date();
            const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
            const random = Math.floor(Math.random() * 1000);
            codeInput.value = `PH_${dateStr}_${random}`;
        }
        
        if (nameInput && !nameInput.value) {
            const now = new Date();
            const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
            const random = Math.floor(Math.random() * 1000);
            nameInput.value = `LH_${dateStr}_${random}`;
        }
        
        if (dateInput && !dateInput.value) {
            const now = new Date();
            dateInput.value = now.toISOString().slice(0, 16);
        }
    }
});

