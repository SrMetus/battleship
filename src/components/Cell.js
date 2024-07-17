import React from 'react';

const Cell = ({ value, color, onClick, onDrop, onDragOver, isPlayerBoard, isEnemyBoard }) => {
  let cellStyle = { backgroundColor: 'bisque' };

  if (isPlayerBoard || isEnemyBoard) {
    if (value === 'X') {
      cellStyle.backgroundColor = 'red'; // Acierto
    } else if (value === 'O') {
      cellStyle.backgroundColor = 'gray'; // Fallo
    } else if (value === 'S' && isPlayerBoard) {
      cellStyle.backgroundColor = color;
    }
  }

  return (
    <div
      className="cell"
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={cellStyle}
    >
      {value ? null : ''}
    </div>
  );
};

export default Cell;
