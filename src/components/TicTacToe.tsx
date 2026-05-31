import { useState } from "react";

function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(
    Array(9).fill(null)
  );

  const [isXTurn, setIsXTurn] = useState<boolean>(true);

  const handleClick = (index: number): void => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const winner = calculateWinner(board);

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe Game By Ashish Kumar Mishra</h1>

      <h2>
        {winner
          ? `Winner: ${winner}`
          : `Turn: ${isXTurn ? "X" : "O"}`}
      </h2>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <button onClick={resetGame}>Reset</button>
    </div>
  );
}

function calculateWinner(
  board: (string | null)[]
): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
}

export default TicTacToe;