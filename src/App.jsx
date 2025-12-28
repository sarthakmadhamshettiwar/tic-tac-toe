import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Block from './components/Blocks'
import './App.css'

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  function handleBlockClick(index){
    // Don't allow move if block already filled or game already won
    if (gameState[index] !== null) return;

    // Prepare the next state
    const gameStateCopy = Array.from(gameState);
    gameStateCopy[index] = currentPlayer;

    // Check for winning state using the upcoming state
    const isWinningState = winningCombinations.some(
      (winningCombination) => {
        const [a, b, c] = winningCombination;
        return (
          gameStateCopy[a] === gameStateCopy[b] &&
          gameStateCopy[b] === gameStateCopy[c] &&
          gameStateCopy[a] !== null
        );
      }
    );

    setGameState(gameStateCopy);

    if (isWinningState) {
      alert(`${currentPlayer} has won the game`);
      // Optionally, you could return here to freeze the state after win
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }


  return (
    <>
    <div className="row">
    <Block value={gameState[0]} onClick={() => handleBlockClick(0)} />
    <Block value={gameState[1]} onClick={() => handleBlockClick(1)} />
    <Block value={gameState[2]} onClick={() => handleBlockClick(2)} />
    </div>
    <div className="row">
    <Block value={gameState[3]} onClick={() => handleBlockClick(3)} />
    <Block value={gameState[4]} onClick={() => handleBlockClick(4)} />
    <Block value={gameState[5]} onClick={() => handleBlockClick(5)} />
    </div>
    <div className="row">
    <Block value={gameState[6]} onClick={() => handleBlockClick(6)} />
    <Block value={gameState[7]} onClick={() => handleBlockClick(7)} />
    <Block value={gameState[8]} onClick={() => handleBlockClick(8)} />
    </div>
    </>
  )
}

export default App
