const createGameboard = function( boardWidth = 10 ) {
    const board = new Array(boardWidth).fill(null)
                .map(() => new Array(boardWidth).fill(0));


    const shipPlaces = {};

    const checkHorizentalPlace = function (x, y, shipLength) {
        for(let i = x; i - x < shipLength; i++) {
            if(board[i][y]) return false;
        } 
        return true;
    }

    const checkVerticalPlace = function(x, y, shipLength) {
        for(let i = y; y - i < shipLength ; i--) {
            if(board[x][i]) return false;
        }
        return true;
    }

    const placeShip = function(ship, coordinate) {
        let { x, y, direction } = coordinate; 
        let horizentalCondition = ((x + ship.getLength() - 1) < boardWidth) && direction === 'H' ;
        let verticalCondition = ((y - ship.getLength() + 1) >= 0) && direction === 'V';

        if(horizentalCondition) {
            if(checkHorizentalPlace(x, y, ship.getLength())) {
                for(let i = x; i - x < ship.getLength(); i++) {
                    board[i][y] = ship.name;
                }
                shipPlaces[ship.name] = ship;
                return true;
            }
        } else if(verticalCondition) {
            if(checkVerticalPlace(x, y, ship.getLength())) {
                for(let i = y; y - i < ship.getLength() ; i--) {
                    board[x][i] = ship.name;
                }
                shipPlaces[ship.name] = ship;
                return true ;
            }
        }
        return false;
    }  
    
    const sendHitFunction = function(shipName) {
        if(shipName) {
            shipPlaces[shipName].hit();
        }
    }
    
    const receiveAttack = function(x, y) {
        if(board[x][y]) {
            let shipsName = board[x][y];
            sendHitFunction(shipsName);
            return true;
        }
        else return false;
    }


    return {
        placeShip,
        receiveAttack
    }
}

export { createGameboard };