import React from 'react';

interface Props {
  hoveredSquares: number[];
  cols: number;
}

function HoveredSquaresList({ hoveredSquares, cols }: Props) {
  return (
    <ul>
      {hoveredSquares.map(index => {
        const row = Math.floor(index / cols) + 1;
        const col = (index % cols) + 1;
        return (
          <li key={index}>
            Row: {row}, Column: {col}
          </li>
        );
      })}
    </ul>
  );
}

export default HoveredSquaresList;