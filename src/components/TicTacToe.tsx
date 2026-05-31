import { useState } from "react";

function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(
    Array(9).fill(null)
  );

  const [isXTurn, setIsXTurn] = useState<boolean>(true);

  const [playerX, setPlayerX] = useState<string>("");
  const [playerO, setPlayerO] = useState<string>("");

  const winner = calculateWinner(board);

  const isDraw =
    !winner && board.every((cell) => cell !== null);

  const handleClick = (index: number): void => {
    if (board[index] || winner) return;

    const newBoard = [...board];

    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe Game</h1>

      <div className="player-inputs">
        <input
          type="text"
          placeholder="Player X Name"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
        />

        <input
          type="text"
          placeholder="Player O Name"
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
        />
      </div>

      {winner ? (
        <h2>
          Winner:{" "}
          {winner === "X"
            ? playerX || "Player X"
            : playerO || "Player O"}
        </h2>
      ) : isDraw ? (
        <h2>Match Draw 🤝</h2>
      ) : (
        <h2>
          Turn:{" "}
          {isXTurn
            ? `${playerX || "Player X"} (X)`
            : `${playerO || "Player O"} (O)`}
        </h2>
      )}

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

      <button
        className="reset-btn"
        onClick={resetGame}
      >
        Reset Game
      </button>
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