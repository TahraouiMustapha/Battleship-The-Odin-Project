const createGameboard = function( boardWidth = 10 ) {
    let board = new Array(boardWidth).fill(null)
                .map(() => new Array(boardWidth).fill(0));


    const boardShips = {};

    const getBoard = function() { return board      }  ; 
    const getShips = function() { return boardShips }  ; 
    const resetBoard = function() {
        board = new Array(boardWidth).fill(null)
        .map(() => new Array(boardWidth).fill(0));
    }

    const isMissed = function(x, y) { return board[x][y] === 'miss'}
    const isHitted = function(x, y) { return board[x][y] === 'hit'}

    const checkHorizentalPlace = function (x, y, shipLength) {
        for(let i = y; i - y < shipLength; i++) {
            if(board[x][i]) return false;
        }
        return true;
    }

    const checkVerticalPlace = function(x, y, shipLength) {
        for(let i = x; i - x < shipLength ; i++) {
            if(board[i][y]) return false;
        }
        return true;
    }

    const placeShip = function(ship, coordinate) {
        let { x, y, direction } = coordinate; 
        let horizentalCondition = ((y + ship.getLength() - 1) < boardWidth) && direction === 'H' ;
        let verticalCondition = ((x + ship.getLength() - 1) < boardWidth) && direction === 'V';

        if(horizentalCondition) {
            if(checkHorizentalPlace(x, y, ship.getLength())) {
                for(let i = y; i - y < ship.getLength(); i++) {
                    board[x][i] = ship.name;
                }
                boardShips[ship.name] = ship;
                return true;
            }
        } else if(verticalCondition) {
            if(checkVerticalPlace(x, y, ship.getLength())) {
                for(let i = x; i - x < ship.getLength() ; i++) {
                    board[i][y] = ship.name;
                }
                boardShips[ship.name] = ship;
                return true ;
            }
        }
        return false;
    }  
    
    const sendHitFunction = function(shipName) {
        if(shipName) {
            boardShips[shipName].hit();
        }
    }
    
    const receiveAttack = function(x, y) {

        if(!board[x][y]) {
            board[x][y] = 'miss';
            return 'miss';
        } else if( board[x][y] &&
                    board[x][y] !== 'miss' &&
                    board[x][y] !== 'hit'
          ) {
                let shipsName = board[x][y];
                sendHitFunction(shipsName);
                board[x][y] = 'hit';
                return 'hit';    
        }

        return false;
    }
    
    const isLoseAllShips = () => {
        const myShips = Object.values(boardShips);
        return myShips.every((ship) => ship.isSunk() );
    }

    const randomShipPlace = function(ship) {
        let result;
        do {
            result = placeShip(ship, randomCoordinate());
        } while(!result);
    }
 

    return {
        placeShip,
        receiveAttack, 
        isLoseAllShips,
        getBoard,
        getShips,
        isMissed, 
        isHitted, 
        randomShipPlace,
        resetBoard
    }
}

const randomCoordinate = function() {
    const randomIndex = function () {
        return Math.floor( Math.random() * 10 );
    }

    const randomDirection = function() {
        let randomBinary = Math.floor ( (Math.random() * 10) % 2 );
        return randomBinary ? 'H' : 'V';
    }

    return {
        x : randomIndex(),
        y : randomIndex(),
        direction: randomDirection()
    }
}



export { createGameboard };