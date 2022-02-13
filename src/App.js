import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Square from "./components/Square";

function App() {
  //using a matrix as a board
  const [board, setBoard] = useState([
    new Array(3).fill(""),
    new Array(3).fill(""),
    new Array(3).fill(""),
  ]);

  const [player, setPlayer] = useState("❌");

  const chooseSlot = (i, j) => {
    let updatedBoard = [...board];
    if (board[i][j] === "") {
      updatedBoard[i][j] = player;
      setBoard(updatedBoard);
      nextTurn(player);
    }
  };

  const nextTurn = (currentPlayer) => {
    setPlayer(currentPlayer === "❌" ? "⭕" : "❌");
  };

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
