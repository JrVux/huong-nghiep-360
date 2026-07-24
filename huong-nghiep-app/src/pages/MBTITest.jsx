import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mbtiData from '../data/mbti_questions.json'
import '../styles/Test.css'

export default function MBTITest() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0
  })
  const [answers, setAnswers] = useState([])
  const [showProgress, setShowProgress] = useState(true)

  const questions = mbtiData.cau_hoi
  const total = questions.length

  const handleAnswer = (value) => {
    const question = questions[currentQuestion]
    const adjustedValue = (question.chieu === 1) ? value : (6 - value)
    
    const nextScores = {
      ...scores,
      [question.truc]: scores[question.truc] + adjustedValue
    }

    setAnswers([...answers, { questionId: question.id, value: adjustedValue }])
    setScores(nextScores)

    if (currentQuestion < total - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Hoàn thành bài test
      calculateMBTIType(nextScores)
    }
  }

  const calculateMBTIType = (finalScores) => {
    const EI = finalScores.EI > 37.5 ? 'E' : 'I'
    const SN = finalScores.SN > 37.5 ? 'S' : 'N'
    const TF = finalScores.TF > 37.5 ? 'T' : 'F'
    const JP = finalScores.JP > 37.5 ? 'J' : 'P'
    
    const mbtiType = EI + SN + TF + JP
    navigate(`/mbti/results/${mbtiType}`)
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
          <h2>Trắc nghiệm MBTI</h2>
          <p className="instruction">{mbtiData.huong_dan}</p>
          
          <div className="question-card">
            <p className="question-text">{question.text}</p>
            
            <div className="likert-scale">
              {mbtiData.thang_diem.map((label, index) => (
                <button
                  key={index}
                  className="likert-btn"
                  onClick={() => handleAnswer(index + 1)}
                  title={label}
                >
                  <span className="likert-value">{index + 1}</span>
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
