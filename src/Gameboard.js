const createGameboard = function() {
    const board = new Array(10).fill(null)
                .map(() => new Array(10).fill(0));


    const placeShip = function(ship, coordinate) {
        let x = coordinate.x, y = coordinate.y;
        if(!board[x][y]) {
            board[x][y] = 1;
            return true;
        } 
        return false;
    }            

    return {
        placeShip
    }
}

export { createGameboard };