const domHandler = (function() {
    const firstBoard = document.querySelector('.first.board');
    const secondBoard = document.querySelector('.second.board');

    const renderBoard = function(domBoard, playerBoard) {
        playerBoard.forEach((ligne) => {
            ligne.forEach(() => 
                domBoard.appendChild(domBuilder.createSquare())
            )
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

    return {
        createSquare
    }

})()

export { domHandler }