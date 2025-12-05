# WMS - Phần mềm quản lý kho thông minh

Dự án WMS (Warehouse Management System) được xây dựng bằng HTML/CSS thuần với Tailwind CSS theo thiết kế Figma.

## Cấu trúc thư mục

```
WMS-Landing/
├── login.html              # Trang đăng nhập
├── index.html              # Trang chủ (Dashboard) với grid 8 nút chức năng
├── pages/                  # Các trang quản trị
│   ├── products.html       # Quản lý sản phẩm (Danh sách sản phẩm)
│   ├── users.html          # Quản lý người dùng
│   ├── orders.html         # Quản lý đơn hàng
│   ├── analytics.html      # Thống kê & báo cáo
│   └── settings.html       # Cài đặt hệ thống
├── assets/                 # Thư mục chứa assets
│   ├── images/             # Hình ảnh
│   ├── icons/              # Icon files
│   └── js/                 # JavaScript files
│       ├── config.js        # Cấu hình chung
│       ├── main.js          # JavaScript chính
│       ├── login.js         # Xử lý đăng nhập
│       ├── dashboard.js     # Xử lý dashboard
│       └── products.js      # Xử lý sản phẩm
├── src/
│   └── input.css           # File CSS input cho Tailwind
├── dist/
│   └── output.css          # File CSS đã được build
├── package.json            # Cấu hình npm và dependencies
├── tailwind.config.js      # Cấu hình Tailwind CSS với màu sắc
├── postcss.config.js       # Cấu hình PostCSS
└── README.md               # File hướng dẫn
```

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Build CSS (development mode với watch):
```bash
npm run build-css
```

3. Build CSS (production mode - minified):
```bash
npm run build
```

## Sử dụng

Sau khi build CSS, mở file `index.html` trong trình duyệt để xem dashboard.

## Tính năng

- ✅ **Trang đăng nhập**: Form đăng nhập với panel màu xanh đậm
- ✅ **Trang chủ**: Grid 8 nút chức năng (Sản phẩm, Phiếu nhập, Phiếu xuất, Kiểm kê, Phiếu hủy, Bán hàng, Báo cáo hàng tồn, Thống kê doanh thu)
- ✅ **Panel quy tắc nhân viên**: Hiển thị các quy tắc và thông tin liên hệ khẩn cấp
- ✅ **Sidebar Navigation**: Menu điều hướng với search bar
- ✅ **Trang sản phẩm**: Danh sách sản phẩm với bảng, tìm kiếm, phân trang
- ✅ **Responsive design**: Tương thích nhiều kích thước màn hình
- ✅ **UI/UX hiện đại**: Thiết kế theo Figma với màu xanh chủ đạo

## Công nghệ sử dụng

- HTML5
- Tailwind CSS 3.4 (với màu sắc tùy chỉnh)
- Font Awesome 6.4 (Icons)
- JavaScript (Vanilla JS)
- PostCSS
- Autoprefixer

## Màu sắc chủ đạo

Dự án sử dụng bảng màu xanh (Blue) làm chủ đạo:

- **Primary Blue**: `#2563eb` (blue-600) - Cho buttons và header
- **Dark Blue**: `#1e40af` (blue-800) - Cho sidebar và panel đăng nhập
- **Success Green**: `#16a34a` (green-600) - Cho nút "Xuất excel"
- **Danger Red**: `#dc2626` (red-600) - Cho nút "Đăng xuất"

Các màu này đã được cấu hình trong `tailwind.config.js` và có thể sử dụng qua các class:
- `bg-primary-600`, `text-primary-600`
- `bg-success-600`, `text-success-600`
- `bg-danger-600`, `text-danger-600`

## Ghi chú

- File CSS output sẽ được tạo trong thư mục `dist/` sau khi chạy lệnh build
- Đảm bảo chạy `npm run build` hoặc `npm run build-css` trước khi sử dụng
- Tất cả các trang đều sử dụng sidebar và header chung

