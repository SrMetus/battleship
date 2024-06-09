import React from 'react';

const Cell = ({ value, onClick, onDrop, onDragOver, orientation }) => {
  return (
    <div
      className={`cell ${orientation === 'vertical' ? 'vertical' : 'horizontal'}`}
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {value}
    </div>
  );
};

export default Cell;
