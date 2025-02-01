const createGameboard = function( boardWidth = 10 ) {
    const board = new Array(boardWidth).fill(null)
                .map(() => new Array(boardWidth).fill(0));


    const placeShip = function(ship, coordinate) {
        let { x, y, direction } = coordinate; 
        let horizentalCondition = ((x + ship.getLength() - 1) < boardWidth) && direction === 'H' ;
        let verticalCondition = ((y - ship.getLength() + 1) >= 0) && direction === 'V';

        if(!board[x][y]) {
            if(horizentalCondition || verticalCondition) {
                board[x][y] = 1;
                return true;
            }
        } 
        return false;
    }            

    return {
        placeShip
    }
}

export { createGameboard };