import React, { useEffect } from 'react';

const ShipList = ({ ships, onSelectShip, orientation, onRotate }) => {
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
              draggable
              onDragStart={(e) => handleDragStart(e, ship)}
              onClick={() => onSelectShip(ship)}
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
