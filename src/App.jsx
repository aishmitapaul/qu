
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddPlayerForm from './components/AddPlayerForm';
import QuizEngine from './components/QuizEngine';
import ScoreSummary from './components/ScoreSummary';
import Leaderboard from './components/Leaderboard';
import AboutPage from './components/AboutPage';
import quizImage from './assets/im.svg';
import './App.css';

export const AppContext = React.createContext();

export default function App() {
  const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('player')) || null);
  const [darkMode, setDarkMode] = useState(false);
  const clickSound = useRef(new Audio('/quiz-game-music-loop-bpm-90-61070.mp3'));

  const toggleTheme = () => {
    clickSound.current.currentTime = 0;
    clickSound.current.play();
    setDarkMode(prev => !prev);
  };


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <AppContext.Provider value={{ player, setPlayer }}>
      <div className={darkMode ? 'dark' : 'light'}>
        <button onClick={toggleTheme}>🎶</button>

        <BrowserRouter>
          <Navbar onToggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/add-player" element={<AddPlayerForm />} />
            <Route path="/quiz/start" element={<QuizEngine />} />
            <Route path="/score" element={<ScoreSummary />} />
            <Route path="/scores" element={<Leaderboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Welcome to Quiz Quizzer!</h1>
        <p>Tap . Guess . Win .</p>
      <button onClick={() => navigate('/add-player')}>Start Quiz</button>
        
      </div>
      <div className="hero-image">
        <img src={quizImage} alt="Quiz" width="400" />
      </div>
    </div>
  );
}