import SquareButton from "./SquareButton";

function BoardRow({ className, rowStart, squares, onSquareClick }) {
  const styleSquare = `border-4 border-solid border-blue-500 m-3 w-8 h-8`;
  return (
    <div className={className}>
      <SquareButton
        className={styleSquare}
        value={squares[rowStart]}
        squareClick={() => onSquareClick(rowStart)}
      />
      <SquareButton
        className={styleSquare}
        value={squares[rowStart + 1]}
        squareClick={() => onSquareClick(rowStart + 1)}
      />
      <SquareButton
        className={styleSquare}
        value={squares[rowStart + 2]}
        squareClick={() => onSquareClick(rowStart + 2)}
      />
    </div>
  );
}

export default function Board({
  winner,
  xNext,
  invalidMove,
  squares,
  onSquareClick,
}) {
  const styleBoardRow = `flex gap-1 m-1`;
  return (
    <>
      {winner ? (
        <h1>
          Winner is <i>{winner}</i>
        </h1>
      ) : invalidMove ? (
        <h1>
          Invalid Move <i>{invalidMove}</i>
        </h1>
      ) : xNext ? (
        <h1>
          Turn: Player <i>X</i>
        </h1>
      ) : (
        <h1>
          Turn: Player <i>0</i>
        </h1>
      )}
      <div className="border-double border-8 border-red-900 m-5 w-1/2 md:w-full">
        <BoardRow
          className={styleBoardRow}
          rowStart={0}
          squares={squares}
          onSquareClick={onSquareClick}
        />
        <BoardRow
          className={styleBoardRow}
          rowStart={3}
          squares={squares}
          onSquareClick={onSquareClick}
        />
        <BoardRow
          className={styleBoardRow}
          rowStart={6}
          squares={squares}
          onSquareClick={onSquareClick}
        />
      </div>
    </>
  );
}
