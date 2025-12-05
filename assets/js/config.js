/**
 * WMS Configuration
 * Cấu hình chung cho ứng dụng
 */

const WMS_CONFIG = {
    // API Configuration
    api: {
        baseUrl: 'http://localhost:3000/api',
        timeout: 10000,
    },
    
    // App Configuration
    app: {
        name: 'WMS - Phần mềm quản lý kho thông minh',
        version: '1.0.0',
        language: 'vi',
    },
    
    // Theme Configuration
    theme: {
        primaryColor: '#2563eb',
        secondaryColor: '#1e40af',
        successColor: '#16a34a',
        dangerColor: '#dc2626',
    },
    
    // Pagination
    pagination: {
        itemsPerPage: 10,
        maxVisiblePages: 5,
    },
    
    // Date Format
    dateFormat: 'DD/MM/YYYY',
    dateTimeFormat: 'DD/MM/YYYY HH:mm',
    
    // Currency
    currency: 'VND',
    currencySymbol: '₫',
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WMS_CONFIG;
}

