import { receiveAttack } from "./manageActions";
import { createShip } from "./Ship";

const domHandler = (function() {
    const firstBoard = document.querySelector('.first.board');
    const secondBoard = document.querySelector('.second.board');
    const firstShipPort = document.querySelector('.first.ships-port');
    const secondShipPort = document.querySelector('.second.ships-port');

    const renderBoard = function(domBoard, playerBoard) {
        let x = 0, y;
        playerBoard.forEach((ligne) => {
            y = 0;
            ligne.forEach((value) => {
                if(value === 'miss') domBoard.appendChild(domBuilder.createMissSquare(x, y));
                else if(value === 'hit') domBoard.appendChild(domBuilder.createHitSquare(x, y));
                else domBoard.appendChild(domBuilder.createSquare(x, y))
                y += 1;
            })
            x += 1;
        })
    }

    const renderFirstPlayerGameboard = function(firstPlayer) {
        renderBoard(firstBoard, firstPlayer.gameboard.getBoard());
    }

    const renderSecondPlayerGameboard = function(secondPlayer) {
        renderBoard(secondBoard, secondPlayer.gameboard.getBoard());
    }

    const renderFirstShipsPort = function(playersShipsObj) { // to update my ships's states and render second too
        const ships = Object.values(playersShipsObj) ;
        ships.forEach((ship) => {
            firstShipPort.appendChild(
                domBuilder.createShip(ship)
            )
        })

    }

    const renderSecondShipsPort = function(playersShipsObj) {
        const  ships = Object.values(playersShipsObj) ;        
        ships.forEach((ship) => {
            secondShipPort.appendChild(
                domBuilder.createShip(ship)
            )
        })
    }

    const populateShipsPort = function() {
        let ships = {
            'Carrier'   : createShip(5, 'Carrier'),
            'Battleship': createShip(4, 'Battleship'),
            'Cruiser'   : createShip(3, 'Cruiser'),
            'Submarine' : createShip(3, 'Submarine'),
            'Destroyer' : createShip(2, 'Destroyer'),
        }

        renderFirstShipsPort(ships);
        renderSecondShipsPort(ships);
    }

    return {
        renderFirstPlayerGameboard,
        renderSecondPlayerGameboard,
        populateShipsPort,
        renderFirstShipsPort,
        renderSecondShipsPort
    }
    
})();

const domBuilder = (function() {
    const createSquare = function(x, y) {
        const myDiv = document.createElement('div');
        myDiv.classList.add('square');
        myDiv.dataset.x = x
        myDiv.dataset.y = y

        myDiv.addEventListener('click', (e) => {
            receiveAttack(e.target.dataset.x, e.target.dataset.y);
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

    return {
        createSquare,
        createMissSquare,
        createHitSquare,
        createShip
    }

})()

export { domHandler }