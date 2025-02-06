import { domHandler } from "./domHandler";
import { createPlayer } from "./Player";
import { createShip } from "./Ship";

let player = {}

let turn = 'first', enemy = 'second';


let ships = [
    createShip(5, 'Carrier'),   
    createShip(4, 'Battleship'),
    createShip(3, 'Cruiser'),   
    createShip(3, 'Submarine'), 
    createShip(2, 'Destroyer') 
]


const startGame = function() {
    player = {
        'first'  : createPlayer('mohamed'),
        'second' : createPlayer('jamal')
    }

    // predertimined coordinates for first player
    player['first'].gameboard.placeShip(ships[0], {x: 0, y: 2, direction: 'H'});
    player['first'].gameboard.placeShip(ships[1], {x: 1, y: 2, direction: 'H'});
    player['first'].gameboard.placeShip(ships[2], {x: 2, y: 2, direction: 'H'});
    player['first'].gameboard.placeShip(ships[3], {x: 3, y: 2, direction: 'H'});
    player['first'].gameboard.placeShip(ships[4], {x: 4, y: 2, direction: 'H'});
    
    console.log(player['first'].gameboard.getBoard())
    
    player['second'].gameboard.placeShip(ships[0], {x: 0, y: 0, direction: 'V'});
    player['second'].gameboard.placeShip(ships[1], {x: 0, y: 1, direction: 'V'});
    player['second'].gameboard.placeShip(ships[2], {x: 0, y: 2, direction: 'V'});
    player['second'].gameboard.placeShip(ships[3], {x: 0, y: 3, direction: 'V'});
    player['second'].gameboard.placeShip(ships[4], {x: 0, y: 4, direction: 'V'});
    
    console.log(player['second'].gameboard.getBoard())

    domHandler.renderFirstPlayerGameboard(player['first'])
    domHandler.renderSecondPlayerGameboard(player['second'])
    domHandler.populateShipsPort();
}

const receiveAttack = function(x, y, boardClicked) {
    if(boardClicked.classList.contains(turn))  return ; // the player's board
    
    // the enemy's board
    player[enemy].gameboard.receiveAttack(x, y)
    if(enemy === 'first') {
        domHandler.renderFirstPlayerGameboard(player[enemy]);
        domHandler.renderFirstShipsPort(player[enemy].gameboard.getShips());
    } else {
        domHandler.renderSecondPlayerGameboard(player[enemy]);
        domHandler.renderSecondShipsPort(player[enemy].gameboard.getShips());
    }
    // switch turns
    switchTurns();
}


function switchTurns() {
    enemy = turn;
    turn = turn === 'first' ? 'second': 'first';
}

export { 
    receiveAttack , 
    startGame,
 };