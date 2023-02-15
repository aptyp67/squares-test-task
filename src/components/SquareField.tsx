import React from 'react';

interface Props {
  squares: JSX.Element[];
  hoveredSquares: number[];
  gridColumns: number;
  handleSquareHover: (index: number) => void;
}

export const SquareField = ({
  squares,
  hoveredSquares,
  gridColumns,
  handleSquareHover,
}: Props) => {
  return (
    <>
      {squares.length > 0 && (
        <div className="square-field" style={{ "--cols": gridColumns } as React.CSSProperties}>
          {squares.map((_, index) => (
            <div
              key={index}
              className={hoveredSquares.includes(index) ? "square blue" : "square"}
              onMouseEnter={() => handleSquareHover(index)}
            />
          ))}
        </div>
      )}
    </>
  );
};