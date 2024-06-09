import React from 'react';
import Cell from './Cell';
import './Board.css';

const Board = ({ board, onCellClick, setBoard, orientation, placedShips, setPlacedShips }) => {
  const alphabet = 'ABCDEFGHIJ'.split('');

  const handleDrop = (e, rowIndex, colIndex) => {
    e.preventDefault();
    const ship = JSON.parse(e.dataTransfer.getData('ship'));
    console.log(`Dropped ship: ${ship.name} at row ${rowIndex}, col ${colIndex}`);

    const newBoard = board.map(row => [...row]);
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
      setPlacedShips([...placedShips, { name: ship.name }]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRightClick = (e, rowIndex, colIndex) => {
    e.preventDefault();
    const cell = board[rowIndex][colIndex];
    if (cell && cell.ship) {
      const newBoard = board.map(row => [...row]);
      const shipName = cell.ship;

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (newBoard[i][j] && newBoard[i][j].ship === shipName) {
            newBoard[i][j] = null;
          }
        }
      }

      setBoard(newBoard);
      setPlacedShips(placedShips.filter(ship => ship.name !== shipName));
    }
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
              onClick={() => onCellClick(rowIndex, colIndex)}
              onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
              onDragOver={handleDragOver}
              onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
              ship={cell ? cell.ship : null}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
