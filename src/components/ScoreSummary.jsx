import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import './ScoreSummary.css';

export default function ScoreSummary() {
  const { player } = useContext(AppContext);
  const navigate = useNavigate();
  const history = JSON.parse(localStorage.getItem('history')) || [];
  const latest = history[history.length - 1];

  if (!latest) return <p>No score data found.</p>;

  return (
    <div className="score-summary">
      <h1>Well done, {latest.name}!</h1>
      <div className="score-card">
        <p className="big-score">{latest.score}</p>
        <p className="message">
          {latest.score > 1 ? 'Quiz Champion!' : 'Keep practicing!'}
        </p>
        <button onClick={() => navigate('/')}>Play Again</button>
      </div>
    </div>
  );
}