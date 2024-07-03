import React from 'react';

const ShipList = ({ ships, onSelectShip, placedShips }) => {
  const isPlaced = (ship) => placedShips.some((placedShip) => placedShip.name === ship.name);

  return (
    <div>
      {ships.map((ship) => (
        <button
          key={ship.name}
          onClick={() => onSelectShip(ship)}
          disabled={isPlaced(ship)}
          style={{ backgroundColor: isPlaced(ship) ? 'gray' : ship.color }}
        >
          {ship.name}
        </button>
      ))}
    </div>
  );
};

export default ShipList;
