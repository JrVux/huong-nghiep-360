import { useState } from 'react'
import diemChuan from '../data/diem_chuan.json'
import toHopThptCaMau from '../data/to_hop_lop10_truong.json'
import admissionsData from '../data/admissions_verified.json'
import { findMatchingCombinations } from '../features/subjectLookup/combinations'
import { buildStudentSubjectSet } from '../features/subjectLookup/subjects'
import {
  buildVerifiedCombinationCatalog,
  getAdmissionsForCombination,
} from '../features/subjectLookup/admissions'
import '../styles/Lookup.css'

const officialSources = [
  {
    title: 'Đại học Mở TP.HCM - Tuyển sinh 2026',
    href: 'https://tuyensinh.ou.edu.vn/danh-muc-nganh-chi-tieu-to-hop-xet-tuyen-dai-hoc-chinh-quy-nam-2026',
    description: 'Danh mục ngành, chỉ tiêu và các bộ ba môn xét tuyển chính thức năm 2026.',
  },
  {
    title: 'Đại học Cần Thơ - Tổ hợp tuyển sinh 2026',
    href: 'https://tuyensinh.ctu.edu.vn/images/upload/TT_TS/2026/2025-11_CV-DHCT_Thong-bao_Danh-muc-To-hop-xet-tuyen-dai-hoc-chinh-quy-nam-2025_V2.signed.signed.signed.signed.pdf',
    description: 'Danh mục 127 mã ngành và bảng mã tổ hợp áp dụng cho tuyển sinh từ năm 2026.',
  },
  {
    title: 'Trường Đại học Khoa học - Đại học Thái Nguyên - Tuyển sinh 2026',
    href: 'https://tuyensinh.tnus.edu.vn/article/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
    description: 'Danh mục ngành và thông tin tuyển sinh đại học chính quy năm 2026 của trường.',
  },
  {
    title: 'Data2: Điểm chuẩn PTIT 2021-2025',
    href: '#',
    description: 'Bảng 2: 13 ngành PTIT với điểm chuẩn 5 năm. Có Mã ngành, Tên ngành, ĐGNL/TN mỗi năm (2021,2022,2023,2024,2025). Ví dụ: AI 2025=1098/29.6, KHMT 2025=993/27.2.',
  },
  {
    title: 'TH1-TH4: 4 tổ hợp THPT',
    href: '#',
    description: 'TH1: Lý+Hóa+Sinh+CNNN | TH2: Tin+Hóa+Sinh+GDKT&PL | TH3: Lý+Tin+Địa+GDKT&PL | TH4: Lý+Hóa+Địa+CNCN. Mỗi TH có 4 môn tự chọn + 4 môn bắt buộc = 8 môn.',
  },
]

// Bảng 2: Điểm chuẩn PTIT 2021-2025
const tablePTITScores = (diemChuan.data?.[0]?.nganh || []).map(n => ({
  ma_nganh: n.ma_nganh,
  ten_nganh: n.ten_nganh,
  diem_2021: `${n.diem_theo_nam?.['2021']?.DGNL ?? '-'} / ${n.diem_theo_nam?.['2021']?.TN_THPT ?? '-'}`,
  diem_2022: `${n.diem_theo_nam?.['2022']?.DGNL ?? '-'} / ${n.diem_theo_nam?.['2022']?.TN_THPT ?? '-'}`,
  diem_2023: `${n.diem_theo_nam?.['2023']?.DGNL ?? '-'} / ${n.diem_theo_nam?.['2023']?.TN_THPT ?? '-'}`,
  diem_2024: `${n.diem_theo_nam?.['2024']?.DGNL ?? '-'} / ${n.diem_theo_nam?.['2024']?.TN_THPT ?? '-'}`,
  diem_2025: `${n.diem_theo_nam?.['2025']?.DGNL ?? '-'} / ${n.diem_theo_nam?.['2025']?.TN_THPT ?? '-'}`,
}))

export default function SubjectLookup() {
  const combinations = Array.isArray(toHopThptCaMau) ? toHopThptCaMau : []
  const comboCatalog = buildVerifiedCombinationCatalog(admissionsData)

  const [selectedTH, setSelectedTH] = useState(combinations[0] ?? null)

  const studentSubjects = buildStudentSubjectSet(selectedTH)

  const matchingCombos = findMatchingCombinations(selectedTH, comboCatalog)
    .map((combo) => {
      const { schools, featuredMajors } = getAdmissionsForCombination(combo, admissionsData)
      return {
        id: combo.id,
        anchorId: combo.id.replace(/[^a-z0-9]+/gi, '-'),
        code: combo.ma,
        info: combo,
        schools,
        hotMajors: featuredMajors,
        schoolCount: schools.length,
        majorCount: schools.reduce((total, school) => total + (school.majors?.length ?? 0), 0),
      }
    })

  return (
    <div className="lookup-page">
      <div className="lookup-container">
        <h1>Tra cứu tổ hợp môn, ngành học và điểm chuẩn</h1>

        <section className="lookup-section">
          <h2>Bước 1: Chọn tổ hợp TH1 / TH2 / TH3 / TH4</h2>
          <p className="instruction">
            Mỗi tổ hợp gồm 4 môn tự chọn, kết hợp với 4 môn bắt buộc (Toán, Ngữ văn, Tiếng Anh, Lịch sử) = 8 môn.
            Hệ thống hiển thị các tổ hợp đại học (3 môn) có tất cả môn nằm trong 8 môn của bạn.
          </p>
          <div className="combo-selection th-selection">
            {combinations.map((combo) => (
              <button
                key={combo.ma}
                className={`combo-btn ${selectedTH?.ma === combo.ma ? 'active' : ''}`}
                onClick={() => setSelectedTH(combo)}
              >
                <div className="btn-code">{combo.ma}</div>
                <div className="btn-subjects">{Array.isArray(combo.mon) ? combo.mon.join(' + ') : ''}</div>
              </button>
            ))}
          </div>
          {selectedTH && (
            <div className="combo-detail">
              <h3>{selectedTH.ma} - {Array.isArray(selectedTH.mon) ? selectedTH.mon.join(' + ') : ''}</h3>
              <p>{selectedTH.mo_ta ?? ''}</p>
              {selectedTH.so_lop && <p className="class-count">Số lớp: {selectedTH.so_lop}</p>}
              <div className="combo-info-badge">
                <span>4 môn bắt buộc: Toán, Ngữ văn, Tiếng Anh, Lịch sử</span>
                <span>4 môn tự chọn: {(Array.isArray(selectedTH.mon) ? selectedTH.mon : []).join(', ')}</span>
                <span>Tổng: {Array.from(studentSubjects).length} môn</span>
              </div>
            </div>
          )}
        </section>

        <section className="lookup-section">
          <h2>Bước 2: Tổ hợp đại học phù hợp</h2>
          <p className="instruction">Các tổ hợp đại học (mỗi tổ hợp 3 môn) có môn nằm trong nhóm {Array.from(studentSubjects).length} môn của bạn.</p>
          <div className="combo-catalog-stats">
            <div className="stat-card">
              <strong>Tổ hợp phù hợp</strong>
              <span>{matchingCombos.length} tổ hợp</span>
            </div>
            <div className="stat-card">
              <strong>Trường có dữ liệu</strong>
              <span>{new Set(matchingCombos.flatMap(c => c.schools.map(s => s.name))).size} trường</span>
            </div>
          </div>

          <div className="combo-results">
            {matchingCombos.map((combo) => (
              <article key={combo.id} id={`combo-${combo.anchorId}`} className="combo-detail-card">
                <div className="combo-detail-top">
                  <div>
                    <span className="combo-code chip">{combo.code}</span>
                    <p className="combo-subjects">{Array.isArray(combo.info?.mon) ? combo.info.mon.join(' + ') : ''}</p>
                  </div>
                  <button className="btn-info" onClick={() => window.location.hash = `#combo-${combo.anchorId}`}>Xem chi tiết</button>
                </div>
                <div className="combo-meta-grid">
                  <div className="meta-box">
                    <strong>Trường</strong>
                    <span>{combo.schoolCount > 0 ? `${combo.schoolCount} trường` : 'Chưa có dữ liệu'}</span>
                  </div>
                  <div className="meta-box">
                    <strong>Ngành</strong>
                    <span>{combo.majorCount > 0 ? `${combo.majorCount} ngành` : 'Chưa có dữ liệu'}</span>
                  </div>
                </div>

                <div className="hot-major-list">
                  {(combo.hotMajors ?? []).length > 0 ? (
                    (combo.hotMajors ?? []).map((major) => (
                      <div key={`${combo.id}-${major.school}-${major.code}`} className="hot-major-card">
                        <div className="major-row">
                          <strong>{major.name}</strong>
                          <span className="source-year-badge">Dữ liệu {major.source_year}</span>
                        </div>
                        <p>{major.school} · {major.location}</p>
                        <div className="trend-tags">
                          {(major.trend_tags ?? []).map((tag) => (
                            <span key={`${major.code}-${tag}`} className="trend-tag">{tag}</span>
                          ))}
                        </div>
                        {major.trend_reason && <p className="trend-reason">{major.trend_reason}</p>}
                      </div>
                    ))
                  ) : (
                    <div className="hot-major-card hot-major-empty">
                      <strong>Chưa có công bố chính thống</strong>
                      <p>Tổ hợp này chưa có ngành/trường được xác minh.</p>
                    </div>
                  )}
                </div>

                {combo.schools.length > 0 ? (
                  <div className="school-list">
                    {combo.schools.map((school) => (
                      <details key={school.name} className="school-detail">
                        <summary>
                          <span>{school.name}</span>
                          <span className="school-tag">{school.location} · {school.source_year}</span>
                        </summary>
                        <div className="major-list">
                          {Array.isArray(school.majors)
                            ? school.majors.map((major) => (
                                <div key={`${school.name}-${major.code}`} className="major-item">
                                  <div className="major-row">
                                    <strong>{major.name}</strong>
                                    <span>Mã ngành {major.code}</span>
                                  </div>
                                  {(major.matching_combination_codes ?? []).length > 0 && (
                                    <p>Mã tổ hợp trường sử dụng: {major.matching_combination_codes.join(', ')}</p>
                                  )}
                                  {major.trend_reason && <p className="trend-reason">{major.trend_reason}</p>}
                                </div>
                              ))
                            : null}
                        </div>
                        <a href={school.source_url} target="_blank" rel="noreferrer" className="source-link">
                          Mở nguồn tuyển sinh chính thức
                        </a>
                      </details>
                    ))}
                  </div>
                ) : (
                  <div className="pending-panel">
                    <strong>Chưa có dữ liệu chính thống</strong>
                    <p>Chưa tìm thấy bảng công bố cho tổ hợp này.</p>
                  </div>
                )}
              </article>
            ))}
          </div>

          {matchingCombos.length === 0 && (
            <p className="instruction">Không có tổ hợp đại học nào phù hợp với nhóm môn {selectedTH?.ma}.</p>
          )}
        </section>

        {/* Bảng điểm chuẩn tham khảo */}
        <section className="lookup-section tables-showcase">
          <h2>Bảng điểm chuẩn tham khảo</h2>
          <p className="instruction">Điểm chuẩn PTIT giai đoạn 2021-2025 được tổng hợp để tra cứu nhanh.</p>

          {/* Bảng 2: Điểm chuẩn PTIT */}
          <div className="table-wrapper">
            <h3 className="table-title">Bảng 2: Điểm chuẩn PTIT 2021-2025 (13 ngành)</h3>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã ngành</th>
                    <th>Tên ngành</th>
                    <th>2021</th>
                    <th>2022</th>
                    <th>2023</th>
                    <th>2024</th>
                    <th>2025</th>
                  </tr>
                </thead>
                <tbody>
                  {tablePTITScores.map((row) => (
                    <tr key={row.ma_nganh}>
                      <td className="ma-nganh">{row.ma_nganh}</td>
                      <td>{row.ten_nganh}</td>
                      <td className="score-cell">{row.diem_2021}</td>
                      <td className="score-cell">{row.diem_2022}</td>
                      <td className="score-cell">{row.diem_2023}</td>
                      <td className="score-cell">{row.diem_2024}</td>
                      <td className="score-cell highlight-2025">{row.diem_2025}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>

        <section className="lookup-section sources-box">
          <h2>Nguồn chính thức & Tham khảo</h2>
          <p>Dữ liệu chỉ hiển thị khi có công bố công khai từ trường.</p>
          <div className="source-grid">
            {officialSources.map((source) => (
              <a key={source.title} className="source-card" href={source.href} target="_blank" rel="noreferrer">
                <strong>{source.title}</strong>
                <span>{source.description}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
