import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import hollandData from '../data/holland_questions.json'
import '../styles/Test.css'

export default function HollandTest() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0
  })
  const [answers, setAnswers] = useState([])
  const [showProgress, setShowProgress] = useState(true)

  const questions = hollandData.cau_hoi
  const total = questions.length

  const handleAnswer = (value) => {
    const question = questions[currentQuestion]
    
    const nextScores = {
      ...scores,
      [question.nhom]: scores[question.nhom] + value
    }

    setAnswers([...answers, { questionId: question.id, value }])
    setScores(nextScores)

    if (currentQuestion < total - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Hoàn thành bài test
      calculateHollandType(nextScores)
    }
  }

  const calculateHollandType = (finalScores) => {
    // Sắp xếp các điểm theo thứ tự giảm dần
    const sorted = Object.entries(finalScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3) // Lấy top 3
      .map(entry => entry[0])
      .join('')
    
    navigate(`/holland/results/${sorted}`)
  }

  const handleSkip = () => {
    if (currentQuestion < total - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / total) * 100

  return (
    <div className="test-page">
      <div className="test-container">
        {showProgress && (
          <div className="progress-section">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="progress-text">Câu {currentQuestion + 1}/{total}</p>
            <button className="btn-close-progress" onClick={() => setShowProgress(false)}>✕</button>
          </div>
        )}

        <div className="question-section">
          <h2>Trắc nghiệm Holland - RIASEC</h2>
          <p className="instruction">{hollandData.huong_dan}</p>
          
          <div className="question-card">
            <p className="question-text">{question.text}</p>
            
            <div className="likert-scale">
              {hollandData.thang_diem.map((label, index) => (
                <button
                  key={index}
                  className="likert-btn"
                  onClick={() => handleAnswer(hollandData.gia_tri[index])}
                  title={label}
                >
                  <span className="likert-value">{hollandData.gia_tri[index]}</span>
                  <span className="likert-label">{label}</span>
                </button>
              ))}
            </div>

            <button className="btn-skip" onClick={handleSkip}>Bỏ qua</button>
          </div>
        </div>
      </div>
    </div>
  )
}
