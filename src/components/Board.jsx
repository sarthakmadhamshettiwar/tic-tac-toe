import Block from "./Blocks";
import {winningCombinations} from "../constants"
import {getBestMove} from "../minmax"
  
// function getMostRelevantIndex(gameState){ 
//     // for now it just returns the first unmarked index by itself
//     for(let i=0; i<9; i++){
//         if(!gameState[i])   return i;
//     }
//     return -1;
// }

function isWinningStateForCurrentPlayer(gameState){
    return winningCombinations.some(
        (winningCombination) => {
          const [a, b, c] = winningCombination;
          return (
            gameState[a] === gameState[b] &&
            gameState[b] === gameState[c] &&
            gameState[a] !== null
          );
        }
    );
}

function Board({gameState, currentPlayer, setGameState, setCurrentPlayer, gameType}) {
    function handleBlockClickForSinglePlayerGame(index){
        // player making a move
        if(gameState[index] !== null)   return;
        // step 0: first move will be made by the user (lets assume for now)
        const gameStateCopy = Array.from(gameState);
        gameStateCopy[index] = currentPlayer;

        // step 1: check if the user won the game
        const isWinningStateForPlayer = isWinningStateForCurrentPlayer(gameStateCopy);

        setGameState(gameStateCopy);
        if (isWinningStateForPlayer) {
            alert(`${currentPlayer} has won the game`);
            // Optionally, you could return here to freeze the state after win
            return;
        }

        // AI making a move
        const mostRelevantIndex = getBestMove(gameStateCopy);
        if(mostRelevantIndex === -1){
            alert(`game drawn`);
        }

        gameStateCopy[mostRelevantIndex] = 'O';

        const isWinningStateForAI = isWinningStateForCurrentPlayer(gameStateCopy)

        setGameState(gameStateCopy);
        if(isWinningStateForAI){
            alert(`AI won the game`);
            return;
        }
    }

    function handleBlockClickForMultiPlayerGame(index){
        // Don't allow move if block already filled or game already won
        if (gameState[index] !== null) return;
    
        // Prepare the next state
        const gameStateCopy = Array.from(gameState);
        gameStateCopy[index] = currentPlayer;
    
        // Check for winning state using the upcoming state
        const isWinningState = isWinningStateForCurrentPlayer(gameStateCopy);
    
        setGameState(gameStateCopy);
    
        if (isWinningState) {
          alert(`${currentPlayer} has won the game`);
          // Optionally, you could return here to freeze the state after win
          return;
        }
    
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    const handleBlockClick = (index) =>  gameType === 1 ? 
                                handleBlockClickForSinglePlayerGame(index) :
                                handleBlockClickForMultiPlayerGame(index);
    return (
    <div className="board-container">
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
    </div>
    )
}


export default Board;