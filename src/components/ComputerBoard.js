import React, { useEffect, useState } from 'react';
import Board from './Board';

const ComputerBoard = ({ ships }) => {
  const initialBoard = Array(10).fill(null).map(() => Array(10).fill(null));
  const [computerBoard, setComputerBoard] = useState(initialBoard);

  useEffect(() => {
    placeComputerShips();
  }, []);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const canPlaceShip = (board, ship, row, col, orientation) => {
    for (let i = 0; i < ship.size; i++) {
      let x = row + (orientation === 'vertical' ? i : 0);
      let y = col + (orientation === 'horizontal' ? i : 0);
      if (x >= 10 || y >= 10 || board[x][y]) {
        return false;
      }
    }
    return true;
  };

  const placeShip = (board, ship, row, col, orientation) => {
    let newBoard = board.map(row => [...row]);
    for (let i = 0; i < ship.size; i++) {
      let x = row + (orientation === 'vertical' ? i : 0);
      let y = col + (orientation === 'horizontal' ? i : 0);
      newBoard[x][y] = { ship: ship.name, color: ship.color };
    }
    return newBoard;
  };

  const placeComputerShips = () => {
    let newBoard = initialBoard.map(row => [...row]);
    ships.forEach(ship => {
      let placed = false;
      while (!placed) {
        let row = getRandomInt(10);
        let col = getRandomInt(10);
        let orientation = getRandomInt(2) === 0 ? 'horizontal' : 'vertical';
        if (canPlaceShip(newBoard, ship, row, col, orientation)) {
          newBoard = placeShip(newBoard, ship, row, col, orientation);
          placed = true;
        }
      }
    });
    setComputerBoard(newBoard);
  };

  return (
    <div className="board-container">
      <h2>Computer's Board</h2>
      <Board
        board={computerBoard}
        isPlayerBoard={false}
      />
    </div>
  );
};

export default ComputerBoard;
