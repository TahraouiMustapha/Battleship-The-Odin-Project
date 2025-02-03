const domHandler = (function() {
    const firstBoard = document.querySelector('.first.board');
    const secondBoard = document.querySelector('.second.board');

    const renderBoard = function(domBoard, playerBoard) {
        playerBoard.forEach((ligne) => {
            ligne.forEach((value) => {
                if(value === 'miss') domBoard.appendChild(domBuilder.createMissSquare());
                else if(value === 'hit') domBoard.appendChild(domBuilder.createHitSquare());
                else domBoard.appendChild(domBuilder.createSquare())
            })
        })
    }

    const renderFirstPlayerGameboard = function(firstPlayer) {
        renderBoard(firstBoard, firstPlayer.gameboard.getBoard());
    }

    const renderSecondPlayerGameboard = function(secondPlayer) {
        renderBoard(secondBoard, secondPlayer.gameboard.getBoard());
    }

    return {
        renderFirstPlayerGameboard,
        renderSecondPlayerGameboard
    }
    
})();

const domBuilder = (function() {
    const createSquare = function() {
        const myDiv = document.createElement('div');
        myDiv.classList.add('square');
        return myDiv;
    }

    const createMissSquare = function() {
        const myDiv = createSquare();
        myDiv.classList.add('miss');
        myDiv.textContent = 'x'
        return myDiv;
    }

    const createHitSquare = function() {
        const myDiv = createSquare();
        myDiv.classList.add('hit');
        myDiv.textContent = 'x';
        return myDiv;
    }

    return {
        createSquare,
        createMissSquare,
        createHitSquare
    }

})()

export { domHandler }