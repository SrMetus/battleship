import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import './Board.css';

const Board = ({ board, onCellClick, setBoard, orientation, placedShips, setPlacedShips, isPlayerBoard }) => {
  const alphabet = 'ABCDEFGHIJ'.split('');

  const [opponentBoard, setOpponentBoard] = useState(Array(10).fill(null).map(() => Array(10).fill(null)));

  const handleDrop = (e, rowIndex, colIndex) => {
    e.preventDefault();
    //console.log("Ship data:", e.dataTransfer.getData('ship'));
    const ship = JSON.parse(e.dataTransfer.getData('ship'));
    //console.log("Ship:", ship);
    let newBoard = board.map(row => [...row]);
    //console.log("Initial board:", newBoard);
    let canPlace = true;

    for (let i = 0; i < ship.size; i++) {
      let x = rowIndex + (orientation === 'vertical' ? i : 0);
      let y = colIndex + (orientation === 'horizontal' ? i : 0);
      if (x >= 10 || y >= 10 || newBoard[x][y]) {
        canPlace = false;
        break;
      }
    }

    if (canPlace) {
      for (let i = 0; i < ship.size; i++) {
        let x = rowIndex + (orientation === 'vertical' ? i : 0);
        let y = colIndex + (orientation === 'horizontal' ? i : 0);
        newBoard[x][y] = { ship: ship.name, color: ship.color };
      }
      setBoard(newBoard);
      setPlacedShips([...placedShips, ship.name]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (!isPlayerBoard) {
      return;
    }

    if (opponentBoard[rowIndex][colIndex] !== null) {
      return;
    }

    // Actualizacion del tablero despues de un disparo.
    let newOpponentBoard = opponentBoard.map(row => [...row]);
    const shotResult = board[rowIndex][colIndex] ? 'hit' : 'miss';
    newOpponentBoard[rowIndex][colIndex] = shotResult;
    setOpponentBoard(newOpponentBoard);

    onCellClick(rowIndex, colIndex);
  };

  return (
    <div className="board">
      <div className="board-row">
        <div className="cell coord-cell"></div>
        {alphabet.map((letter, index) => (
          <div key={index} className="cell coord-cell">{letter}</div>
        ))}
      </div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          <div className="cell coord-cell">{rowIndex + 1}</div>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              value={cell ? cell.ship : null}
              color={cell ? cell.color : null}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
              onDragOver={handleDragOver}
              isPlayerBoard={isPlayerBoard}
              shotResult={isPlayerBoard ? opponentBoard[rowIndex][colIndex] : null}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
