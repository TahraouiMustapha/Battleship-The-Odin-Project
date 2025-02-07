import { domHandler } from "./domHandler";
import { createComputerPlayer, createPlayer } from "./Player";
import { createShip } from "./Ship";

let player = {}

let gameState = {
    end: false,
    isEnd: function() {
        return this.end;
    },
    finishGame: function() {
        this.end = true
    }
}

let turn = 'first', enemy = 'second';


let ships = [
    createShip(5, 'Carrier'),   
    createShip(4, 'Battleship'),
    createShip(3, 'Cruiser'),   
    createShip(3, 'Submarine'), 
    createShip(2, 'Destroyer') 
]

let ships2 = [
    createShip(5, 'Carrier'),   
    createShip(4, 'Battleship'),
    createShip(3, 'Cruiser'),   
    createShip(3, 'Submarine'), 
    createShip(2, 'Destroyer') 
]

const startGame = function() {
    player = {
        'first'  : createPlayer('mohamed'),
        'second' : createComputerPlayer() 
    }

    // // predertimined coordinates for players' gameboards
    // ships.forEach((ship) => {
    //     player['first'].gameboard.randomShipPlace(ship);
    // })
    player['first'].gameboard.placeShip(ships[0], {x: 0, y: 2, direction: 'H'});
    player['first'].gameboard.placeShip(ships[1], {x: 1, y: 2, direction: 'H'});
    player['first'].gameboard.placeShip(ships[2], {x: 2, y: 2, direction: 'H'});
    player['first'].gameboard.placeShip(ships[3], {x: 3, y: 2, direction: 'H'});
    player['first'].gameboard.placeShip(ships[4], {x: 4, y: 2, direction: 'H'});
    
    
    player['second'].gameboard.placeShip(ships2[0], {x: 0, y: 0, direction: 'V'});
    player['second'].gameboard.placeShip(ships2[1], {x: 0, y: 1, direction: 'V'});
    player['second'].gameboard.placeShip(ships2[2], {x: 0, y: 2, direction: 'V'});
    player['second'].gameboard.placeShip(ships2[3], {x: 0, y: 3, direction: 'V'});
    player['second'].gameboard.placeShip(ships2[4], {x: 0, y: 4, direction: 'V'});
    

    domHandler['first'](player['first'])
    domHandler['second'](player['second'])
}

const receiveAttack = function(x, y, boardClicked) {
    if(gameState.isEnd()) return ;
    if(boardClicked.classList.contains(turn))  return ; // the player's board
    
    // the enemy's board
    let attackResult = player[enemy].gameboard.receiveAttack(x, y);
    if( HaveAllBeenSunk(player[enemy]) ) { 
        gameState.finishGame();
        logsWinner(player[turn].name)
    }
    
    if(attackResult) {
        renderDom(enemy);
        // switch turns
        switchTurns();
        // if the computer's turn
        if(turn === 'second') {
            logPlayersTurn(turn);
            let computerChoice = player[turn].attack( player[enemy].gameboard )
            // shot on the player's board
            player[enemy].gameboard.receiveAttack(computerChoice[0], computerChoice[1]);
            if( HaveAllBeenSunk(player[enemy]) ) { 
                gameState.finishGame();
                logsWinner(player[turn].name) 
            }
            renderDom(enemy);
            switchTurns()
        }
    }

    logPlayersTurn(turn);
}


const renderDom = function(enemy) {
    domHandler[enemy](player[enemy]);
}

const switchTurns = function() {
    enemy = turn;
    turn = turn === 'first' ? 'second': 'first';
}

const logPlayersTurn = function(playerTurn) {
    console.log(playerTurn)
}

const logsWinner = function(winner) {
    console.log(winner , ' is Win ');
}

const HaveAllBeenSunk = function(player) {
    return player.gameboard.isLoseAllShips();
}


export { 
    receiveAttack , 
    startGame,
 };