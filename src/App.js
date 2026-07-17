import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './pages/Game/Game';
import StartPage from './pages/Start/StartPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route exact path="/" element={<StartPage /*user={user} logout={logout}*//>} />
            <Route exact path="/game" element={<Game /*logout={logout}*/ />} />
          </Routes>        
      </div>
    </Router>
  );
}

export default App;
