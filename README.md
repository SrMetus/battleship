# Battleship Game

## Descripción

El juego de Battleship es una adaptación del clásico juego de estrategia naval, donde los jugadores intentan hundir los barcos del oponente colocando disparos en un tablero de juego. Este proyecto está desarrollado utilizando React y CSS para la interfaz de usuario, y emplea una lógica de juego implementada en JavaScript.

## Tecnologías Utilizadas

- **Frontend**: React, JavaScript
- **Estilos**: CSS

## Instalación

1. **Clona el repositorio**:
    ```bash
   git clone https://github.com/SrMetus/battleship.git

2. **Instala las dependencias**:

    ```bash
    cd battleship-game
    npm install

3. **Inicia la aplicación**:

    ```bash
    npm start

## Cómo Jugar
### Coloca tus barcos:

- Arrastra el nombre del barco a tu tablero.
- Puedes cambiar la orientación del barco presionando la tecla R.

### Realiza tus disparos:

- Ingresa una coordenada válida para disparar.
- Si eliges una coordenada fuera del tablero o ya has disparado allí, se te pedirá ingresar una nueva coordenada.

### Observa el estado del juego:
1. Se mostrara tu dispara y el disparo del enemigo en los tableros respectivamente.
2. En el registro del juego se indicara si tu disparo o el del enemigo han acertado o no
3. Se mostrará un mensaje cuando un barco sea hundido.
4. Al hundir todos los barcos del enemigo, se indicará que has ganado el juego.

## Estructura del Proyecto
battleship-game/  
│  
├── src/  
│   ├── components/  
│   │   ├── Board.js  
│   │   ├── Cell.js  
│   │   └── ...  
│   ├── styles/  
│   │   ├── App.css  
│   │   └── Board.css  
│   ├── App.js  
│   └── index.js  
│  
├── public/  
│   └── index.html  
│  
└── package.json  

## Contribuir
¡Las contribuciones son bienvenidas! Si deseas mejorar el juego.