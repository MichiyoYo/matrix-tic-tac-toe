import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Square from "./components/Square";
import PATTERNS from "./Patterns";

function App() {
  //using a matrix as a board
  const [board, setBoard] = useState([
    new Array(3).fill(""),
    new Array(3).fill(""),
    new Array(3).fill(""),
  ]);

  const [player, setPlayer] = useState("❌");
  const [result, setResult] = useState({ winner: "none", status: "none" });

  const chooseSlot = (i, j) => {
    let updatedBoard = [...board];
    if (updatedBoard[i][j] === "") {
      updatedBoard[i][j] = player;
      setBoard(updatedBoard);
    }
  };

  const nextTurn = (currentPlayer) => {
    setPlayer(currentPlayer === "❌" ? "⭕" : "❌");
  };

  const checkWinner = () => {
    PATTERNS.forEach((configuration) => {
      let i = configuration[0][0];
      let j = configuration[0][1];
      let slot = board[i][j];
      if (slot === "") return false;
      let fonudWinningPatter = true;

      configuration.forEach((couple) => {
        let x = couple[0];
        let y = couple[1];
        if (board[x][y] !== slot) fonudWinningPatter = false;
      });

      if (fonudWinningPatter) {
        setResult({
          winner: player,
          status: "Won",
        });
        return true;
      }
    });
  };

  useEffect(() => {
    if (!checkWinner()) nextTurn(player);
  }, [board]);

  return (
    <div className="App">
      <div className="game">
        <h1>Tic Tac Toe</h1>
        <div className="board">
          <div className="row">
            <Square val={board[0][0]} chooseSlot={() => chooseSlot(0, 0)} />
            <Square val={board[0][1]} chooseSlot={() => chooseSlot(0, 1)} />
            <Square val={board[0][2]} chooseSlot={() => chooseSlot(0, 2)} />
          </div>
          <div className="row">
            <Square val={board[1][0]} chooseSlot={() => chooseSlot(1, 0)} />
            <Square val={board[1][1]} chooseSlot={() => chooseSlot(1, 1)} />
            <Square val={board[1][2]} chooseSlot={() => chooseSlot(1, 2)} />
          </div>
          <div className="row">
            <Square val={board[2][0]} chooseSlot={() => chooseSlot(2, 0)} />
            <Square val={board[2][1]} chooseSlot={() => chooseSlot(2, 1)} />
            <Square val={board[2][2]} chooseSlot={() => chooseSlot(2, 2)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
