import { createShip } from "./Ship";

const domHandler = (function() {
    const firstBoard = document.querySelector('.first.board');
    const secondBoard = document.querySelector('.second.board');
    const firstShipPort = document.querySelector('.first.ships-port');
    const secondShipPort = document.querySelector('.second.ships-port');

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
            'Carrier': createShip(5, 'Carrier'),
            'Battleship': createShip(4, 'Battleship'),
            'Cruiser': createShip(3, 'Cruiser'),
            'Submarine': createShip(3, 'Submarine'),
            'Destroyer': createShip(2, 'Destroyer'),
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