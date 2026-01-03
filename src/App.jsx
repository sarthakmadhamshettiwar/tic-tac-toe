import { useState, useEffect } from 'react'

import ToggleButton from './components/ToggleButton'
import Board from './components/Board'
import './App.css'
import {getQuote} from './utils'
function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameType, setGameType] = useState(0);  // 0 -> 2 player, 1 -> vs computer

  /*
  would it be wiser to do use onClick event listener on the button which toggles the
  gameType instead of using useEffect() to setGameState()? 
  => generally no. because the only aim of the gameType is to decide whether we are playing 
  a AI game or a multi-player game. But lets assume, we want to change the gameType using multiple 
  buttons / short-cuts. Then everytime we will need to copy-paste the same onClick() function. 

  Violation of DRY and single source of truth. 

  onClick() might have been better if we had multiple responsibilities for the gameType. 
  But there is nothing as such in our usecase.
  */
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
    <button className="motivate-btn" onClick={getQuote}>Motivate Me</button>
    </div>
  )
}

export default App
