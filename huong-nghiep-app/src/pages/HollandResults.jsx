import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import hollandResults from '../data/holland_results.json'
import { usePdfExport } from '../hooks/usePdfExport'
import '../styles/Results.css'

export default function HollandResults() {
  const { type } = useParams()
  const [results, setResults] = useState([])
  const [combination, setCombination] = useState(null)
  const { exportToPdf } = usePdfExport()
  const safeResults = Array.isArray(results) ? results : []

  useEffect(() => {
    if (!type || type.length < 1) return
    
    // Lấy từng chữ cái và tìm dữ liệu
    const resultsData = []
    for (let char of type) {
      if (hollandResults.nhom && hollandResults.nhom[char]) {
        resultsData.push({ ...hollandResults.nhom[char], type: char })
      }
    }
    
    setResults(resultsData)
    
    // Tìm kiếm kết hợp
    if (type.length === 3) {
      const combKey = type
      if (hollandResults.ket_hop_pho_bien && hollandResults.ket_hop_pho_bien[combKey]) {
        setCombination(hollandResults.ket_hop_pho_bien[combKey])
      }
    }
  }, [type])

  return (
    <div className="results-page">
      <div className="results-container" id="holland-results-content">
        <div className="results-header">
          <h1>Kết quả Holland của bạn: <span className="holland-type">{type}</span></h1>
          {combination && <p className="combination-desc">{combination.mo_ta}</p>}
        </div>

        <div className="results-content">
          {results.length > 0 ? (
            <>
              <div className="holland-cards">
                {safeResults.map((result, index) => (
                  <div key={index} className={`holland-card holland-${result.type.toLowerCase()}`}>
                    <div className="card-header">
                      <span className="bieutuong">{result.bieu_tuong}</span>
                      <h3>{result.ten}</h3>
                    </div>
                    
                    <p className="description">{result.mo_ta}</p>
                    
                    <div className="card-section">
                      <h4>🎯 Đặc điểm</h4>
                      <ul>
                        {(Array.isArray(result.dac_diem) ? result.dac_diem : []).map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="card-section">
                      <h4>💼 Ngành nghề phù hợp (2026)</h4>
                      <div className="career-tags">
                        {(Array.isArray(result.nghe_phu_hop_2026) ? result.nghe_phu_hop_2026 : []).map((career, idx) => (
                          <span key={idx} className="career-tag">{career}</span>
                        ))}
                      </div>
                    </div>

                    <div className="card-section">
                      <h4>📚 Ngành học liên quan</h4>
                      <div className="field-tags">
                        {(Array.isArray(result.nganh_hoc) ? result.nganh_hoc : []).map((field, idx) => (
                          <span key={idx} className="field-tag">{field}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <section className="tips-section result-section">
                <h3>💡 Lời khuyên cho bạn</h3>
                <ul>
                  <li>Sở thích Holland của bạn cho thấy bạn thích công việc hoặc môi trường như thế nào.</li>
                  <li>Hãy xem xét những ngành nghề gợi ý, rồi tra cứu thêm về chúng.</li>
                  <li>Kết hợp kết quả Holland với kết quả MBTI để có cái nhìn toàn diện hơn.</li>
                  <li>Module 3 (Tra cứu Tổ hợp) sẽ giúp bạn biết cách học để vào những ngành bạn muốn.</li>
                </ul>
              </section>

              <section className="warning-section result-section">
                <h4>Lưu ý quan trọng</h4>
                <p><strong>{hollandResults.khuyen_cao}</strong></p>
              </section>

              <div className="action-buttons">
                <button className="btn btn-primary" onClick={() => exportToPdf('holland-results-content', `Ket_qua_Holland_${type}`)}>📥 Xuất PDF</button>
                <button className="btn btn-primary" onClick={() => window.print()}>🖨️ In kết quả</button>
                <a href="/subject-lookup" className="btn btn-secondary">Tra cứu tổ hợp →</a>
              </div>
            </>
          ) : (
            <p>Không tìm thấy kết quả. Vui lòng thử lại.</p>
          )}
        </div>
      </div>
    </div>
  )
}
