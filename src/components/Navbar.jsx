import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

export default function Navbar({onToggleTheme}) {
  return (
    <nav className="navbar">
      <ul className="nav-links">
     <li> <Link to="/">Home</Link></li>
     <li> <Link to="/add-player">Start Quiz</Link></li>
      <li><Link to="/scores">Leaderboard</Link></li>
     <li><Link to="/about">About</Link></li>
     </ul>
     <button className="toggle-btn" onClick={onToggleTheme}>🌙</button>
    </nav>
  )
}