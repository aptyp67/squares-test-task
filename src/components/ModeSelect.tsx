import React from 'react';
import { Mode } from '../types';

interface Props {
  modes: Mode[];
  selectedModeIndex: number;
  handleModeSelection: (index: number) => void;
  handleStartClick: () => void;
}

export const ModeSelect = ({
  modes,
  selectedModeIndex,
  handleModeSelection,
  handleStartClick,
}: Props) => {
  return (
    <div>
      <select value={selectedModeIndex} onChange={e => handleModeSelection(Number(e.target.value))}>
        <option value={-1}>Select a mode</option>
        {modes.map((mode, index) => (
          <option key={index} value={index}>Mode {index + 1} ({mode.field}x{mode.field})</option>
        ))}
      </select>
      <button onClick={handleStartClick} disabled={selectedModeIndex === -1}>Start</button>
    </div>
  );
}