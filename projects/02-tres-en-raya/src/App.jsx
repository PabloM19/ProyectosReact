import { useState } from 'react'
import {TURNS, WINNER_COMBOS} from './constants'

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = isSelected ? 'square is-selected' : 'square';

  const handleClick = () => {
    updateBoard(index)
  }

  return (
  <div onClick={handleClick} className={className}>{children}</div>
)
}

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.PLAYER1)

  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }

const resetGame = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.PLAYER1)
  setWinner(null)
}

const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((square) => square !== null)
}

const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.PLAYER1 ? TURNS.PLAYER2 : TURNS.PLAYER1
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
}

  return (
    <main className='board'>
      <h1>❌ tres en raya ⭕</h1>
      <section className="game">
        {
          board.map((_, index) => (
            <Square key={index} index={index} updateBoard={updateBoard}>{board[index]}</Square>
          ))
        }
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.PLAYER1}>{TURNS.PLAYER1}</Square>
        <Square isSelected={turn == TURNS.PLAYER2}>{TURNS.PLAYER2}</Square>
      </section>
      <br/>
      <button onClick={resetGame}>Reiniciar</button>
      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? 'Empate' : 'Ganó: '
                }
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>
                  Reiniciar
                </button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
