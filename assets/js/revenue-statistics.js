/**
 * Revenue Statistics JavaScript
 * Xử lý các chức năng liên quan đến báo cáo doanh thu
 */

function exportRevenue() {
    showNotification('Đang xuất báo cáo...', 'info');
    setTimeout(() => {
        showNotification('Xuất báo cáo thành công', 'success');
    }, 1500);
}

function renderRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx || typeof Chart === 'undefined') return;

    const labels = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
    // Dữ liệu số sản phẩm đã bán (để hiển thị trong tooltip)
    const productData = {
        'Thép A125': [120, 150, 110, 140],
        'Trụ sắt A541': [100, 90, 145, 115],
        'Ống thép phi 25': [80, 95, 105, 125]
    };
    
    // Giá mỗi sản phẩm (để tính doanh thu)
    const productPrices = {
        'Thép A125': 50000,
        'Trụ sắt A541': 45000,
        'Ống thép phi 25': 40000
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Thép A125',
                // Chuyển số sản phẩm thành số tiền (sản phẩm * giá)
                data: productData['Thép A125'].map(qty => qty * productPrices['Thép A125']),
                backgroundColor: '#1A7DD9',
                borderRadius: 6,
                maxBarThickness: 45,
                categoryPercentage: 0.45,
            },
            {
                label: 'Trụ sắt A541',
                data: productData['Trụ sắt A541'].map(qty => qty * productPrices['Trụ sắt A541']),
                backgroundColor: '#00D9FF',
                borderRadius: 6,
                maxBarThickness: 45,
                categoryPercentage: 0.45,
            },
            {
                label: 'Ống thép phi 25',
                data: productData['Ống thép phi 25'].map(qty => qty * productPrices['Ống thép phi 25']),
                backgroundColor: '#FFC300',
                borderRadius: 6,
                maxBarThickness: 45,
                categoryPercentage: 0.45,
            }
        ]
    };

    new Chart(ctx, {
        type: 'bar',
        data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: { 
                    callbacks: { 
                        label: function(context) {
                            const datasetLabel = context.dataset.label;
                            const dataIndex = context.dataIndex;
                            const productQty = productData[datasetLabel][dataIndex];
                            return `${datasetLabel}: ${productQty} sản phẩm`;
                        }
                    } 
                }
            },
            scales: {
                x: { 
                    stacked: false,
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('vi-VN') + ' đ';
                        }
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderRevenueChart();
});

