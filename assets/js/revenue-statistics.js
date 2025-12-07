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
    const data = {
        labels,
        datasets: [
            {
                label: 'Thép A125',
                data: [120, 150, 110, 140],
                backgroundColor: '#1A7DD9',
                borderRadius: 6,
                maxBarThickness: 45,
                categoryPercentage: 0.45,

            },
         
            {
                label: 'Trụ sắt A541',
                data: [100, 90, 145, 115],
                backgroundColor: '#00D9FF',
                borderRadius: 6,
                maxBarThickness: 45,
                categoryPercentage: 0.45,

            },
            {
                label: 'Ống thép phi 25',
                data: [80, 95, 105, 125],
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
                tooltip: { callbacks: { label: context => `${context.dataset.label}: ${context.raw}` } }
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
                        callback: value => value.toLocaleString('vi-VN')
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderRevenueChart();
});

