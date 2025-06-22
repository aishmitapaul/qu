import React, { useState } from 'react';
import './Leaderboard.css';

export default function Leaderboard() {
  const [sort, setSort] = useState('score');
  const history = JSON.parse(localStorage.getItem('history')) || [];

  const sorted = [...history].sort((a, b) => b[sort] - a[sort]);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <div className="sort-buttons">
        <button onClick={() => setSort('score')}>Sort by Score</button>
        <button onClick={() => setSort('date')}>Sort by Time</button>
      </div>
      <div className="entries">
        {sorted.map((h, i) => (
          <div key={i} className="entry-card">
            <p><strong>{h.name}</strong></p>
            <p>Score: {h.score}</p>
            <p>{h.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}