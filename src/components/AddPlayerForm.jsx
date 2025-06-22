import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

export default function AddPlayerForm() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const navigate = useNavigate()
  const { setPlayer } = useContext(AppContext)

  const handleSubmit = e => {
    e.preventDefault()
    const data = { name, category, difficulty }
    localStorage.setItem('player', JSON.stringify(data))
    setPlayer(data)
    navigate('/quiz/start')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Player Name" value={name} onChange={e => setName(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
        <option value="Film">Film</option>
        <option value="Economics">Economics</option>
      </select>
      <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
        <option value="">Select Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Hard">Hard</option>
      </select>
      <button disabled={!name || !category || !difficulty}>Start</button>
    </form>
  )
}