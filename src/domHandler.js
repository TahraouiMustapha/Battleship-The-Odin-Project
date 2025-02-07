import { receiveAttack } from "./manageActions";
import { createShip } from "./Ship";

const shipsByDefault = {
    'Carrier'   : createShip(5, 'Carrier'),
    'Battleship': createShip(4, 'Battleship'),
    'Cruiser'   : createShip(3, 'Cruiser'),
    'Submarine' : createShip(3, 'Submarine'),
    'Destroyer' : createShip(2, 'Destroyer'),
}

const domHandler = (function() {
    const firstBoard = document.querySelector('.first.board');
    const secondBoard = document.querySelector('.second.board');
    const firstShipPort = document.querySelector('.first.ships-port');
    const secondShipPort = document.querySelector('.second.ships-port');

    const renderBoard = function(domBoard, playerBoard) {
        domBoard.innerHTML = ''
        domBoard.appendChild( domBuilder.createColumnsNums() );
        domBoard.appendChild( domBuilder.createLigneNums() );
        let x = 0, y;
        playerBoard.forEach((ligne) => {
            y = 0;
            ligne.forEach((value) => {
                if(value === 'miss') domBoard.appendChild(domBuilder.createMissSquare(x, y));
                else if(value === 'hit') domBoard.appendChild(domBuilder.createHitSquare(x, y));
                else if(value != '') domBoard.appendChild(domBuilder.createShipSquare(x, y));
                else domBoard.appendChild(domBuilder.createSquare(x, y))
                y += 1;
            })
            x += 1;
        })
    }

    const renderFirstPlayerGameboard = function(firstPlayer) {
        renderBoard(firstBoard, firstPlayer.gameboard.getBoard());
        renderFirstShipsPort(firstPlayer.gameboard.getShips());
    }

    const renderSecondPlayerGameboard = function(secondPlayer) {
        renderBoard(secondBoard, secondPlayer.gameboard.getBoard());
        renderSecondShipsPort(secondPlayer.gameboard.getShips());
    }

    const renderFirstShipsPort = function(playersShipsObj) { // to update my ships's states and render second too
        let  ships = Object.values(playersShipsObj) ;
        if(!ships.length) ships = shipsByDefault;
        firstShipPort.innerHTML = ''
        ships.forEach((ship) => {
            firstShipPort.appendChild(
                domBuilder.createShip(ship)
            )
        })

    }

    const renderSecondShipsPort = function(playersShipsObj) {
        let  ships = Object.values(playersShipsObj) ;
        if(!ships.length) ships = shipsByDefault;
        secondShipPort.innerHTML = ''     
        ships.forEach((ship) => {
            secondShipPort.appendChild(
                domBuilder.createShip(ship)
            )
        })
    }


    return {
        'first' : renderFirstPlayerGameboard,
        'second' : renderSecondPlayerGameboard,
    }
    
})();

const domBuilder = (function() {
    const createSquare = function(x, y) {
        const myDiv = document.createElement('div');
        myDiv.classList.add('square');
        myDiv.dataset.x = x
        myDiv.dataset.y = y

        myDiv.addEventListener('click', (e) => {
            let boardClicked = e.target.closest('.board');
            receiveAttack(e.target.dataset.x, 
                          e.target.dataset.y, 
                          boardClicked      );
        } );
        
        return myDiv;
    }

    const createMissSquare = function(x, y) {
        const myDiv = createSquare(x, y);
        myDiv.classList.add('miss');
        myDiv.textContent = 'x'
        return myDiv;
    }

    const createHitSquare = function(x, y) {
        const myDiv = createSquare(x, y);
        myDiv.classList.add('hit');
        myDiv.textContent = 'X';
        return myDiv;
    }

    const createShip = function(ship) {
        const myDiv = document.createElement('div');
        myDiv.classList.add('ship');

        myDiv.appendChild( createShipName(ship.name) );
        myDiv.appendChild( createShipBody(ship) );

        return myDiv;
    }

    const createShipName = function(shipName) {
        const myDiv = document.createElement('div');
        myDiv.classList.add('ship-name');
        myDiv.textContent = shipName;
        return myDiv;
    }

    const createShipBody = function(ship) {
        const myDiv = document.createElement('div');
        myDiv.classList.add('ship-body');

        let hitNumberTimes = ship.getHitNumberTimes();
        for(let i = 0; i< ship.getLength(); i++ ) {
            if(hitNumberTimes > 0) {
                myDiv.appendChild(
                    createHitSquare()
                )
                hitNumberTimes -= 1;
            } else {
                myDiv.appendChild(
                    createSquare()
                )
            }
        }

        return myDiv;
    }

    const createShipSquare = function(x, y) {
        const myDiv = createSquare(x, y);
        myDiv.classList.add('ship-square');
        return myDiv;
    }

    const createColumnsNums = function() {
        const myDiv = document.createElement('div');
        myDiv.classList.add('column-numbers');
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        numbers.forEach((num) => {
            let span = document.createElement('span');
            span.textContent = num;
            myDiv.appendChild(span);
        })

        return myDiv;
    }

    const createLigneNums = function() {
        const myDiv = document.createElement('div');
        myDiv.classList.add('ligne-numbers');
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        numbers.forEach((num) => {
            let span = document.createElement('span');
            span.textContent = num;
            myDiv.appendChild(span);
        })
    
        return myDiv;
    }

    return {
        createSquare,
        createMissSquare,
        createHitSquare,
        createShip, 
        createColumnsNums,
        createLigneNums,
        createShipSquare
    }

})()

export { domHandler }