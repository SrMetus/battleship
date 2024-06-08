import React, { useState } from 'react';
import Board from './components/Board';
import ShipList from './components/ShipList';
import './App.css';

function App() {
  const ships = [
    { name: 'Portaaviones' },
    { name: 'Destructor' },
    { name: 'Submarino' },
    { name: 'Acorazado' }
  ];
  
  const [selectedShip, setSelectedShip] = useState(null);
  
  const handleSelectShip = (ship) => {
    setSelectedShip(ship);
  };
  
  const initialBoard = Array(10).fill(Array(10).fill(null));
  const [board, setBoard] = useState(initialBoard);

  const handleCellClick = (rowIndex, colIndex) => {
    console.log(`Clicked cell at row ${rowIndex}, col ${colIndex}`);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Battleship</h1>
      <div className="content-container">
        <div className="ship-list-container">
          <ShipList ships={ships} onSelectShip={handleSelectShip} />
        </div>
        <div className="board-container">
          <Board board={board} onCellClick={handleCellClick} />
        </div>
      </div>
    </div>
  );
}

export default App;
