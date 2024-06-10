import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import ShipList from './components/ShipList';
import './App.css';

function App() {
  const ships = [
    { name: 'Portaaviones', size: 5, color: 'red' },
    { name: 'Destructor', size: 4, color: 'green' },
    { name: 'Submarino', size: 3, color: 'blue' },
    { name: 'Acorazado', size: 2, color: 'yellow' }
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

  const logEvent = (message) => {
    setGameLog([...gameLog, message]);
    console.log(message);
  };

  const handleSelectShip = (ship) => {
    setSelectedShip(ship);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (selectedShip && canPlaceShip(playerBoard, selectedShip, rowIndex, colIndex, orientation)) {
      const newBoard = placeShip(playerBoard, selectedShip, rowIndex, colIndex, orientation);
      setPlayerBoard(newBoard);
      setPlacedShips([...placedShips, selectedShip]);
      setSelectedShip(null);
    }
  };

  const handleRotate = () => {
    setOrientation(orientation === 'horizontal' ? 'vertical' : 'horizontal');
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

  const handleFire = () => {
    if (!fireCoordinate || fireCoordinate.length < 2 || fireCoordinate.length > 3) {
      logEvent("Cordenadas no validas. Por favor coloque las coordenadas correctamente (e.g., A1, B10).");
      return;
    }

    const row = parseInt(fireCoordinate.slice(1)) - 1;
    const col = fireCoordinate.charCodeAt(0) - 'A'.charCodeAt(0);

    if (isNaN(row) || isNaN(col) || row < 0 || row >= 10 || col < 0 || col >= 10) {
      logEvent("Cordenadas no validas. Por favor coloque las coordenadas correctamente (e.g., A1, B10).");
      return;
    }

    if (enemyBoard[row][col] !== null && enemyBoard[row][col] !== 'S') {
      logEvent("Ya has disparado en esta ubicacion. Por favor elige otra ubicacion donde disparar.");
      return;
    }

    const newEnemyBoard = enemyBoard.map((row) => [...row]);
    if (newEnemyBoard[row][col] === 'S') {
      logEvent("Hit!");
      newEnemyBoard[row][col] = 'X';
      
      // Verificacion si algun barco enemigo es hundido
      let shipSunk = false;
      const newEnemyShips = enemyShips.map(ship => {
        if (ship.coordinates.some(coord => coord.row === row && coord.col === col)) {
          ship.hits += 1;
          if (ship.hits === ship.size) {
            logEvent(`Has hundido el barco ${ship.name}!`);
            shipSunk = true;
          }
        }
        return ship;
      });
      setEnemyShips(newEnemyShips);

      // Verificacion si todos los barcos del enemigo estan hundidos
      const allShipsSunk = newEnemyShips.every(ship => ship.hits === ship.size);
      if (allShipsSunk) {
        setGameWon(true);
        logEvent('Has hundido todos los barcos enemigos. Ganaste!')
      }

    } else {
      logEvent("Miss!");
      newEnemyBoard[row][col] = 'O';
      setPlayerTurn(false);
      logEvent(`Fallaste el disparo en la fila ${row}, columna ${col}`);
    }
    setEnemyBoard(newEnemyBoard);
  };

  const computerFire = () => {
    let row, col;
    do {
      row = getRandomInt(10);
      col = getRandomInt(10);
    } while (playerBoard[row][col] !== null && playerBoard[row][col] !== 'X' && playerBoard[row][col] !== 'O');

    const newPlayerBoard = playerBoard.map((row) => [...row]);
    if (newPlayerBoard[row][col] === 'S') {
      logEvent(`Le dispararon a uno de tus barcos`);
      newPlayerBoard[row][col] = 'X';
      setPlayerTurn(true);
      
      // Verificacion si algun barco del jugador es hundido
      let shipSunk = false;
      const newPlacedShips = placedShips.map(ship => {
        if (ship.coordinates.some(coord => coord.row === row && coord.col === col)) {
          ship.hits += 1;
          if (ship.hits === ship.size) {
            logEvent(`Tu barco ${ship.name} ha sido hundido!`);
            shipSunk = true;
          }
        }
        return ship;
      });
      setPlacedShips(newPlacedShips);

      // Verificacion si todos los barcos del jugador estan hundidos
      const allShipsSunk = newPlacedShips.every(ship => ship.hits === ship.size);
      if (allShipsSunk) {
        setGameLost(true);
        logEvent('Todos tus barcos han sido hundidos. Perdiste!')
      }

    } else {
      logEvent("No te han dado");
      newPlayerBoard[row][col] = 'O';
      setPlayerTurn(true);
    }
    setPlayerBoard(newPlayerBoard);
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const canPlaceShip = (board, ship, row, col, orientation) => {
    for (let i = 0; i < ship.size; i++) {
      let x = row + (orientation === 'vertical' ? i : 0); 
      let y = col + (orientation === 'vertical' ? 0 : i);
      if (x >= 10 || y >= 10 || board[x][y]) {
        return false;
      }
    }
    return true;
  };

  const placeShip = (board, ship, row, col, orientation) => {
    let newBoard = board.map(row => [...row]);
    const shipCoordinates = [];
    for (let i = 0; i < ship.size; i++) {
      let x = row + (orientation === 'vertical' ? i : 0);
      let y = col + (orientation === 'horizontal' ? i : 0);
      newBoard[x][y] = 'S';
      shipCoordinates.push({ row: x, col: y });
    }
    setPlacedShips([...placedShips, { ...ship, coordinates: shipCoordinates, hits: 0 }]);
    return newBoard;
  };

  const placeComputerShips = () => {
    let newBoard = initialBoard.map(row => [...row]);
    let newEnemyShips = [];

    ships.forEach(ship => {
      let placed = false;
      while (!placed) {
        const orientation = getRandomInt(2) === 0 ? 'horizontal' : 'vertical';
        const row = getRandomInt(10);
        const col = getRandomInt(10);
        if (canPlaceShip(newBoard, ship, row, col, orientation)) {
          newBoard = placeShip(newBoard, ship, row, col, orientation);
          placed = true;

          const coordinates = [];
          for (let i = 0; i < ship.size; i++) {
            let x = row + (orientation === 'vertical' ? i : 0);
            let y = col + (orientation === 'horizontal' ? i : 0);
            coordinates.push({ row: x, col: y });
          }
          newEnemyShips.push({ ...ship, coordinates, hits: 0 });
        }
      }
    });
    setEnemyBoard(newBoard);
    setEnemyShips(newEnemyShips);

    // Log con las coordenadas de los barcos enemigos
    const shipCoordinates = newEnemyShips.flatMap(ship => ship.coordinates.map(coord => {
      return `${String.fromCharCode(65 + coord.col)}${coord.row + 1}`;
    }));
    console.log('Coordenada de los barcos enemigos:', shipCoordinates);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Battleship</h1>
      {!isSetupComplete ? (
        <div className="content-container">
          <div className="ship-list-container">
            <ShipList
              ships={ships}
              onSelectShip={handleSelectShip}
              orientation={orientation}
              onRotate={handleRotate}
              placedShips={placedShips}
            />
          </div>
          <div className="board-container">
            <Board
              board={playerBoard}
              onCellClick={handleCellClick}
              setBoard={setPlayerBoard}
              orientation={orientation}
              placedShips={placedShips}
              setPlacedShips={setPlacedShips}
              isPlayerBoard={true}
            />
          </div>
          <button onClick={handleCompleteSetup}>Comenzar</button>
        </div>
      ) : (
        <div className="game-container">
          <div className="board-container">
            <h2>Tu tablero</h2>
            <Board
              board={playerBoard}
              onCellClick={handleCellClick}
              setBoard={setPlayerBoard}
              isPlayerBoard={true}
            />
            <div>
              <input
                type="text"
                value={fireCoordinate}
                onChange={handleFireCoordinateChange}
                placeholder="Ingresar coordenadas (e.g., A1)"
                disabled={gameWon || gameLost}
              />
              <button onClick={handleFire} disabled={gameWon || gameLost}>Disparo</button>
              {gameWon && <h2 style={{ color: 'black' }}>Hundiste todos los barcos enemigos</h2>}
              {gameLost && <h2 style={{ color: 'black' }}>Tu enemigo hundio todos tus barcos</h2>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

