import React from 'react';
import Cell from './Cell';
import './Board.css';

const Board = ({ board, onCellClick }) => {
  const alphabet = 'ABCDEFGHIJ'.split('');

  return (
    <div className="board">
      {/* Renderizar las letras para las columnas */}
      <div className="board-row">
        {/* Celda vacía para la esquina superior izquierda */}
        <div className="cell"></div>
        {alphabet.map((letter, index) => (
          <div key={index} className="cell">{letter}</div>
        ))}
      </div>
      {/* Renderizar las celdas del tablero */}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {/* Renderizar los números para las filas */}
          <div className="cell">{rowIndex + 1}</div>
          {row.map((cell, colIndex) => (
            // Agregar condición para las celdas de coordenadas
            <Cell
              key={colIndex}
              value={cell}
              className={rowIndex === 0 || colIndex === 0 ? "coord-cell" : "cell"}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
