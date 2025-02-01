const createGameboard = function( boardWidth = 10 ) {
    const board = new Array(boardWidth).fill(null)
                .map(() => new Array(boardWidth).fill(0));


    const placeShip = function(ship, coordinate) {
        let { x, y, direction } = coordinate; 
        let horizentalCondition = ((x + ship.getLength() - 1) < boardWidth) && direction === 'H' ;
        let verticalCondition = ((y - ship.getLength() + 1) >= 0) && direction === 'V';

        if(horizentalCondition) {
            for(let i = x; i - x < ship.getLength(); i++) {
                if(board[i][y]) return false;
                else board[i][y] = 1;
            }
            return true;
        } else if(verticalCondition) {
            for(let i = y; y - i < ship.getLength() ; i--) {
                if(board[x][i]) return false;
                else board[x][i] = 1;
            }
            return true ;
        }
        return false;
    }            

    return {
        placeShip
    }
}

export { createGameboard };