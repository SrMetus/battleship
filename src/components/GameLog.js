import React from 'react';

const GameLog = ({ log }) => {
  return (
    <div className="game-log">
      <h2>Registro del Juego</h2>
      <ul>
        {log.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameLog;
