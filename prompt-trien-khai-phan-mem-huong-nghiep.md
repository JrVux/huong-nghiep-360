# PROMPT KỸ THUẬT ĐẦY ĐỦ — PHẦN MỀM HƯỚNG NGHIỆP HỌC SINH THPT (2026)

> Tài liệu này là **bản đặc tả kỹ thuật kiêm "master prompt"** để đưa cho một AI coding agent (Claude Code, Cursor, v.v.) hoặc một lập trình viên triển khai trực tiếp. Đã tích hợp dữ liệu thực tế trích xuất từ 4 ảnh bạn cung cấp + dữ liệu tra cứu internet (đến 2026).

---

## 0. TỔNG QUAN HỆ THỐNG

**Tên gợi ý:** HuongNghiep360 / OrientAI

**Mục tiêu:** Một web app (có thể làm PWA để dùng trên điện thoại) giúp học sinh THPT (đặc biệt học sinh THPT Cà Mau) tự khám phá bản thân (MBTI, Holland) và tra cứu ngành/trường phù hợp với tổ hợp môn đã chọn, kèm dự báo nghề nghiệp đến 2029.

**4 module chức năng:**
1. Trắc nghiệm MBTI (tính cách) → gợi ý định hướng phù hợp bối cảnh 2026
2. Trắc nghiệm Holland/RIASEC (sở thích nghề nghiệp) → gợi ý định hướng phù hợp bối cảnh 2026
3. Tra cứu "Tổ hợp môn → Ngành có thể học → Trường có thể xét tuyển" (dựa trên 4 tổ hợp lớp 10 của THPT Cà Mau + 36 tổ hợp thi TN THPT chương trình 2+2)
4. Tra cứu "Học Tin học → ngành nào, cơ hội nghề nghiệp dự báo 2029"

**Nguyên tắc thiết kế dữ liệu:** Tách biệt hoàn toàn 3 lớp dữ liệu:
- Lớp **tĩnh** (câu hỏi trắc nghiệm, công thức tính điểm) — nhúng cứng trong app, không đổi theo năm.
- Lớp **bán tĩnh** (bảng tổ hợp môn, quy chế thi 2+2, danh mục tổ hợp xét tuyển) — để trong file JSON riêng, dễ cập nhật mỗi năm khi Bộ GD&ĐT đổi quy chế.
- Lớp **động** (điểm chuẩn, chỉ tiêu, dự báo nghề nghiệp) — nên có cơ chế cập nhật hàng năm (import từ file Excel/CSV do người quản trị — ví dụ bạn — tải lên), **không hard-code điểm chuẩn vĩnh viễn** vì điểm chuẩn đổi mỗi năm.

---

## 1. DỮ LIỆU ĐÃ TRÍCH XUẤT TỪ ẢNH (đưa thẳng vào seed data)

### 1.1. Tổ hợp môn lớp 10 — THPT Cà Mau (tuyển sinh 2026–2027, ảnh 4)
Trường có 27 lớp, học sinh chọn 1 trong 4 tổ hợp môn lựa chọn (cộng với các môn bắt buộc: Ngữ văn, Toán, Tiếng Anh, Lịch sử, GDQP-AN, HĐ trải nghiệm hướng nghiệp, GD địa phương):

| Tổ hợp | Môn lựa chọn | Cụm chuyên đề học tập | Số lớp |
|---|---|---|---|
| TH1 | Lý – Hóa – Sinh | Hóa – Sinh – CNNN (Công nghệ nông nghiệp) | 7 |
| TH2 | Tin – Hóa – Sinh | GDKT&PL – Tin – Sinh | 7 |
| TH3 | Lý – Tin – Địa | GDKT&PL – Lý – Tin | 6 |
| TH4 | Lý – Địa – CNCN (Công nghệ công nghiệp) | Lý – Hóa – Địa | 6 |
(Hồ sơ đăng ký được ưu tiên tối đa 4 nguyện vọng tổ hợp; nếu tổ hợp NV1 không đủ chỉ tiêu sẽ chuyển NV2, NV3...)

### 1.2. 36 cách chọn môn thi Tốt nghiệp THPT chương trình 2+2 và tổ hợp xét tuyển tương ứng (ảnh 1)
Toàn bộ 36 dòng dữ liệu (STT, 2 môn tự chọn thi TN cùng Toán+Văn bắt buộc, 3 mã tổ hợp xét ĐH khả dụng) đã được số hóa — xem file `data/to_hop_36.json` (cấu trúc mô tả ở mục 3.1). Ví dụ ánh xạ tổ hợp học sinh Cà Mau có thể dùng:

- **TH2 (Tin-Hóa-Sinh)** → thi TN chọn "Hóa học, Sinh học" (dòng 6, tổ hợp B00/B03/C02/C08) **hoặc** kết hợp Tin học với Hóa/Sinh để mở thêm các tổ hợp có môn Tin (B03, X10, X14…).
- **TH3 (Lý-Tin-Địa)** → có thể thi "Vật lí, Tin học" (dòng 15: C01/X02/X06/X59) hoặc "Tin học, Địa lí" (dòng 22: B03/X01/B04/X66 — lưu ý bảng gốc ghi theo cột Sinh-Địa, cần đối chiếu lại quy chế năm thi thực tế) hoặc "Vật lí, Địa lí" (dòng 35: C01/C04/A04/C09).
- **TH4 (Lý-Địa-CNCN)** → "Vật lí, Địa lí" (dòng 35) hoặc "Vật lí, Công nghệ công nghiệp" (dòng 13-14 nhóm C01/X03/X04...).

> ⚠️ Ghi chú kỹ thuật quan trọng: Ảnh 1 là tài liệu tổng hợp không chính thức (không phải văn bản Bộ GD&ĐT). App cần có trường `nguồn` và `năm áp dụng` cho bảng này, và nút "Xem văn bản gốc quy chế thi TN THPT" link tới moet.gov.vn để người dùng tự đối chiếu — tránh sai lệch khi quy chế được điều chỉnh.

### 1.3. Danh sách tổ hợp xét tuyển có môn Tin học (ảnh 3, nguồn: dữ liệu tổng hợp 2025)
20 tổ hợp có môn Tin, ví dụ nổi bật:
| Tổ hợp | Môn | Số trường | Số ngành |
|---|---|---|---|
| X26 | Toán, Anh, Tin | 107 | 590 |
| X02 | Toán, Văn, Tin | 102 | 754 |
| X06 | Toán, Lý, Tin | 107 | 581 |
| X14 | Toán, Sinh, Tin | 41 | 226 |
| X10 | Toán, Hóa, Tin | 47 | 235 |
(đầy đủ 20 dòng → `data/to_hop_tin.json`)

### 1.4. Điểm chuẩn Trường ĐH Công nghệ Thông tin – ĐHQG TP.HCM 2021–2025 (ảnh 2)
Dữ liệu mẫu tham chiếu (điểm ĐGNL thang 1200, điểm TN THPT thang 30) cho các ngành: Thương mại điện tử, Khoa học Dữ liệu, Khoa học Máy tính, Mạng máy tính & TT dữ liệu, Kỹ thuật Phần mềm, Hệ thống Thông tin (+CT Tiên tiến), Kỹ thuật Máy tính, Trí tuệ Nhân tạo, CNTT (+Việt-Nhật), An toàn Thông tin, Thiết kế Vi mạch, Truyền thông Đa phương tiện. → `data/diem_chuan_uit_2021_2025.json`. Đây là **1 trường mẫu**; hệ thống cần cho phép nạp thêm điểm chuẩn nhiều trường khác (Bách Khoa, KHTN, Cần Thơ, FPT, Sư phạm Kỹ thuật, v.v.) theo cùng schema.

---

## 2. MODULE 1 — TRẮC NGHIỆM MBTI

### 2.1. Nội dung câu hỏi
- **KHÔNG dùng nguyên văn bộ câu hỏi MBTI® chính thức của Myers-Briggs Company** (có bản quyền thương mại, vi phạm nếu sao chép để kinh doanh/phân phối).
- Dùng bộ câu hỏi **mở, dạng tương đương khoa học phổ thông**: 4 trục Extraversion–Introversion (E/I), Sensing–Intuition (S/N), Thinking–Feeling (T/F), Judging–Perceiving (J/P), mỗi trục 12–15 câu (tổng 48–60 câu), thang Likert 5 mức ("Hoàn toàn không đồng ý" → "Hoàn toàn đồng ý"). Agent triển khai cần **tự soạn** bộ câu hỏi gốc theo đúng định nghĩa 4 trục (có thể tham khảo cấu trúc câu hỏi dạng phi lợi nhuận như 16Personalities/Open Extended Jungian Type Scales — nhưng viết lại bằng câu chữ của mình, tiếng Việt, phù hợp học sinh 15–18 tuổi).
- Mỗi câu hỏi gắn: `id`, `text`, `trục` (EI/SN/TF/JP), `chiều` (+1 nếu đồng ý nghiêng về chữ cái đầu, -1 nếu nghiêng chữ cái sau).

### 2.2. Chấm điểm
- Tổng điểm mỗi trục = tổng (giá trị Likert đã quy đổi theo chiều) → so sánh 2 nửa để ra chữ cái. Đưa ra thêm **% độ nghiêng** (VD: I 62% / E 38%) thay vì chỉ nhị phân, để tránh cảm giác "đóng khung".
- Trả về 1 trong 16 mã (VD: INTP, ESFJ...).

### 2.3. Nội dung gợi ý theo kết quả (bối cảnh 2026)
Với **mỗi trong 16 nhóm tính cách**, hệ thống cần sinh nội dung gồm:
1. Mô tả ngắn về nhóm tính cách (điểm mạnh, điểm cần lưu ý).
2. **Nhóm ngành nghề phù hợp cập nhật 2026** — không chỉ liệt kê ngành truyền thống mà gắn với xu hướng thị trường lao động hiện nay: AI/Machine Learning, Khoa học dữ liệu, An toàn thông tin, bán dẫn/vi mạch, chuyển đổi số, kỹ năng "làm việc cùng AI" (vì các nghề sáng tạo/cảm xúc/tương tác người được đánh giá là "vùng an toàn" tương đối trước làn sóng tự động hóa AI).
3. Gợi ý tổ hợp môn/khối thi tương ứng nếu học sinh muốn theo nhóm ngành đó (liên kết chéo sang Module 3).
4. Lưu ý: **không dùng MBTI như công cụ "chấm điểm định mệnh"** — luôn kèm khuyến cáo "đây là công cụ tham khảo, không thay thế tư vấn hướng nghiệp chuyên sâu".

> Agent triển khai cần soạn 16 bộ nội dung này (khoảng 150–250 từ/nhóm) — có thể để Claude sinh nội dung này ở bước sau khi đã xác nhận cấu trúc.

---

## 3. MODULE 2 — TRẮC NGHIỆM HOLLAND (RIASEC)

### 3.1. Nội dung câu hỏi
Bộ RIASEC gốc (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) **là học thuật, không có bản quyền chặt như MBTI thương mại**, nhưng vẫn nên viết câu hỏi bằng lời văn riêng. Thiết kế: 6 nhóm × 8–10 câu = 48–60 câu, dạng "Bạn có thích công việc/hoạt động sau không?" (thang Likert hoặc Có/Không).

Ví dụ nhóm câu (mẫu, cần soạn đủ bộ):
- R (Realistic – Kỹ thuật): thích sửa chữa máy móc, làm việc ngoài trời, lắp ráp thiết bị...
- I (Investigative – Nghiên cứu): thích giải bài toán khó, phân tích số liệu, làm thí nghiệm...
- A (Artistic – Nghệ thuật): thích vẽ, viết, thiết kế, sáng tác...
- S (Social – Xã hội): thích dạy học, tư vấn, chăm sóc người khác...
- E (Enterprising – Quản lý/Kinh doanh): thích thuyết phục, lãnh đạo nhóm, khởi nghiệp...
- C (Conventional – Nghiệp vụ): thích sắp xếp dữ liệu, làm việc có quy trình rõ ràng, kế toán...

### 3.2. Chấm điểm
Tổng điểm mỗi nhóm → xếp hạng → trả về **mã Holland 3 chữ cái** (VD: "IAS" = Investigative-Artistic-Social — mã phổ biến của người thiên về CNTT sáng tạo).

### 3.3. Gợi ý theo kết quả (bối cảnh 2026)
Với mỗi tổ hợp 3 chữ cái nổi bật nhất (hoặc tối thiểu 6 mã đơn lẻ + gợi ý kết hợp), sinh nội dung:
1. Đặc điểm nghề nghiệp phù hợp.
2. Ngành học liên quan + liên kết chéo Module 3 (tổ hợp môn nào giúp học sinh vào ngành đó).
3. Cập nhật xu hướng nghề nghiệp 2026: ví dụ mã "IC" (Investigative-Conventional) phù hợp Khoa học dữ liệu/Phân tích dữ liệu — lĩnh vực đang tăng trưởng mạnh nhu cầu tuyển dụng; mã "AE" phù hợp Thiết kế UI/UX, Truyền thông đa phương tiện, Marketing số.

---

## 4. MODULE 3 — TRA CỨU "TỔ HỢP MÔN → NGÀNH → TRƯỜNG"

### 4.1. Luồng người dùng
1. Học sinh chọn tổ hợp môn lớp 10 (mặc định hiển thị sẵn 4 tổ hợp của THPT Cà Mau, có thể mở rộng chọn trường khác/tổ hợp khác).
2. Hệ thống liệt kê tất cả **mã tổ hợp xét tuyển đại học (A00, B00, D01, X02, X26...)** mà tổ hợp môn đó có thể "phái sinh" ra được, dựa vào việc học sinh sẽ thi 2 môn tự chọn nào trong kỳ thi TN THPT (bảng 36 cách chọn, mục 1.2).
3. Với mỗi mã tổ hợp xét tuyển, hiển thị:
   - Danh sách nhóm ngành phổ biến xét tuyển bằng tổ hợp đó (bảng mẫu ảnh 3 dùng cho các tổ hợp có Tin).
   - Danh sách trường mẫu + điểm chuẩn 3–5 năm gần nhất (nếu có trong CSDL đã nạp, ví dụ UIT ở mục 1.4) kèm biểu đồ xu hướng điểm chuẩn.
4. Cảnh báo rõ: **điểm chuẩn dữ liệu quá khứ chỉ mang tính tham khảo**, không dùng để "cam kết" đỗ; điểm chuẩn còn phụ thuộc chỉ tiêu, phổ điểm thi năm đó.

### 4.2. Schema dữ liệu đề xuất
```json
// data/to_hop_36.json
[
  {
    "stt": 1,
    "mon_tu_chon": ["Vật Lí", "Hóa học"],
    "to_hop_xet_tuyen": ["A00", "C01", "C02", "C05"]
  }
  // ... đủ 36 dòng
]

// data/to_hop_tin.json
[
  {"ma": "X26", "mon": ["Toán", "Tiếng Anh", "Tin học"], "so_truong": 107, "so_nganh": 590}
  // ... đủ 20 dòng
]

// data/truong_thpt_camau_to_hop_lop10.json
[
  {"ma": "TH1", "mon": ["Vật Lí", "Hóa học", "Sinh học"], "chuyen_de": ["Hóa", "Sinh", "CNNN"], "so_lop": 7}
  // ... TH2-TH4
]

// data/diem_chuan.json  (mở rộng dần, mỗi trường 1 mảng)
[
  {
    "truong": "ĐH Công nghệ Thông tin - ĐHQG TP.HCM",
    "ma_nganh": "7480101",
    "ten_nganh": "Khoa học Máy tính",
    "diem_theo_nam": {
      "2021": {"DGNL": 920, "TN_THPT": 27.3},
      "2022": {"DGNL": 888, "TN_THPT": 27.1},
      "2023": {"DGNL": 915, "TN_THPT": 26.9},
      "2024": {"DGNL": 925, "TN_THPT": 27.3},
      "2025": {"DGNL": 993, "TN_THPT": 27.2}
    }
  }
]
```

### 4.3. Yêu cầu tính đúng/cập nhật dữ liệu
- Vì quy chế thi TN THPT, danh mục tổ hợp xét tuyển và điểm chuẩn **thay đổi hằng năm**, app cần có **trang Quản trị (Admin)** để giáo viên (bạn) tải lên file Excel cập nhật mỗi mùa tuyển sinh, thay vì hard-code.
- Với dữ liệu chưa có trong ảnh (điểm chuẩn các trường khác ngoài UIT, danh sách đầy đủ ngành theo từng mã tổ hợp...), app nên tích hợp nút "Tra cứu thêm" liên kết tới cổng thông tin tuyển sinh chính thức: `diemthi.moet.gov.vn`, `tuyensinh.moet.gov.vn` hoặc trang tuyển sinh từng trường — tránh việc AI tự "bịa" điểm chuẩn.

---

## 5. MODULE 4 — HỌC TIN HỌC → NGÀNH GÌ + DỰ BÁO CƠ HỘI NGHỀ NGHIỆP 2029

### 5.1. Ngành có thể học khi có môn Tin học trong tổ hợp xét tuyển
Dựa vào bảng mục 1.3, các nhóm ngành chính thường xét bằng tổ hợp có Tin học:
- Khoa học Máy tính, Kỹ thuật Phần mềm, Trí tuệ Nhân tạo, Khoa học Dữ liệu, An toàn thông tin, Hệ thống thông tin, Mạng máy tính & Truyền thông dữ liệu, Kỹ thuật Máy tính, Thiết kế Vi mạch/Bán dẫn, Thương mại điện tử, Công nghệ đa phương tiện, và nhiều ngành liên ngành khác (Tài chính-Công nghệ/Fintech, Y-Sinh tin học, Nông nghiệp công nghệ cao...) vì Tin học nay được nhiều trường chấp nhận thay thế môn khác trong tổ hợp xét tuyển.

### 5.2. Dự báo cơ hội nghề nghiệp đến 2029 (tổng hợp từ nguồn 2025–2026)
Nội dung cần trình bày trong app (paraphrase, không copy nguyên văn nguồn):
- Nhu cầu nhân lực CNTT Việt Nam tiếp tục thiếu hụt lớn: nhiều báo cáo dự báo thiếu hàng trăm nghìn nhân sự chất lượng cao trong giai đoạn 2025–2030, và mục tiêu quốc gia hướng tới cần khoảng 3 triệu nhân sự ngành này vào 2030 để phục vụ kinh tế số.
- Các mảng tăng trưởng mạnh nhất dự kiến vẫn nóng đến 2029: **Trí tuệ nhân tạo/Machine Learning, Khoa học dữ liệu, An ninh mạng, Điện toán đám mây, bán dẫn/vi mạch** (Việt Nam đang được các tập đoàn lớn như NVIDIA, Intel, FPT đầu tư mạnh vào chuỗi bán dẫn).
- Kỹ năng "làm việc cùng AI" (dùng công cụ AI hỗ trợ lập trình, phân tích) được dự báo là yêu cầu bắt buộc với lập trình viên tương lai, thay vì cạnh tranh với AI.
- Mức lương khởi điểm ngành CNTT hiện thuộc nhóm cao nhất thị trường lao động, và có xu hướng tăng theo chuyên môn sâu (AI, bảo mật, bán dẫn).
- Rủi ro cần lưu ý: ngành cũng chịu ảnh hưởng bởi biến động tuyển dụng toàn cầu (từng có đợt cắt giảm nhân sự ở các tập đoàn công nghệ lớn 2022–2023), nên học sinh cần trang bị thêm kỹ năng mềm, ngoại ngữ, khả năng tự học liên tục để thích ứng.

> Ghi rõ trong app: đây là **tổng hợp xu hướng**, không phải cam kết việc làm; nên trích dẫn nguồn khi hiển thị (VD: Bộ TT&TT, TopDev, VietnamWorks, Gartner, ManpowerGroup...) và có nút "Cập nhật xu hướng mới nhất" gọi tính năng tìm kiếm/API tin tức để refresh nội dung theo thời gian thực khi triển khai thật.

---

## 6. KIẾN TRÚC KỸ THUẬT ĐỀ XUẤT

- **Frontend:** React + Tailwind (hoặc Next.js nếu cần SEO cho nội dung hướng nghiệp công khai).
- **Backend/DB:** Node.js (Express) hoặc dùng trực tiếp Firebase/Supabase để đơn giản hoá cho một giáo viên vận hành không cần server riêng. Bảng dữ liệu: `mbti_questions`, `holland_questions`, `mbti_results`, `holland_results`, `to_hop_36`, `to_hop_tin`, `to_hop_lop10_truong`, `diem_chuan`, `nganh`, `truong`, `users` (nếu cần lưu lịch sử làm bài học sinh).
- **Lưu kết quả học sinh:** cân nhắc GDPR/luật trẻ em VN — chỉ lưu tối thiểu (không bắt buộc đăng nhập; có thể xuất PDF kết quả để học sinh tự lưu, không cần lưu trên server).
- **Cập nhật dữ liệu hàng năm:** trang admin upload CSV/Excel cho `diem_chuan`, `to_hop_36`, `to_hop_tin` — dùng thư viện như SheetJS để parse.
- **Đa nền tảng:** thiết kế responsive để dùng tốt trên điện thoại (học sinh chủ yếu truy cập bằng điện thoại).

---

## 7. MASTER PROMPT — DÙNG CHO AI CODING AGENT (copy nguyên khối bên dưới)

```
Bạn là kỹ sư phần mềm full-stack. Hãy xây dựng một ứng dụng web hướng nghiệp cho học sinh THPT Việt Nam với 4 module:

1. Trắc nghiệm MBTI: 48-60 câu hỏi tự soạn (KHÔNG sao chép bộ câu hỏi MBTI thương mại), 4 trục E/I, S/N, T/F, J/P, thang Likert 5 mức, tính % thiên hướng mỗi trục, trả về 1 trong 16 mã loại, kèm bài viết 150-250 từ/mã mô tả đặc điểm + ngành nghề phù hợp cập nhật xu hướng thị trường lao động Việt Nam 2026 (AI, dữ liệu, an ninh mạng, bán dẫn...).

2. Trắc nghiệm Holland/RIASEC: 48-60 câu tự soạn, 6 nhóm R-I-A-S-E-C, trả về mã 3 chữ cái nổi bật nhất, kèm nội dung gợi ý ngành nghề/ngành học tương ứng cập nhật 2026, liên kết chéo sang module 3.

3. Tra cứu Tổ hợp môn → Ngành → Trường: nạp sẵn dữ liệu JSON tôi cung cấp (to_hop_36.json - 36 cách chọn môn thi TN THPT chương trình 2+2 và tổ hợp xét tuyển tương ứng; to_hop_tin.json - 20 tổ hợp có môn Tin học kèm số trường/ngành; to_hop_lop10_truong.json - 4 tổ hợp lớp 10 của THPT Cà Mau; diem_chuan.json - điểm chuẩn mẫu trường ĐH CNTT ĐHQG-HCM 2021-2025). Cho phép người dùng chọn tổ hợp lớp 10 → xem các mã tổ hợp xét tuyển ĐH khả dụng → xem ngành/trường + biểu đồ điểm chuẩn qua các năm nếu có dữ liệu. Có trang Admin để tải lên Excel cập nhật dữ liệu điểm chuẩn/tổ hợp mỗi năm (dùng SheetJS).

4. Tra cứu "Học Tin học ra làm ngành gì + dự báo cơ hội nghề nghiệp 2029": hiển thị danh sách ngành xét tuyển bằng tổ hợp có Tin, kèm bài phân tích xu hướng nhân lực CNTT Việt Nam đến 2029 (AI/ML, khoa học dữ liệu, an ninh mạng, bán dẫn, kỹ năng làm việc cùng AI), có trích nguồn tham khảo, có nút gợi ý người dùng bấm để lấy tin tức mới nhất (qua tích hợp API tìm kiếm nếu có).

Yêu cầu kỹ thuật:
- Stack: React + Tailwind (frontend), Node.js/Express hoặc Supabase (backend/DB).
- Responsive, ưu tiên trải nghiệm trên điện thoại.
- Không lưu dữ liệu cá nhân học sinh nếu không cần thiết; cho phép xuất kết quả ra PDF.
- Toàn bộ nội dung bằng tiếng Việt, giọng văn thân thiện, phù hợp học sinh 15-18 tuổi.
- Mọi bảng dữ liệu tổ hợp/điểm chuẩn phải có trường "nguồn" và "năm cập nhật", kèm cảnh báo dữ liệu điểm chuẩn quá khứ chỉ mang tính tham khảo.
- Cung cấp seed data JSON đầy đủ theo schema đã mô tả, sau đó xây dựng UI + logic từng module.

Hãy bắt đầu bằng việc: (a) dựng cấu trúc project, (b) tạo seed data JSON cho 4 file dữ liệu trên từ dữ liệu tôi cung cấp, (c) xây dựng module 3 và 4 trước (vì dữ liệu đã có sẵn), (d) sau đó soạn bộ câu hỏi MBTI và Holland đầy đủ, (e) cuối cùng ghép giao diện hoàn chỉnh.
```

---

## 8. VIỆC CẦN BẠN QUYẾT ĐỊNH TRƯỚC KHI TRIỂN KHAI THẬT

1. Nền tảng đích: web thuần, hay cần app di động (React Native)?
2. Có cần đăng nhập/lưu lịch sử làm bài của học sinh theo lớp để giáo viên theo dõi không?
3. Phạm vi dữ liệu tổ hợp/điểm chuẩn: chỉ THPT Cà Mau + 1 trường ĐH mẫu (UIT) như hiện có, hay mở rộng toàn bộ các trường ĐH khu vực ĐBSCL/TP.HCM ngay từ đầu?
4. Ai sẽ là người cập nhật dữ liệu hàng năm (bạn tự tải Excel lên, hay cần một quy trình đồng bộ tự động từ nguồn Bộ GD&ĐT)?

Tôi có thể triển khai ngay phần code thực tế (ví dụ bắt đầu bằng Module 3 + 4 vì đã có đủ dữ liệu số hoá) nếu bạn xác nhận các lựa chọn trên.
