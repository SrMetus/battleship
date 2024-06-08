import React from 'react';

const ShipList = ({ ships, onSelectShip }) => {
  return (
    <div className="ship-list">
      <h2>Barcos Disponibles</h2>
      <ul>
        {ships.map((ship, index) => (
          <li key={index}>
            <button onClick={() => onSelectShip(ship)}>
              {ship.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipList;
