import React from 'react';

const Cell = ({ value, color, onClick, onDrop, onDragOver, isPlayerBoard, isEnemyBoard, shotResult }) => {
  let cellStyle = { backgroundColor: 'bisque' };

  if (isEnemyBoard) {
    if (shotResult === 'hit') {
      cellStyle.backgroundColor = 'red';
    } else if (shotResult === 'miss') {
      cellStyle.backgroundColor = 'gray';
    }
  } else {
    if (value) {
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
