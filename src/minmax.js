import {winningCombinations} from './constants'

function isMovesLeft(gameState){
    return gameState.some(value => value === null);
}

function evaluate(gameState){
    for (const winningCombination of winningCombinations) {
        const [a, b, c] = winningCombination;
        if(gameState[a] === gameState[b] && gameState[b] === gameState[c] && gameState[a] !== null){
            // X is positive (Maximizer), O is negative (Minimizer)
            return gameState[a] === 'X' ? 10 : -10;
        }
    }
    return 0; 
}

function minMax(gameState, isMax){
    let score = evaluate(gameState);

    // If Maximizer (X) won, return score
    // If Minimizer (O) won, return score
    if(score === 10 || score === -10) return score;

    // If no more moves and no winner, it's a tie
    if(!isMovesLeft(gameState)) return 0;

    if(isMax){
        let best = -Infinity;
        for(let i=0; i<9; i++){
            if(gameState[i] === null){
                gameState[i] = 'X';
                best = Math.max(best, minMax(gameState, false));
                gameState[i] = null;
            }
        }
        return best;
    } else {
        let best = Infinity;
        for(let i=0; i<9; i++){
            if(gameState[i] === null){
                gameState[i] = 'O';
                best = Math.min(best, minMax(gameState, true));
                gameState[i] = null;
            }
        }
        return best;
    }
}

function getBestMove(gameState) {
    // Since Computer is 'O', we want the LOWEST possible score
    let bestScore = Infinity; 
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
        if (gameState[i] === null) {
            // 1. Make the move
            gameState[i] = 'O';
            
            // 2. Call minMax starting with 'true' because the next turn belongs to 'X'
            let score = minMax(gameState, true);
            
            // 3. Undo the move
            gameState[i] = null;

            // 4. Check if this score is better (lower) than our current best
            if (score < bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

export {getBestMove};