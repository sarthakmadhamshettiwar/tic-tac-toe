import { useState, useEffect } from 'react'

import ToggleButton from './components/ToggleButton'
import Board from './components/Board'
import './App.css'

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameType, setGameType] = useState(0);  // 0 -> 2 player, 1 -> vs computer

  useEffect(() => {
    // whenever the gameType changes => reset the game
    setGameState(Array(9).fill(null));
  }, [gameType]);

  return (
    <div className="app-container">
      <h3>{gameType === 0 ? "2 player game" : "playing vs AI"}</h3>
      <ToggleButton gameType={gameType} onClick={() => {
        setGameType(1 - gameType)
        console.log("button was clicked")
      }} />
    <Board gameState={gameState} currentPlayer={currentPlayer} setGameState={setGameState} setCurrentPlayer={setCurrentPlayer} gameType={gameType}/>
    </div>
  )
}

export default App
