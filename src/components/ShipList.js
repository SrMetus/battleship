import React, { useEffect } from 'react';

const ShipList = ({ ships, onSelectShip, orientation, onRotate, placedShips }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'R' || e.key === 'r') {
        onRotate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onRotate]);

  const handleDragStart = (e, ship) => {
    e.dataTransfer.setData('ship', JSON.stringify(ship));
  };

  return (
    <div className="ship-list">
      <h2>Barcos Disponibles</h2>
      <ul>
        {ships.map((ship, index) => (
          <li key={index}>
            <button
              draggable={!placedShips.some(placedShip => placedShip.name === ship.name)}
              onDragStart={(e) => handleDragStart(e, ship)}
              onClick={() => onSelectShip(ship)}
              style={{ backgroundColor: ship.color }}
            >
              {ship.name} ({orientation})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipList;
