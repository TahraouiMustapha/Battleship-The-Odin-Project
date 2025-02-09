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


let ships ={
    'first': [
        createShip(5, 'Carrier'),   
        createShip(4, 'Battleship'),
        createShip(3, 'Cruiser'),   
        createShip(3, 'Submarine'), 
        createShip(2, 'Destroyer') 
    ]
      ,  
    'second' : [
        createShip(5, 'Carrier'),   
        createShip(4, 'Battleship'),
        createShip(3, 'Cruiser'),   
        createShip(3, 'Submarine'), 
        createShip(2, 'Destroyer')
    ]

} 

const getReady = function() {
    player = {
        'first'  : createPlayer('mohamed'),
        'second' : createComputerPlayer() 
    }

    let firstPlayer = player['first'];
    domHandler['first'](firstPlayer)
    // get random btn and add event list to it
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
        domHandler['first'](firstPlayer)
        domHandler.isNotReady();

    })

    const startBtn = domHandler.getStartBtn();
    startBtn.addEventListener('click', () => startGame() )
}

const startGame = function() {

    // // predertimined coordinates for players' gameboards
    
    
    domHandler.appearComputerBoard();
    randomizeShips('second');
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


export { 
    receiveAttack , 
    getReady,
    startGame,
 };