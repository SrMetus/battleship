import React from 'react';

const Cell = ({ value, color, onClick, onDrop, onDragOver, onContextMenu }) => {
  return (
    <div
      className="cell"
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onContextMenu={onContextMenu}
      style={{ backgroundColor: color || 'bisque' }}
    >
      {value ? null : ''}
    </div>
  );
};

export default Cell;
