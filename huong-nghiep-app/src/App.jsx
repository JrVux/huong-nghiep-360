import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom'
import './App.css'

const HomePage = lazy(() => import('./pages/HomePage'))
const MBTITest = lazy(() => import('./pages/MBTITest'))
const MBTIResults = lazy(() => import('./pages/MBTIResults'))
const HollandTest = lazy(() => import('./pages/HollandTest'))
const HollandResults = lazy(() => import('./pages/HollandResults'))
const SubjectLookup = lazy(() => import('./pages/SubjectLookup'))
const ITCareerInfo = lazy(() => import('./pages/ITCareerInfo'))

function App() {
  const navLinkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`
  const routerBasename = import.meta.env.BASE_URL || '/'

  return (
    <Router basename={routerBasename}>
      <div className="app">
        <nav className="navbar" aria-label="Điều hướng chính">
          <NavLink to="/" className="logo" end>
            <span className="logo-mark"><img src="/logo.png" alt="HuongNghiep360" /></span>
            <span>HuongNghiep360</span>
          </NavLink>
          <div className="nav-links">
            <NavLink to="/" className={navLinkClass} end>
              Trang chủ
            </NavLink>
            <NavLink to="/mbti" className={navLinkClass}>
              MBTI
            </NavLink>
            <NavLink to="/holland" className={navLinkClass}>
              Holland
            </NavLink>
            <NavLink to="/subject-lookup" className={navLinkClass}>
              Tra cứu
            </NavLink>
            <NavLink to="/it-career" className={navLinkClass}>
              Tin học
            </NavLink>
          </div>
        </nav>

        <main className="main-content">
          <Suspense fallback={<div className="page-loading">Đang tải trang...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mbti" element={<MBTITest />} />
              <Route path="/mbti/results/:type" element={<MBTIResults />} />
              <Route path="/holland" element={<HollandTest />} />
              <Route path="/holland/results/:type" element={<HollandResults />} />
              <Route path="/subject-lookup" element={<SubjectLookup />} />
              <Route path="/it-career" element={<ITCareerInfo />} />
            </Routes>
          </Suspense>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Về dự án</h4>
              <p>HuongNghiep360 là bộ công cụ hướng nghiệp thực hành dành cho học sinh THPT.</p>
            </div>

            <div className="footer-section">
              <h4>Tham khảo chính thức</h4>
              <ul>
                <li><a href="https://moet.gov.vn" target="_blank" rel="noopener noreferrer">Bộ Giáo dục & Đào tạo</a></li>
                <li><a href="https://diemthi.moet.gov.vn" target="_blank" rel="noopener noreferrer">Tra cứu điểm thi</a></li>
                <li><a href="https://tuyensinh.moet.gov.vn" target="_blank" rel="noopener noreferrer">Tuyển sinh chính thức</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Nguồn tin lao động</h4>
              <ul>
                <li><a href="https://www.itviec.com" target="_blank" rel="noopener noreferrer">ITViec</a></li>
                <li><a href="https://www.topdev.vn" target="_blank" rel="noopener noreferrer">TopDev</a></li>
                <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Hướng Nghiệp 360 | Khám phá bản thân, tìm ngành nghề gọi của bạn | Công cụ hướng nghiệp toàn diện cho học sinh THPT</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
