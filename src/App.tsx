import React, { useState, useEffect } from 'react';
import './App.css';

interface Mode {
  field: number;
}

function App() {
  const [modes, setModes] = useState<Mode[]>([]);
  const [selectedMode, setSelectedMode] = useState<number>(-1);
  const [squares, setSquares] = useState<JSX.Element[]>([]);
  const [hoveredSquares, setHoveredSquares] = useState<number[]>([]);

  useEffect(() => {
    fetchModes();
  }, []);

  function fetchModes() {
    fetch("https://demo7919674.mockable.io")
      .then(response => response.json())
      .then(setModes)
      .catch(console.error);
  }

  function handleModeSelection(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedMode(parseInt(event.target.value));
  }

  function handleStartClick() {
    if (selectedMode !== -1) {
      const fieldSize = modes[selectedMode].field;
      const newSquares = Array(fieldSize * fieldSize).fill(null)
      setSquares(newSquares);
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
      <div>
        <select value={selectedMode} onChange={handleModeSelection}>
          <option value={-1}>Select a mode</option>
          {modes.map((mode, index) => (
            <option key={index} value={index}>Mode {index + 1} ({mode.field}x{mode.field})</option>
          ))}
        </select>
        <button onClick={handleStartClick}>Start</button>
      </div>
      {squares.length > 0 && (
        <div className="square-field">
          {squares.map((_, index) => (
            <div
              key={index}
              className={hoveredSquares.includes(index) ? "square blue" : "square"}
              onMouseEnter={() => handleSquareHover(index)}
            >
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;