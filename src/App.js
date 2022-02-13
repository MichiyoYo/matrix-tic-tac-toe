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
  const [announcement, setAnnouncement] = useState({
    message: "",
    freeze: false,
  });

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

  const checkTie = () => {
    let fullBoard = true;
    if (board[0].includes("") || board[1].includes("") || board[2].includes(""))
      fullBoard = false;
    if (fullBoard && result.status === "none") {
      setResult({ winner: "No One", status: "Tie" });
      return true;
    }
    return false;
  };

  const restart = () => {
    setBoard([
      new Array(3).fill(""),
      new Array(3).fill(""),
      new Array(3).fill(""),
    ]);
    setPlayer("❌");
    setResult({ winner: "none", status: "none" });
    setAnnouncement({ message: "", freeze: false });
  };

  const endGame = () => {
    let msg = "";
    if (result.status === "Won") {
      msg = `Player ${result.winner} ${result.status} 🔥`;
    }
    if (result.status === "Tie") {
      msg = `No one wins 😿`;
    }

    setAnnouncement({ message: msg, freeze: true });
  };

  useEffect(() => {
    if (!checkWinner() && !checkTie()) {
      nextTurn(player);
    }
  }, [board]);

  useEffect(() => {
    if (result.status !== "none") {
      endGame();
    }
  }, [result]);

  return (
    <div className="App">
      <div className="game">
        <h1>Tic Tac Toe</h1>
        {announcement.message && <h2>{announcement.message}</h2>}
        <div className={`board ${announcement.freeze ? "freeze" : ""}`}>
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
        <button onClick={() => restart()}>RESTART</button>
      </div>
    </div>
  );
}

export default App;
