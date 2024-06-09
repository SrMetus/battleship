import React, { useState } from 'react';
import Board from './components/Board';
import ShipList from './components/ShipList';
import './App.css';

function App() {
  const ships = [
    { name: 'Portaaviones', size: 5, color: 'red' },
    { name: 'Destructor', size: 4, color: 'green' },
    { name: 'Submarino', size: 3, color: 'blue' },
    { name: 'Acorazado', size: 2, color: 'yellow' },
  ];

  const [selectedShip, setSelectedShip] = useState(null);
  const [orientation, setOrientation] = useState('horizontal');
  const initialBoard = Array(10).fill(Array(10).fill(null));
  const [board, setBoard] = useState(initialBoard);

  const handleSelectShip = (ship) => {
    setSelectedShip(ship);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    console.log(`Clicked cell at row ${rowIndex}, col ${colIndex}`);
  };

  const handleRotate = () => {
    setOrientation(orientation === 'horizontal' ? 'vertical' : 'horizontal');
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Battleship</h1>
      <div className="content-container">
        <div className="ship-list-container">
          <ShipList
            ships={ships}
            onSelectShip={handleSelectShip}
            orientation={orientation}
            onRotate={handleRotate}
          />
        </div>
        <div className="board-container">
          <Board
            board={board}
            onCellClick={handleCellClick}
            setBoard={setBoard}
            orientation={orientation}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
