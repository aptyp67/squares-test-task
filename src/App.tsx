import React, { useState, useEffect } from 'react';
import { Mode } from './types';
import { ModeSelect } from './components/ModeSelect';
import HoveredSquaresList from './components/HoveredSquaresList';
import { SquareField } from './components/SquareField';
import './App.css';

function App() {
  const [modes, setModes] = useState<Mode[]>([]);
  const [selectedModeIndex, setSelectedModeIndex] = useState<number>(-1);
  const [squares, setSquares] = useState<JSX.Element[]>([]);
  const [hoveredSquares, setHoveredSquares] = useState<number[]>([]);
  const [gridColumns, setGridColumns] = useState<number>(5);

  useEffect(() => {
    fetchModes();
  }, []);

  async function fetchModes() {
    try {
      const response = await fetch("https://demo7919674.mockable.io");
      const modes = await response.json();
      setModes(modes);
    } catch (error) {
      console.error(error);
    }
  }

  function handleStartClick() {
    if (selectedModeIndex !== -1) {
      const fieldSize = modes[selectedModeIndex].field;
      const newSquares = Array(fieldSize * fieldSize).fill(null);
      setSquares(newSquares);
      setGridColumns(fieldSize);
      setHoveredSquares([]);
    }
  }

  function handleSquareHover(index: number) {
    if (hoveredSquares.includes(index)) {
      const newHoveredSquares = hoveredSquares.filter(i => i !== index);
      setHoveredSquares(newHoveredSquares);
    } else {
      setHoveredSquares([...hoveredSquares, index]);
    }
  }

  return (
    <div>
      <h1>StarNavi: Test task</h1>
      <ModeSelect
        modes={modes}
        selectedModeIndex={selectedModeIndex}
        handleModeSelection={setSelectedModeIndex}
        handleStartClick={handleStartClick}
      />
      <SquareField
        squares={squares}
        hoveredSquares={hoveredSquares}
        gridColumns={gridColumns}
        handleSquareHover={handleSquareHover}
      />
      <HoveredSquaresList
        hoveredSquares={hoveredSquares}
        cols={gridColumns}
      />
    </div>
  );
}



export default App;