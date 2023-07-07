import Board from "./Board";
import { useState } from "react";

let history = [Array(9).fill(null)];
let lsv = 0;

function GameHistory({ onUndo, onRedo, onHistory, showHistory }) {
  const styleButton = `border-solid hover:border-red-900 hover:white border-4 rounded-md p-3 m-3`;

  return (
    <>
      <div>
        <button className={styleButton} onClick={onUndo}>
          Undo
        </button>
        <button className={styleButton} onClick={onRedo}>
          Redo
        </button>
        <button className={styleButton} onClick={onHistory}>
          History
        </button>
      </div>
      {showHistory && (
        <div>
          <ul>{showHistory}</ul>
        </div>
      )}
    </>
  );
}

export default function Game() {
  const [squares, setSquares] = useState(history[lsv]);
  const [invalidMove, setInvalidMove] = useState(null);
  const [showHistory, setShowHistory] = useState(null);
  const winner = calculateWinner(squares);

  function handleClick(idx) {
    if (squares[idx] || winner) {
      setInvalidMove("Square Already Filled");
      return;
    }
    const newSquares = squares.slice();
    if (lsv % 2 === 0) {
      newSquares[idx] = "X";
    } else {
      newSquares[idx] = "0";
    }
    setInvalidMove(null);
    setSquares(newSquares);
    // setXnext(!xNext);

    if (lsv < history.length - 1) {
      history = history.slice(0, lsv + 1);
    }

    history.push(newSquares);
    lsv += 1;
  }

  async function handleUndo() {
    if (lsv < 1) {
      return setInvalidMove("No More Undos");
    }
    lsv -= 1;
    setSquares(history[lsv]);
    setInvalidMove(null);
  }
  async function handleRedo() {
    if (lsv >= history.length - 1) {
      return setInvalidMove("No More Redos");
    }
    lsv += 1;
    setSquares(history[lsv]);
    setInvalidMove(null);
  }

  function onHistory() {
    if (showHistory) {
      setShowHistory(null);
    } else {
      setShowHistory(
        history.map((v, i) => {
          return (
            <li
              className="border rounded-lg p-5"
              id={i + 1}
              onClick={() => {
                lsv = i;
                setSquares(history[lsv]);
                setShowHistory(null);
              }}
            >
              Game History at <strong>#{i}</strong> Move
            </li>
          );
        })
      );
    }
  }

  return (
    <div className="md:flex gap-10 justify-center m-3">
      <div>
        <Board
          winner={winner}
          xNext={lsv % 2 === 0}
          invalidMove={invalidMove}
          squares={squares}
          onSquareClick={handleClick}
        />
      </div>
      <div>
        <GameHistory
          onUndo={handleUndo}
          onRedo={handleRedo}
          onHistory={onHistory}
          showHistory={showHistory}
        />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  let winner = null;
  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winners.length; i++) {
    const [a, b, c] = winners[i];
    //Square[a] == X or 0
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = squares[a];
    }
  }

  return winner;
}
