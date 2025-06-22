import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import { questions as allQuestions } from '../data/questions'

export default function QuizEngine() {
  const { player } = useContext(AppContext)
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)

  const filtered = allQuestions.filter(
    q => q.category === player.category && q.difficulty === player.difficulty
  );
  console.log(' Filtered questions:', filtered);
  console.log(' Current index:', index);
  console.log(' Currently selected option:', selected);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t === 1) {
          handleNext()
          return 15
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [index])

  const handleOptionClick = option => {
    if (selected) return
    setSelected(option)
    if (option === filtered[index].answer) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (index + 1 < filtered.length) {
      setIndex(i => i + 1)
      setSelected(null)
      setTimeLeft(15)
    } else {
      const history = JSON.parse(localStorage.getItem('history')) || []
      history.push({ name: player.name, score, date: new Date().toLocaleString() })
      localStorage.setItem('history', JSON.stringify(history))
      navigate('/score')
    }
  }

  if (!player) return <p>No player data</p>

  const q = filtered[index]

  return (
    <div className="question">
      <h2>{q.question}</h2>
      {q.options.map(opt => (
        <button
          key={opt}
          onClick={() => handleOptionClick(opt)}
          style={{
            background:
              selected === opt
                ? opt === q.answer ? 'green' : 'red'
                : ''
          }}
        >
          {opt}
        </button>
      ))}
      <p>Time left: {timeLeft}s</p>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}