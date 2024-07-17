import React from 'react';
import Cell from './Cell';

const Board = ({ board, onCellClick, isPlayerBoard, isEnemyBoard, ships }) => {
  const renderCell = (cell, rowIndex, colIndex) => {
    let cellClass = 'cell';
    let shipColor = null;

    if (cell === 'S' && isPlayerBoard) {
      const shipInCell = ships.find(ship => ship.coordinates.some(coord => coord.row === rowIndex && coord.col === colIndex));
      if (shipInCell) {
        shipColor = shipInCell.color;
      }
      cellClass += ' ship';
    } else if (cell === 'X') {
      cellClass += ' hit';
    } else if (cell === 'O') {
      cellClass += ' miss';
    }

    if (shipColor) {
      cellClass += ` ${shipColor}`;
    }

    return (
      <Cell
        key={`${rowIndex}-${colIndex}`}
        value={cell}
        color={shipColor}
        onClick={() => onCellClick(rowIndex, colIndex, isEnemyBoard)}
        isPlayerBoard={isPlayerBoard}
        isEnemyBoard={isEnemyBoard}
      />
    );
  };

  const renderCoordinateCell = (label, index) => (
    <div key={index} className="coord-cell">
      {label}
    </div>
  );

  return (
    <div className="board">
      <div className="board-row">
        {renderCoordinateCell('', 'coord-empty')}
        {Array.from({ length: 10 }, (_, colIndex) =>
          renderCoordinateCell(String.fromCharCode(65 + colIndex), `col-${colIndex}`)
        )}
      </div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {renderCoordinateCell(rowIndex + 1, `row-${rowIndex}`)}
          {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
        </div>
      ))}
    </div>
  );
};


export default Board;
