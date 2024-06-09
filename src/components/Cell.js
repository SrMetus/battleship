import React from 'react';

const Cell = ({ value, onClick, onDrop, onDragOver, orientation, color }) => {
  return (
    <div
      className={`cell ${color ? 'occupied' : ''} ${orientation === 'vertical' ? 'vertical' : 'horizontal'}`}
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{ backgroundColor: color }} // Aplicar el color de fondo
    >
    </div>
  );
};

export default Cell;
