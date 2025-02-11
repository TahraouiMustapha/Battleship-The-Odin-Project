import { domHandler } from "./domHandler";
import { createComputerPlayer, createPlayer } from "./Player";
import { createShip } from "./Ship";

let player = {};
let turn = 'first', enemy = 'second';
let direction = 'H';

let gameState = {
    ready : false, 
    end: false,
    isEnd: function() {
        return this.end;
    },
    isReady: function() {
        return this.ready;
    },
    makeItReady: function() {
        this.ready = true;
    },
    makeItNotReadyYet: function() {
        this.ready = false;
    },
    finishGame: function() {
        this.end = true
    }
}

let ships = {
    'first': createShipList(),
    'second' : createShipList(),
    firstPlayersShips: {
        current: 0,
        moveToNext: function() {
            this.current += 1;
        },
        isFullShip: function() {
            return this.current >= 5 ? true: false;
        },
        resetCurrent: function() {
            this.current = 0;
        }
    }
} 

const getReady = function() {
    player = {
        'first'  : createPlayer('mohamed'),
        'second' : createComputerPlayer() 
    }

    let firstPlayer = player['first'];
    // render first player's board
    domHandler['first'](firstPlayer)
    const randomBtn = domHandler.getRandomBtn();
    
    randomBtn.addEventListener('click', () => {
        firstPlayer.gameboard.resetBoard();
        randomizeShips('first');
        domHandler['first'](firstPlayer)
        domHandler.isReady()
    })

    const undoBtn = domHandler.getUndoBtn();
    undoBtn.addEventListener('click', () => {
        firstPlayer.gameboard.resetBoard();
        ships.firstPlayersShips.resetCurrent() // to repeat counting from the first ship
        gameState.makeItNotReadyYet(); // to place their ships again
        domHandler['first'](firstPlayer)
        domHandler.isNotReady();
    })

    const startBtn = domHandler.getStartBtn();
    startBtn.addEventListener('click', () => startGame() )
}

const startGame = function() {    
    domHandler.appearComputerBoard();
    randomizeShips('second');
    domHandler['second'](player['second'])
}

const receiveAttack = function(x, y, boardClicked) {
    if(!boardClicked) return;
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

const randomizeShips = function(playerNum) {
    ships[playerNum].forEach((ship) => {
            player[playerNum].gameboard.randomShipPlace(ship)
    })
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

function createShipList() {
    return [
        createShip(5, 'Carrier'),   
        createShip(4, 'Battleship'),
        createShip(3, 'Cruiser'),   
        createShip(3, 'Submarine'), 
        createShip(2, 'Destroyer') 
    ];
}  

const eventHandler = function(x, y, boardClicked) {
    if(gameState.isReady()) {
        receiveAttack(x, y, boardClicked);
    } else {
        let fullShips;
        let goodPlaced = player['first'].gameboard.placeShip(
            ships['first'][ships.firstPlayersShips.current],
            { x, y, direction}   
        )
        if(goodPlaced) {
            domHandler['first'](player['first']);
            ships.firstPlayersShips.moveToNext();
            fullShips = ships.firstPlayersShips.isFullShip()
        }
        if(fullShips) {
            gameState.makeItReady();
            domHandler.isReady()
        }
    }
}

const hoverOn = function(event) {
    if(!gameState.isReady()){       
        // get length of the current ship
        let shipLenght = Number(ships['first'][ships.firstPlayersShips.current].getLength());
        let [x, y] =  [event.target.dataset.x, event.target.dataset.y]
        if(!x || !y) {
            domHandler['first'](player['first']);
            return;
        }
        domHandler.renderBoardwhilePlaceShips(x, y, 10, (shipLenght + Number(y)) - 1, player['first'].gameboard.getBoard());
    }
}


export { 
    eventHandler , 
    getReady,
    startGame,
    hoverOn
 };