
import '../styles/ITCareer.css'

export default function ITCareerInfo() {
  return (
    <div className="it-career-page">
      <div className="it-career-container">
        <div className="hero-section">
          <h1>💻 Học Tin Học = Cơ hội nào? (2026-2029)</h1>
          <p className="tagline">Khám phá những ngành CNTT đang phát triển mạnh tại Việt Nam</p>
        </div>

        <section className="it-section intro-section">
          <h2>📊 Nhu cầu nhân lực CNTT - Nhìn từ bức tranh tổng thể</h2>
          <div className="stat-cards">
            <div className="stat-card">
              <h3>3 triệu</h3>
              <p>Mục tiêu nhân sự CNTT cần đến 2030 để phục vụ kinh tế số Việt Nam</p>
            </div>
            <div className="stat-card">
              <h3>Thiếu hụt</h3>
              <p>Hàng trăm nghìn vị trí lập trình viên, nhà khoa học dữ liệu không được tuyển dụng</p>
            </div>
            <div className="stat-card">
              <h3>Mức lương cao</h3>
              <p>Ngành CNTT là một trong những ngành có mức lương khởi điểm cao nhất Việt Nam</p>
            </div>
          </div>
        </section>

        <section className="it-section">
          <h2>🚀 Các ngành CNTT đang phát triển mạnh (2026-2029)</h2>
          
          <div className="career-cards">
            <div className="career-card hot">
              <h3>🤖 Trí tuệ Nhân tạo & Machine Learning</h3>
              <p className="trend">⬆️ Tăng trưởng cao nhất</p>
              <div className="description">
                <p><strong>Là gì?</strong> Tạo ra các hệ thống máy tính có thể "học hỏi" từ dữ liệu và đưa ra quyết định.</p>
                <p><strong>Tại sao hot?</strong> AI normal giới, mọi công ty đều muốn ứng dụng AI để tự động hóa, cải thiện hiệu quả.</p>
              </div>
              <div className="details">
                <p>💼 <strong>Việc làm:</strong> AI Engineer, ML Engineer, Data Scientist</p>
                <p>💰 <strong>Mức lương:</strong> 20-40 triệu/tháng (sắp tới cao hơn)</p>
                <p>🎓 <strong>Cần học:</strong> Lập trình (Python), Toán học, Xử lý dữ liệu</p>
                <p>📚 <strong>Tổ hợp gợi ý:</strong> A00, A01, X06, X26</p>
              </div>
            </div>

            <div className="career-card hot">
              <h3>📊 Khoa học Dữ liệu & Big Data</h3>
              <p className="trend">⬆️ Tăng trưởng cao</p>
              <div className="description">
                <p><strong>Là gì?</strong> Thu thập, phân tích khối lượng dữ liệu rất lớn để tìm ra quy luật, hỗ trợ quyết định kinh doanh.</p>
                <p><strong>Tại sao hot?</strong> Data là "dầu thô" của thời 4.0. Công ty nào muốn thành công đều cần dữ liệu.</p>
              </div>
              <div className="details">
                <p>💼 <strong>Việc làm:</strong> Data Analyst, Data Engineer, Data Scientist</p>
                <p>💰 <strong>Mức lương:</strong> 18-35 triệu/tháng</p>
                <p>🎓 <strong>Cần học:</strong> Lập trình, SQL, Excel, Python, R</p>
                <p>📚 <strong>Tổ hợp gợi ý:</strong> A00, A01, X06</p>
              </div>
            </div>

            <div className="career-card hot">
              <h3>🔒 An ninh Mạng & Bảo mật Thông tin</h3>
              <p className="trend">⬆️ Nhu cầu đột biến</p>
              <div className="description">
                <p><strong>Là gì?</strong> Bảo vệ hệ thống máy tính, dữ liệu khỏi những cuộc tấn công mạng.</p>
                <p><strong>Tại sao hot?</strong> Chính phủ VN ưu tiên an ninh mạng quốc gia. Công ty sợ bị hack, cần chuyên gia.</p>
              </div>
              <div className="details">
                <p>💼 <strong>Việc làm:</strong> Security Engineer, Ethical Hacker, Security Analyst</p>
                <p>💰 <strong>Mức lương:</strong> 20-40 triệu/tháng</p>
                <p>🎓 <strong>Cần học:</strong> Mạng máy tính, Linux, Lập trình</p>
                <p>📚 <strong>Tổ hợp gợi ý:</strong> A00, A01, X06</p>
              </div>
            </div>

            <div className="career-card">
              <h3>🔌 Bán dẫn & Vi mạch</h3>
              <p className="trend">⬆️ Chiến lược quốc gia</p>
              <div className="description">
                <p><strong>Là gì?</strong> Thiết kế và sản xuất các chip điện tử dùng trong điện thoại, máy tính, IoT.</p>
                <p><strong>Tại sao hot?</strong> Việt Nam được chọn là "trung tâm bán dẫn SE Asia" bởi NVIDIA, Intel, Samsung.</p>
              </div>
              <div className="details">
                <p>💼 <strong>Việc làm:</strong> IC Design Engineer, Semiconductor Engineer, Embedded Systems Engineer</p>
                <p>💰 <strong>Mức lương:</strong> 18-32 triệu/tháng</p>
                <p>🎓 <strong>Cần học:</strong> Điện tử, Lập trình C/C++, Vật lý ứng dụng</p>
                <p>📚 <strong>Tổ hợp gợi ý:</strong> A00, A01, X03</p>
              </div>
            </div>

            <div className="career-card">
              <h3>☁️ Điện toán Đám mây & DevOps</h3>
              <p className="trend">⬆️ Tăng trưởng bền vững</p>
              <div className="description">
                <p><strong>Là gì?</strong> Quản lý hạ tầng máy tính "trên mây" (AWS, Azure, Google Cloud) để ứng dụng chạy ổn định.</p>
                <p><strong>Tại sao hot?</strong> Công ty phải đẩy mạnh digital, cần DevOps engineer để triển khai nhanh.</p>
              </div>
              <div className="details">
                <p>💼 <strong>Việc làm:</strong> DevOps Engineer, Cloud Architect, Infrastructure Engineer</p>
                <p>💰 <strong>Mức lương:</strong> 18-30 triệu/tháng</p>
                <p>🎓 <strong>Cần học:</strong> Lập trình, Linux, Docker, Kubernetes</p>
                <p>📚 <strong>Tổ hợp gợi ý:</strong> A00, A01, X06</p>
              </div>
            </div>

            <div className="career-card">
              <h3>🕸️ Phát triển Web & Mobile</h3>
              <p className="trend">⬆️ Cầu ổn định cao</p>
              <div className="description">
                <p><strong>Là gì?</strong> Tạo ra các ứng dụng web (trang web) và mobile (ứng dụng điện thoại).</p>
                <p><strong>Tại sao hot?</strong> Hầu hết doanh nghiệp cần có website, ứng dụng. Đó vẫn là công việc "entry-level" dễ học nhất.</p>
              </div>
              <div className="details">
                <p>💼 <strong>Việc làm:</strong> Frontend Developer, Backend Developer, Full-Stack Developer, Mobile Developer</p>
                <p>💰 <strong>Mức lương:</strong> 12-25 triệu/tháng</p>
                <p>🎓 <strong>Cần học:</strong> JavaScript/TypeScript, React/Vue/Angular, Node.js</p>
                <p>📚 <strong>Tổ hợp gợi ý:</strong> A00, A01, X06, X26</p>
              </div>
            </div>

            <div className="career-card">
              <h3>🎮 Game Development & Digital Content</h3>
              <p className="trend">⬆️ Tốc độ cao</p>
              <div className="description">
                <p><strong>Là gì?</strong> Tạo ra game, video, animation, nội dung số cho streaming.</p>
                <p><strong>Tại sao hot?</strong> Ngành game Việt Nam phát triển vượt trội. YouTube, TikTok tăng doanh thu quảng cáo.</p>
              </div>
              <div className="details">
                <p>💼 <strong>Việc làm:</strong> Game Developer, Graphics Engineer, Content Creator, VFX Artist</p>
                <p>💰 <strong>Mức lương:</strong> 12-28 triệu/tháng</p>
                <p>🎓 <strong>Cần học:</strong> Unity/Unreal, C#/C++, Blender, Adobe Creative Suite</p>
                <p>📚 <strong>Tổ hợp gợi ý:</strong> A00, A01, X06</p>
              </div>
            </div>
          </div>
        </section>

        <section className="it-section">
          <h2>🛠️ Kỹ năng quan trọng cho Lập trình viên 2026+</h2>
          <div className="skills-matrix">
            <div className="skill-group">
              <h4>Kỹ năng chuyên môn "hard skills"</h4>
              <ul>
                <li>✅ <strong>Lập trình cơ bản:</strong> Python, JavaScript/TypeScript, Java</li>
                <li>✅ <strong>Làm việc với AI:</strong> Dùng ChatGPT, GitHub Copilot hỗ trợ lập trình (AI không thay bạn, mà giúp bạn nhanh hơn)</li>
                <li>✅ <strong>Git & Version Control:</strong> Quản lý code cùng team</li>
                <li>✅ <strong>Database & SQL:</strong> Lưu trữ và truy xuất dữ liệu</li>
                <li>✅ <strong>Linux/Terminal:</strong> Làm việc command line</li>
              </ul>
            </div>

            <div className="skill-group">
              <h4>Kỹ năng mềm "soft skills"</h4>
              <ul>
                <li>✅ <strong>Giải quyết vấn đề:</strong> Tư duy thuật toán, debug logic</li>
                <li>✅ <strong>Làm việc nhóm:</strong> Giao tiếp, đối thoại code review</li>
                <li>✅ <strong>Tự học liên tục:</strong> CNTT thay đổi nhanh, cần cập nhật kiến thức hằng ngày</li>
                <li>✅ <strong>Tiếng Anh:</strong> Tài liệu kỹ thuật chủ yếu bằng Anh văn</li>
                <li>✅ <strong>Giao tiếp kỹ thuật:</strong> Giải thích code/ý tưởng cho người không lập trình hiểu được</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="it-section">
          <h2>⚠️ Điều cần lưu ý</h2>
          <ul className="warnings">
            <li><strong>1. Ngành CNTT có "buồn":</strong> Tuy nhu cầu cao nhưng công ty cũng cắt giảm nhân sự khi kinh tế khó khăn (xảy ra 2022-2023). Bạn cần kỹ năng vững để "giữ việc".</li>
            <li><strong>2. Phải tư duy dài hạn:</strong> 4 năm học đại học, ngành công nghệ đã khác lắm. Bạn cần liên tục học tập, cập nhật.</li>
            <li><strong>3. Cạnh tranh công nghiệp 4.0:</strong> AI ngày càng "giỏi" lập trình. Lập trình viên tương lai phải biết cách "làm việc cùng AI", không cạnh tranh với AI.</li>
            <li><strong>4. Không phải mình sinh ra lập trình:</strong> Nếu bạn thích, thì OK. Nếu chỉ chọn vì lương cao, có thể sẽ chán và không kéo dài được.</li>
          </ul>
        </section>

        <section className="it-section cta-section">
          <h2>🤔 Bước tiếp theo</h2>
          <div className="cta-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Đánh giá bản thân</h4>
              <p>Làm trắc nghiệm MBTI & Holland để biết bạn hợp ngành CNTT không, hay là ngành khác phù hợp hơn.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Chọn tổ hợp môn</h4>
              <p>Nếu muốn học CNTT, chọn tổ hợp có Tin học (TH2, TH3) rồi xem tổ hợp xét tuyển nào có thể.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Tự học thêm</h4>
              <p>Không chờ lên đại học. Bây giờ hãy học Python, HTML/CSS qua YouTube hoặc các khóa học online miễn phí.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h4>Tư vấn với thầy cô</h4>
              <p>Nói chuyện với giáo viên chủ nhiệm, thầy Tin học về lộ trình học tập của bạn.</p>
            </div>
          </div>
        </section>

        <section className="it-section resources-section">
          <h2>📚 Tài nguyên học tập miễn phí</h2>
          <ul>
            <li><a href="https://www.codecademy.com" target="_blank" rel="noopener noreferrer">Codecademy</a> - Học lập trình online</li>
            <li><a href="https://www.freecodecamp.org" target="_blank" rel="noopener noreferrer">FreeCodeCamp</a> - Khóa lập trình web, Python, AI</li>
            <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a> - Tìm "Python for beginners", "Web Development"</li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> - Portfolio code của bạn</li>
            <li><a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN Web Docs</a> - Tài liệu web</li>
            <li><a href="https://www.topdev.vn" target="_blank" rel="noopener noreferrer">TopDev</a> - Việc làm CNTT, tin tức ngành</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
