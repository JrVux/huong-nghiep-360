# Thiết kế nâng cấp Module 3: Tra cứu tổ hợp tuyển sinh

Ngày thiết kế: 2026-07-24

## 1. Mục tiêu

Nâng cấp Module 3 để học sinh chọn một trong bốn nhóm TH1–TH4 và nhận được:

- Toàn bộ tổ hợp xét tuyển đại học gồm ba môn phù hợp với tám môn của nhóm đã chọn.
- Tối đa 5 trường đã được xác minh cho mỗi tổ hợp xét tuyển.
- Khoảng 10 ngành tiêu biểu, có xu hướng tuyển dụng tốt hoặc cơ hội việc làm cao, nhưng chỉ khi nguồn chính thức xác nhận trường xét tuyển ngành đó bằng tổ hợp tương ứng.
- Năm dữ liệu, điểm chuẩn gần nhất nếu có và đường dẫn trực tiếp đến nguồn tuyển sinh.

Luồng tương tác hiện tại gồm bước 1 và bước 2 được giữ nguyên.

## 2. Phạm vi dữ liệu

### 2.1. Năm tuyển sinh

- Ưu tiên dữ liệu tuyển sinh chính thức năm 2026.
- Nếu trường chưa công bố đủ thông tin năm 2026, được dùng dữ liệu chính thức năm 2025.
- Mỗi bản ghi phải ghi rõ năm áp dụng; không trộn dữ liệu của hai năm mà không ghi nhãn.

### 2.2. Khu vực trường

Thứ tự ưu tiên:

1. Trường hoặc cơ sở đào tạo tại TP.HCM.
2. Trường hoặc cơ sở đào tạo tại Cần Thơ.
3. Phân hiệu/cơ sở tuyển sinh của trường khác tại hai thành phố trên.
4. Trường uy tín ở khu vực phía Nam để bổ sung khi dữ liệu chưa đủ phong phú.

### 2.3. Nguồn được chấp nhận

- Trang tuyển sinh hoặc đề án tuyển sinh chính thức của trường.
- Trang thông tin chính thức của Bộ Giáo dục và Đào tạo.
- Tài liệu PDF chính thức được đăng trên tên miền của trường hoặc cơ quan quản lý.

Không dùng bài tổng hợp thương mại, diễn đàn, mạng xã hội hoặc kết quả tìm kiếm làm bằng chứng cuối cùng. Các nguồn này chỉ được dùng để tìm đầu mối rồi phải đối chiếu lại nguồn chính thức.

## 3. Quy tắc tính tổ hợp phù hợp

Mỗi TH gồm:

- Bốn môn bắt buộc: Toán, Ngữ văn, Tiếng Anh, Lịch sử.
- Bốn môn tự chọn lấy từ dữ liệu TH1, TH2, TH3 hoặc TH4.

Một tổ hợp đại học phù hợp khi và chỉ khi cả ba môn của tổ hợp đều thuộc tập tám môn của TH đã chọn.

Tên môn phải được chuẩn hóa trước khi so sánh. Các tên tương đương tối thiểu gồm:

- Văn và Ngữ văn.
- Sử và Lịch sử.
- Lý, Vật lý và Vật lí.
- Hóa và Hóa học.
- Sinh và Sinh học.
- Anh và Tiếng Anh.
- Địa và Địa lí.
- Tin và Tin học.
- GDKT&PL và Giáo dục kinh tế và pháp luật.

Mã tổ hợp phải duy nhất. Nếu nhiều nguồn mô tả cùng mã, hệ thống hợp nhất bản ghi và cảnh báo khi danh sách môn mâu thuẫn.

## 4. Cấu trúc dữ liệu tuyển sinh

Mỗi tổ hợp đại học có cấu trúc:

- `ma`: mã tổ hợp, ví dụ A00.
- `mon`: ba môn đã chuẩn hóa.
- `truong`: tối đa 5 trường.

Mỗi trường chứa:

- Tên trường.
- Thành phố/tỉnh và loại địa điểm: trụ sở, cơ sở hoặc phân hiệu.
- Website tuyển sinh chính thức.
- Năm dữ liệu.
- Danh sách ngành trường xác nhận xét bằng tổ hợp này.

Mỗi ngành chứa:

- Mã ngành và tên ngành.
- Tổ hợp xét tuyển được nguồn xác nhận.
- Điểm chuẩn gần nhất và phương thức tính điểm nếu nguồn có công bố.
- Nhóm xu hướng nghề nghiệp nếu có.
- URL nguồn trực tiếp, tiêu đề nguồn và ngày kiểm tra.

## 5. Lựa chọn trường và ngành

### 5.1. Tối đa 5 trường cho mỗi tổ hợp

Trường được xếp hạng theo:

1. Nguồn 2026 đầy đủ và trực tiếp.
2. Đúng khu vực ưu tiên.
3. Có nhiều ngành phù hợp với tổ hợp.
4. Có thông tin điểm chuẩn và đề án rõ ràng.
5. Đa dạng loại trường và nhóm ngành.

Nếu chưa đủ 5 trường đã xác minh, hệ thống hiển thị số lượng thực tế; không tạo dữ liệu giả.

### 5.2. Khoảng 10 ngành tiêu biểu

Ngành được lựa chọn từ chính danh sách ngành mà tối đa 5 trường trên công bố cho tổ hợp. Ưu tiên các nhóm:

- Trí tuệ nhân tạo, khoa học dữ liệu và khoa học máy tính.
- Công nghệ thông tin, kỹ thuật phần mềm và an toàn thông tin.
- Vi mạch, bán dẫn, điện–điện tử và tự động hóa.
- Thương mại điện tử, kinh doanh số và công nghệ tài chính.
- Logistics và quản lý chuỗi cung ứng.
- Y tế, chăm sóc sức khỏe và công nghệ sinh học khi phù hợp tổ hợp.
- Các ngành khác có tín hiệu nhu cầu việc làm tốt và phù hợp nguồn tuyển sinh.

Nhãn `Xu hướng` hoặc `Cơ hội việc làm cao` là thông tin định hướng, không phải cam kết việc làm. Nhãn phải có lý do ngắn gọn và không được dùng để thay thế điều kiện xác minh tổ hợp tuyển sinh.

## 6. Giao diện và luồng dữ liệu

### Bước 1

- Hiển thị TH1–TH4 như hiện tại.
- Khi chọn TH, hiển thị bốn môn bắt buộc, bốn môn tự chọn và tổng tám môn.

### Bước 2

- Tính lại ngay các tổ hợp đại học phù hợp.
- Mỗi thẻ tổ hợp hiển thị mã, ba môn, số trường và số ngành đã xác minh.
- Phần mở rộng của thẻ hiển thị tối đa 5 trường.
- Mỗi trường hiển thị các ngành liên quan, điểm gần nhất, năm dữ liệu và liên kết nguồn.
- Có nhãn phân biệt `Dữ liệu 2026` và `Dữ liệu 2025`.
- Có trạng thái `Chưa đủ dữ liệu chính thức` nếu tổ hợp đúng về môn nhưng chưa tìm được nguồn trường phù hợp.

Không gọi Internet khi người dùng chọn TH. Tất cả dữ liệu đã xác minh được đóng gói trong ứng dụng để trang hoạt động nhanh và ổn định.

## 7. Tách thành phần

- `subjectNormalization`: chuẩn hóa tên môn và so sánh tập môn.
- `combinationEngine`: tính các tổ hợp đại học phù hợp với một TH.
- `admissionRepository`: đọc và kiểm tra dữ liệu trường/ngành đã xác minh.
- `ranking`: chọn tối đa 5 trường và khoảng 10 ngành theo tiêu chí.
- `SubjectLookup`: chỉ quản lý trạng thái chọn TH và trình bày kết quả.

Việc tách này giảm logic trong component hiện tại và cho phép kiểm thử độc lập.

## 8. Kiểm tra dữ liệu và xử lý lỗi

Quá trình build hoặc kiểm thử phải phát hiện:

- Tổ hợp không có đúng ba môn.
- Mã tổ hợp trùng nhưng môn mâu thuẫn.
- Ngành không có URL nguồn chính thức.
- Năm dữ liệu không phải 2025 hoặc 2026.
- Một trường vượt giới hạn 5 trường trong kết quả cuối.
- Ngành được gắn vào tổ hợp nhưng nguồn không xác nhận tổ hợp đó.
- Điểm chuẩn thiếu phương thức hoặc thang điểm khi dữ liệu có thể gây hiểu nhầm.

Giao diện không bị lỗi nếu điểm chuẩn hoặc một trường chưa có dữ liệu; thay vào đó hiển thị trạng thái rõ ràng.

## 9. Kiểm thử chấp nhận

1. Chọn từng TH1–TH4 và xác nhận mọi tổ hợp trả về đều có ba môn thuộc tám môn của TH.
2. A00 chỉ xuất hiện khi có Toán, Vật lí và Hóa học.
3. B00 chỉ xuất hiện khi có Toán, Hóa học và Sinh học.
4. A01 chỉ xuất hiện khi có Toán, Vật lí và Tiếng Anh.
5. Các tổ hợp chứa Ngữ văn hoặc Lịch sử không bị bỏ sót do khác tên.
6. Mỗi tổ hợp hiển thị không quá 5 trường.
7. Mỗi ngành/trường hiển thị năm và URL nguồn chính thức.
8. Dữ liệu 2026 được ưu tiên hơn 2025 khi cùng trường/ngành/tổ hợp.
9. Module hoạt động khi máy không có Internet.
10. Build, lint và toàn bộ kiểm thử tự động đều đạt.

## 10. Ngoài phạm vi

- Thu thập dữ liệu tự động theo thời gian thực.
- Backend, cơ sở dữ liệu hoặc tài khoản quản trị.
- Cam kết xếp hạng chất lượng trường hay mức lương sau tốt nghiệp.
- Dự đoán điểm chuẩn tương lai.
- Hiển thị dữ liệu chưa được đối chiếu với nguồn chính thức.
