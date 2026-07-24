# Thiết kế bỏ Bảng 1 và Bảng 3 khỏi trang tra cứu

## Phạm vi

- Xóa phần giao diện “Bảng 1: 36 cặp môn tự chọn → Tổ hợp xét tuyển”.
- Xóa phần giao diện “Bảng 3: Tổ hợp có môn Tin học (X, Y)”.
- Giữ nguyên “Bảng 2: Điểm chuẩn PTIT 2021–2025”.
- Xóa import, biến trung gian và thẻ nguồn tham khảo chỉ phục vụ Bảng 1 hoặc Bảng 3.

## Không thay đổi

- Quy trình chọn TH1–TH4.
- Logic tìm bộ ba môn phù hợp.
- Danh sách trường, ngành và nguồn tuyển sinh chính thức.
- Giới hạn tối đa năm trường và mười ngành đề xuất.

## Kiểm thử

- Kiểm thử trang không còn tiêu đề Bảng 1 và Bảng 3.
- Kiểm thử trang vẫn còn tiêu đề Bảng 2.
- Chạy toàn bộ test, lint và build.
