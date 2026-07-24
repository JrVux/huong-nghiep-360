# Báo cáo xác minh Module 3

Ngày xác minh: 2026-07-24

## Phạm vi đã triển khai

- Giữ nguyên luồng chọn TH1–TH4.
- Chuẩn hóa tên môn trước khi so sánh.
- Chỉ nhận tổ hợp có đúng ba môn thuộc tập tám môn của TH.
- Giữ riêng các biến thể cùng mã X khi ba môn khác nhau.
- Mỗi tổ hợp hiển thị tối đa 5 trường và tối đa 10 ngành nổi bật.
- Mỗi trường/ngành có năm dữ liệu và liên kết nguồn tuyển sinh chính thức.
- Dữ liệu được đóng gói cục bộ; thao tác chọn TH không gọi Internet.

## Nguồn dữ liệu chính thức

1. Trường Đại học Mở Thành phố Hồ Chí Minh — danh mục ngành, chỉ tiêu và bộ ba môn xét tuyển năm 2026.
2. Đại học Cần Thơ — danh mục 127 mã ngành và bảng mã tổ hợp áp dụng từ năm 2026.

Dữ liệu hiện tại gồm 2 trường và 27 ngành nổi bật đã nhập. Không nhập điểm chuẩn khi nguồn đang dùng chỉ xác nhận ngành/tổ hợp hoặc chỉ tiêu.

## Độ phủ theo TH

| TH | Tổ hợp ba môn hợp lệ | Tổ hợp có dữ liệu trường/ngành | Trường đã xác minh | Bản ghi ngành nổi bật |
|---|---:|---:|---:|---:|
| TH1 | 29 | 17 | 2 | 24 |
| TH2 | 34 | 17 | 2 | 24 |
| TH3 | 32 | 19 | 2 | 22 |
| TH4 | 27 | 17 | 2 | 23 |

Số bản ghi ngành nổi bật là tổng bản ghi ngành–trường duy nhất trong phạm vi từng TH. Trên mỗi thẻ tổ hợp, giao diện giới hạn tối đa 10 đề xuất.

## Kiểm thử

- Kiểm thử chuẩn hóa bí danh tên môn.
- Kiểm thử A00, A01, B00 và điều kiện đúng ba môn.
- Kiểm thử toàn bộ dữ liệu thật TH1–TH4.
- Kiểm thử mã X trùng nhưng khác bộ môn.
- Kiểm thử tối đa 5 trường và 10 ngành.
- Kiểm thử validator nguồn, năm dữ liệu và cấu trúc môn.
- Kiểm thử render React phía máy chủ, xác nhận dữ liệu chính thức xuất hiện.
- Kiểm tra HTTP route `/subject-lookup`.
- Chạy Oxlint và Vite production build.

## Giới hạn còn lại

- Mới có hai trường chính thức; chưa đạt mức tối đa 5 trường cho mọi tổ hợp.
- Các tổ hợp chưa có nguồn phù hợp vẫn được hiển thị theo logic môn và mang trạng thái chưa đủ dữ liệu.
- Chưa nhập điểm chuẩn 2025 vì hai nguồn tổ hợp hiện tại không đồng thời cung cấp điểm chuẩn theo cùng cấu trúc.
- Chưa kiểm tra hình ảnh tương tác bằng trình duyệt điều khiển tự động do phiên làm việc không cung cấp kết nối điều khiển trình duyệt. Kiểm thử render và HTTP được dùng để xác minh kỹ thuật thay thế.
- Nhãn xu hướng là định hướng nghề nghiệp, không phải cam kết việc làm hoặc mức lương.
