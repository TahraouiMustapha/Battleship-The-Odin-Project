import { createGameboard } from "./Gameboard"

const createPlayer = (name = '') => {
    return { 
        name,
        gameboard: createGameboard()
    }
}

const createComputerPlayer = () => Object.assign(
    createPlayer('Computer'),
    randomAttacker()
);

const randomAttacker = () => ({
    attack: function(enemyBoard) {
        let x, y;
        do {
            x = randomIndex(); 
            y = randomIndex(); 
        } while(enemyBoard.isMissed(x, y) || enemyBoard.isHitted(x, y));

        return [x, y];
    }
})

const randomIndex = function() {
    return Math.floor( Math.random() * 10 );
}


export { createPlayer, createComputerPlayer };