import React, { useState, useEffect } from 'react';
import './App.css';

interface Mode {
  field: number;
}

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

  function handleModeSelection(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedModeIndex(Number(event.target.value));
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

  const selectedMode = modes[selectedModeIndex];

  return (
    <div>
      <h1>StarNavi: Test task</h1>
      <div>
        <select value={selectedModeIndex} onChange={handleModeSelection}>
          <option value={-1}>Select a mode</option>
          {modes.map((mode, index) => (
            <option key={index} value={index}>Mode {index + 1} ({mode.field}x{mode.field})</option>
          ))}
        </select>
        <button onClick={handleStartClick} disabled={selectedModeIndex === -1}>Start</button>
      </div>
      {squares.length > 0 && (
        <div className="square-field" style={{
          gridTemplateColumns: `repeat(var(--cols, ${gridColumns}), min-content)`,
        }}>
          {squares.map((_, index) => (
            <div
              key={index}
              className={hoveredSquares.includes(index) ? "square blue" : "square"}
              onMouseEnter={() => handleSquareHover(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;