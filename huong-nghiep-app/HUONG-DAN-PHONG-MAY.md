# Hướng dẫn chạy HuongNghiep360 trong phòng máy

**Mục đích:** Cho học sinh làm bài ngay tại phòng máy, chạy cục bộ trên máy giáo viên hoặc máy chủ nội bộ.

## Cách chạy

1. Mở Terminal trong thư mục `huong-nghiep-app`.
2. Chạy:

```bash
npm install
npm run dev -- --host 0.0.0.0
```

3. Lấy địa chỉ IP của máy đang chạy app, ví dụ: `192.168.1.10`
4. Học sinh mở trình duyệt và vào:

```text
http://192.168.1.10:5173
```

## Nếu chỉ dùng trên 1 máy

Mở trực tiếp:

```text
http://localhost:5173
```

## Lưu ý

- Các máy phải cùng mạng nội bộ.
- Không tắt cửa sổ Terminal khi học sinh đang làm bài.
- Nếu đổi máy chạy app, nhớ dùng lại IP mới.

## Ghi nhớ nhanh

- `npm install`
- `npm run dev -- --host 0.0.0.0`
- Học sinh vào `http://IP:5173`

