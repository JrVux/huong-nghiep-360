# HuongNghiep360

Ứng dụng web hướng nghiệp cho học sinh THPT với 4 module:

- Trắc nghiệm MBTI
- Trắc nghiệm Holland / RIASEC
- Tra cứu tổ hợp môn, tổ hợp xét tuyển, trường và ngành
- Gợi ý ngành CNTT và xu hướng nghề nghiệp 2026-2029

## Bản in 1 trang cho giáo viên

File in nhanh: [HUONG-DAN-PHONG-MAY.md](HUONG-DAN-PHONG-MAY.md)

Nội dung bên trong được viết ngắn gọn, đủ để in ra phát cho giáo viên/phòng máy.

## Chạy trên máy cá nhân

Yêu cầu:

- Node.js 16+
- npm

```bash
npm install
npm run dev
```

Build sản phẩm:

```bash
npm run build
```

## Cấu trúc chính

```text
huong-nghiep-app/
├── .github/workflows/deploy.yml   # GitHub Pages workflow
├── public/
├── src/
│   ├── pages/
│   ├── styles/
│   ├── data/
│   ├── hooks/
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Deploy lên GitHub Pages

Đây là cách phù hợp nhất nếu muốn gửi học sinh dùng từ xa bằng một link online.

### 1. Đưa code lên GitHub

- Tạo repository trên GitHub
- Push toàn bộ thư mục `huong-nghiep-app` lên repo đó
- Đảm bảo workflow nằm đúng ở:

```text
.github/workflows/deploy.yml
```

### 2. Bật GitHub Pages

Vào repository trên GitHub:

- `Settings`
- `Pages`
- Ở mục `Build and deployment`, chọn `Source` là `GitHub Actions`

### 3. Workflow sẽ làm gì

Workflow hiện tại đã được chuẩn bị để:

- Chạy `npm ci`
- Chạy `npm run build`
- Copy `dist/index.html` sang `dist/404.html` để React Router mở đúng khi học sinh vào thẳng một đường dẫn con
- Publish thư mục `dist` lên GitHub Pages

### 4. Link học sinh sẽ dùng

Sau khi deploy xong, GitHub sẽ tạo một link dạng:

```text
https://<username>.github.io/<repository>/
```

Mỗi lần bạn push thay đổi mới lên nhánh `main`, GitHub Pages sẽ tự cập nhật lại site.

## Lưu ý

- Nếu đổi tên repository, link Pages cũng đổi theo.
- Nếu nhánh chính không phải `main`, hãy sửa lại workflow tương ứng.
- App dùng `BrowserRouter`, nên cần giữ file `404.html` để các đường dẫn con hoạt động ổn trên GitHub Pages.
- Dữ liệu trong app chỉ mang tính tham khảo hướng nghiệp, không phải cam kết tuyệt đối.

## Tính năng

### MBTI

- 60 câu hỏi tự soạn
- 4 trục: E/I, S/N, T/F, J/P
- Kết quả trả về 1 trong 16 kiểu tính cách

### Holland / RIASEC

- 60 câu hỏi
- 6 nhóm: R, I, A, S, E, C
- Trả về top nhóm nổi bật và gợi ý ngành phù hợp

### Tra cứu tổ hợp môn

- Chọn tổ hợp lớp 10
- Xem các tổ hợp xét tuyển đại học có thể liên quan
- Xem danh sách tổ hợp có môn Tin học

### Tin học và cơ hội nghề nghiệp

- Gợi ý các ngành CNTT liên quan
- Nội dung định hướng nghề nghiệp 2026-2029
- Có nút xuất PDF ở trang kết quả

## Nguồn tham khảo

- Bộ Giáo dục & Đào tạo: https://moet.gov.vn
- Tra cứu điểm thi: https://diemthi.moet.gov.vn
- Tuyển sinh chính thức: https://tuyensinh.moet.gov.vn
