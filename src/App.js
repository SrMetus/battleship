import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import ShipList from './components/ShipList';
import './App.css';

function App() {
  const ships = [
    { name: 'Portaaviones', size: 5, color: 'red', coordinates: [] },
    { name: 'Destructor', size: 4, color: 'green', coordinates: [] },
    { name: 'Submarino', size: 3, color: 'blue', coordinates: [] },
    { name: 'Acorazado', size: 2, color: 'yellow', coordinates: [] }
  ];

  const initialBoard = Array(10).fill(null).map(() => Array(10).fill(null));
  const [playerBoard, setPlayerBoard] = useState(initialBoard);
  const [enemyBoard, setEnemyBoard] = useState(initialBoard);
  const [enemyShips, setEnemyShips] = useState([]);
  const [placedShips, setPlacedShips] = useState([]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [fireCoordinate, setFireCoordinate] = useState('');
  const [selectedShip, setSelectedShip] = useState(null);
  const [orientation, setOrientation] = useState('horizontal');
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [gameLog, setGameLog] = useState([]);

  useEffect(() => {
    if (isSetupComplete) {
      placeComputerShips();
    }
  }, [isSetupComplete]);

  useEffect(() => {
    if (!playerTurn && isSetupComplete && !gameWon && !gameLost) {
      setTimeout(computerFire, 2000);
    }
  }, [playerTurn, isSetupComplete, gameWon, gameLost]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'r' || event.key === 'R') {
        handleRotate();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const logEvent = (message) => {
    setGameLog((prevLog) => [...prevLog, message]);
    console.log(message);
  };

  const handleSelectShip = (ship) => {
    setSelectedShip(ship);
  };

  const handleCellClick = (rowIndex, colIndex, isEnemyBoard) => {
    if (!isEnemyBoard) {
      if (selectedShip && canPlaceShip(playerBoard, selectedShip, rowIndex, colIndex, orientation)) {
        const newBoard = placeShip(playerBoard, selectedShip, rowIndex, colIndex, orientation);
        setPlayerBoard(newBoard);
        setPlacedShips([...placedShips, selectedShip]);
        setSelectedShip(null);
      }
    } else if (isSetupComplete && playerTurn) {
      handleFire(rowIndex, colIndex);
    }
  };

  const handleRotate = () => {
    setOrientation((prevOrientation) => (prevOrientation === 'horizontal' ? 'vertical' : 'horizontal'));
  };

  const handleCompleteSetup = () => {
    if (placedShips.length === ships.length) {
      setIsSetupComplete(true);
    } else {
      logEvent("Por favor coloque todos sus barcos antes de iniciar.");
    }
  };

  const handleFireCoordinateChange = (e) => {
    setFireCoordinate(e.target.value.toUpperCase());
  };

  const handleFire = (fireCoordinate) => {
    // Convertir la coordenada de fuego (ej. A1) a índices de matriz (ej. row = 0, col = 0)
    const [colChar, rowStr] = fireCoordinate.toUpperCase().split('');
    const col = colChar.charCodeAt(0) - 'A'.charCodeAt(0);
    const row = parseInt(rowStr, 10) - 1;

    // Verificar si la coordenada es válida
    if (isNaN(row) || row < 0 || row >= 10 || isNaN(col) || col < 0 || col >= 10) {
      logEvent("Coordenada de fuego inválida. Por favor ingrese una coordenada válida (ej. A1).");
      return;
    }

    // Verificar si ya se ha disparado en esta ubicación
    if (enemyBoard[row][col] !== null && enemyBoard[row][col] !== 'S') {
      logEvent("Ya has disparado en esta ubicación. Por favor elige otra.");
      return;
    }

    const newEnemyBoard = enemyBoard.map((r) => [...r]);
    if (newEnemyBoard[row][col] === 'S') {
      logEvent("¡Le diste a un barco enemigo!");
      newEnemyBoard[row][col] = 'X';
      setEnemyBoard(newEnemyBoard);

      // Lógica para verificar si un barco ha sido hundido
      let shipSunk = false;
      const newEnemyShips = enemyShips.map((ship) => {
        if (ship.coordinates.some((coord) => coord.row === row && coord.col === col)) {
          ship.hits += 1;
          if (ship.hits === ship.size) {
            logEvent(`¡Hundiste el ${ship.name}!`);
            shipSunk = true;
          }
        }
        return ship;
      });
      setEnemyShips(newEnemyShips);

      if (newEnemyShips.every((ship) => ship.hits === ship.size)) {
        setGameWon(true);
        logEvent('¡Ganaste! Hundiste todos los barcos enemigos.');
      }
    } else {
      logEvent("Fallaste.");
      newEnemyBoard[row][col] = 'O';
      setEnemyBoard(newEnemyBoard);
      setPlayerTurn(false);
    }
  };

  const computerFire = () => {
    let row, col;
    do {
      row = getRandomInt(10);
      col = getRandomInt(10);
    } while (playerBoard[row][col] !== null && playerBoard[row][col] !== 'X' && playerBoard[row][col] !== 'O');

    const newPlayerBoard = playerBoard.map((r) => [...r]);
    if (newPlayerBoard[row][col] === 'S') {
      logEvent("La computadora te dio.");
      newPlayerBoard[row][col] = 'X';
    } else {
      logEvent("La computadora falló.");
      newPlayerBoard[row][col] = 'O';
    }
    setPlayerBoard(newPlayerBoard);
    setPlayerTurn(true);
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const canPlaceShip = (board, ship, row, col, orientation) => {
    for (let i = 0; i < ship.size; i++) {
      let x = row + (orientation === 'vertical' ? i : 0);
      let y = col + (orientation === 'horizontal' ? i : 0);
      if (x >= 10 || y >= 10 || board[x][y]) {
        return false;
      }
    }
    return true;
  };

  const placeShip = (board, ship, row, col, orientation) => {
    let newBoard = board.map((r) => [...r]);
    const shipCoordinates = [];
    for (let i = 0; i < ship.size; i++) {
      let x = row + (orientation === 'vertical' ? i : 0);
      let y = col + (orientation === 'horizontal' ? i : 0);
      newBoard[x][y] = 'S';
      shipCoordinates.push({ row: x, col: y });
    }
    setPlacedShips((prevShips) => [
      ...prevShips,
      { ...ship, coordinates: shipCoordinates, hits: 0 }
    ]);
    return newBoard;
  };
  

  const placeComputerShips = () => {
    let newBoard = initialBoard.map((r) => [...r]);
    let newEnemyShips = [];

    ships.forEach((ship) => {
      let placed = false;
      while (!placed) {
        const orientation = getRandomInt(2) === 0 ? 'horizontal' : 'vertical';
        const row = getRandomInt(10);
        const col = getRandomInt(10);
        if (canPlaceShip(newBoard, ship, row, col, orientation)) {
          newBoard = placeShip(newBoard, ship, row, col, orientation);
          newEnemyShips.push({
            ...ship,
            coordinates: getShipCoordinates(row, col, ship.size, orientation),
            hits: 0
          });
          placed = true;
        }
      }
    });

    setEnemyBoard(newBoard);
    setEnemyShips(newEnemyShips);
  };

  const getShipCoordinates = (row, col, size, orientation) => {
    const coordinates = [];
    for (let i = 0; i < size; i++) {
      coordinates.push({
        row: row + (orientation === 'vertical' ? i : 0),
        col: col + (orientation === 'horizontal' ? i : 0)
      });
    }
    return coordinates;
  };

  return (
    <div className="App">
      <h1>¡Bienvenido a Batalla Naval!</h1>
      <div className="boards">
        <div>
          <h2>Tu Tablero</h2>
          <Board
            board={playerBoard}
            onCellClick={handleCellClick}
            isPlayerBoard={true}
            ships={placedShips}
          />
        </div>
        <div>
          <h2>Tablero del Enemigo</h2>
          <Board
            board={enemyBoard}
            onCellClick={handleCellClick}
            isEnemyBoard={true}
          />
        </div>
      </div>
      <div className="controls">
        <ShipList ships={ships} onSelectShip={handleSelectShip} placedShips={placedShips} />
        <button onClick={handleCompleteSetup}>Completar Configuración</button>
      </div>
      <div className="fire-controls">
        <input
          type="text"
          value={fireCoordinate}
          onChange={handleFireCoordinateChange}
          placeholder="e.g., A1"
          disabled={!isSetupComplete || !playerTurn || gameWon || gameLost}
        />
        <button onClick={() => handleFire(fireCoordinate)} disabled={!isSetupComplete || !playerTurn || gameWon || gameLost}>
          Fuego!
        </button>
      </div>
      <div className="log">
        <h2>Registro del Juego</h2>
        <ul>
          {gameLog.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
