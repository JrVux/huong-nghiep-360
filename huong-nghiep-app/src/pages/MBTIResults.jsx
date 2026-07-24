import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import mbtiResults from '../data/mbti_results.json'
import { usePdfExport } from '../hooks/usePdfExport'
import '../styles/Results.css'

export default function MBTIResults() {
  const { type } = useParams()
  const [result, setResult] = useState(null)
  const { exportToPdf } = usePdfExport()
  const strengths = Array.isArray(result?.diem_manh) ? result.diem_manh : []
  const tips = Array.isArray(result?.diem_can_luu_y) ? result.diem_can_luu_y : []
  const careers = Array.isArray(result?.nghe_phu_hop_2026) ? result.nghe_phu_hop_2026 : []
  const combos = Array.isArray(result?.to_hop_goi_y) ? result.to_hop_goi_y : []

  useEffect(() => {
    const data = mbtiResults.ket_qua[type]
    if (data) {
      setResult({ ...data, type })
    }
  }, [type])

  if (!result) {
    return <div className="results-page"><p>Không tìm thấy kết quả...</p></div>
  }

  return (
    <div className="results-page">
      <div className="results-container" id="mbti-results-content">
        <div className="results-header">
          <h1>Kết quả MBTI của bạn: <span className="mbti-type">{type}</span></h1>
          <h2 className="mbti-name">{result.ten}</h2>
        </div>

        <div className="results-content">
          <section className="result-section">
            <h3>📝 Mô tả</h3>
            <p className="description">{result.mo_ta}</p>
          </section>

          <div className="two-columns">
            <section className="result-section">
              <h3>💪 Điểm mạnh</h3>
              <ul className="strengths-list">
                {strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </section>

            <section className="result-section">
              <h3>⚠️ Cần lưu ý</h3>
              <ul className="tips-list">
                {tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="result-section">
            <h3>🎯 Ngành nghề phù hợp (2026)</h3>
            <div className="careers-grid">
              {careers.map((career, index) => (
                <div key={index} className="career-card">{career}</div>
              ))}
            </div>
            <p className="tips">💡 Tip: Tìm hiểu thêm về từng ngành, tham khảo tuyên sinh trường bạn quan tâm.</p>
          </section>

          <section className="result-section">
            <h3>📚 Tổ hợp môn gợi ý</h3>
            <div className="combo-tags">
              {combos.map((combo, index) => (
                <span key={index} className="combo-tag">{combo}</span>
              ))}
            </div>
            <p className="small-text">Đây chỉ là gợi ý. Hãy xem Module 3 (Tra cứu Tổ hợp) để biết rõ hơn.</p>
          </section>

          <section className="warning-section result-section">
            <h4>⚠️ Lưu ý quan trọng</h4>
            <p><strong>{mbtiResults.khuyen_cao}</strong></p>
            <p>MBTI là công cụ để bạn hiểu bản thân hơn, không phải để hạn chế lựa chọn của bạn.</p>
          </section>

          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => exportToPdf('mbti-results-content', `Ket_qua_MBTI_${type}`)}>📥 Xuất PDF</button>
            <button className="btn btn-primary" onClick={() => window.print()}>🖨️ In kết quả</button>
            <a href="/holland" className="btn btn-secondary">Làm trắc nghiệm Holland →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
