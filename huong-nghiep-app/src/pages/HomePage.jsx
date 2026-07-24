import { Link } from 'react-router-dom'
import '../styles/HomePage.css'

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero animate-fade-in">
        <h1>🎓 Hướng Nghiệp 360</h1>
        <p>Khám phá bản thân, tìm ngành nghe gọi của bạn</p>
        <p className="subtitle">Công cụ hướng nghiệp toàn diện cho học sinh THPT</p>
      </section>

      <section className="modules-grid">
        <div className="module-card animate-scale-up">
          <div className="module-icon">📊</div>
          <h3>Trắc nghiệm MBTI</h3>
          <p>Hiểu rõ tính cách, điểm mạnh và lựa chọn ngành phù hợp dựa trên tính cách của bạn.</p>
          <p className="small-text">4 trục tính cách: E/I, S/N, T/F, J/P</p>
          <Link to="/mbti" className="btn btn-primary">Bắt đầu</Link>
        </div>

        <div className="module-card animate-scale-up">
          <div className="module-icon">💼</div>
          <h3>Trắc nghiệm Holland</h3>
          <p>Phát hiện sở thích nghề nghiệp của bạn qua bộ RIASEC, từ đó gợi ý ngành học phù hợp.</p>
          <p className="small-text">6 loại sở thích: R-I-A-S-E-C</p>
          <Link to="/holland" className="btn btn-primary">Bắt đầu</Link>
        </div>

        <div className="module-card animate-scale-up">
          <div className="module-icon">📚</div>
          <h3>Tra cứu Tổ hợp môn</h3>
          <p>Chọn tổ hợp môn lớp 10, xem các ngành và trường có thể học, điểm chuẩn mến năm.</p>
          <p className="small-text">Dữ liệu 2025-2026, cập nhật liên tục</p>
          <Link to="/subject-lookup" className="btn btn-primary">Tra cứu</Link>
        </div>

        <div className="module-card animate-scale-up">
          <div className="module-icon">💻</div>
          <h3>Học Tin = Cơ hội nào?</h3>
          <p>Nếu bạn chọn Tin học trong tổ hợp, khám phá các ngành CNTT, xu hướng 2026-2029.</p>
          <p className="small-text">Dự báo nhu cầu nhân lực, mức lương, kỹ năng cần thiết</p>
          <Link to="/it-career" className="btn btn-primary">Khám phá</Link>
        </div>
      </section>

      <section className="info-section animate-fade-in">
        <div className="info-content">
          <h2>❓ Tại sao chọn HuongNghiep360?</h2>
          <ul>
            <li>✅ <strong>Lấy dữ liệu từ các nguồn chính thức:</strong> Quy chế thi, điểm chuẩn đại học, dự báo nhân lực từ Bộ TTTT.</li>
            <li>✅ <strong>Cập nhật xu hướng thị trường lao động 2026:</strong> AI, Data, An ninh mạng, Bán dẫn.</li>
            <li>✅ <strong>Phù hợp với học sinh THPT Cà Mau:</strong> Tổ hợp môn từ trường của bạn.</li>
            <li>✅ <strong>Công cụ tư vấn, không định mệnh:</strong> Kết quả chỉ là tham khảo, hỗ trợ bạn suy nghĩ thêm.</li>
            <li>✅ <strong>Dùng bằng điện thoại hoặc máy tính:</strong> Responsive, tiện lợi.</li>
          </ul>
        </div>

        <div className="warning-box">
          <h3>⚠️ Lưu ý quan trọng</h3>
          <p>Tất cả kết quả trong app này chỉ mang tính <strong>tham khảo</strong>, không thay thế tư vấn hướng nghiệp chuyên sâu từ nhà tư vấn hay giáo viên chủ nhiệm. Bạn nên:</p>
          <ul>
            <li>Thảo luận với gia đình, giáo viên</li>
            <li>Tham khảo thêm từ các cổng tuyển sinh chính thức: <a href="https://diemthi.moet.gov.vn" target="_blank" rel="noopener noreferrer">diemthi.moet.gov.vn</a></li>
            <li>Tìm hiểu thêm về các ngành từ trang tuyển sinh từng trường</li>
            <li>Cân nhắc kỹ trước khi chọn tổ hợp môn lớp 10</li>
          </ul>
        </div>
      </section>

      <section className="faq-section">
        <h2>🤔 Câu hỏi thường gặp</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>MBTI và Holland có khác gì?</h4>
            <p>MBTI giúp bạn hiểu <strong>tính cách</strong> của mình (cách suy nghĩ, hành động). Holland giúp bạn biết <strong>sở thích nghề</strong> (làm gì để cảm thấy hạnh phúc).</p>
          </div>
          <div className="faq-item">
            <h4>Điểm chuẩn có thay đổi không?</h4>
            <p>Có! Điểm chuẩn thay đổi mỗi năm tùy vào chỉ tiêu và phổ điểm thi. App hiển thị dữ liệu quá khứ để bạn tham khảo xu hướng.</p>
          </div>
          <div className="faq-item">
            <h4>Tôi phải chọn tổ hợp nào?</h4>
            <p>Chọn dựa trên: (1) Điểm số của bạn, (2) Đam mê ngành nào, (3) Tổ hợp nào mở cơ hội nhiều ngành. App này giúp bạn phân tích.</p>
          </div>
          <div className="faq-item">
            <h4>Độ chính xác của app how nhiêu %?</h4>
            <p>Không có con số cụ thể. App chỉ phân tích dữ liệu khách quan + xu hướng thị trường. Bạn mới là người quyết định cuối cùng.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
