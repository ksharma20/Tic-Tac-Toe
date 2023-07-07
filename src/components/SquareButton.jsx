export default function SquareButton({ className, value, squareClick }) {
  return (
    <>
      <button className={className} onClick={squareClick}>
        {value}
      </button>
    </>
  );
}
