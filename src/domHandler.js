import { eventHandler, hoverOn } from "./manageActions";
import { createShip } from "./Ship";

import arrowIcon from "./icons/arrow.svg";

const shipsByDefault = [
     createShip(5, 'Carrier'),
     createShip(4, 'Battleship'),
     createShip(3, 'Cruiser'),
     createShip(3, 'Submarine'),
     createShip(2, 'Destroyer'),
]

const domHandler = (function() {
    const firstBoard = document.querySelector('.first.board');
    firstBoard.addEventListener('mouseover', (e)=> {
        hoverOn(e) 
    }, { capture: true })

    firstBoard.addEventListener('mouseleave', (e)=> {
        hoverOn(e)
    })

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

    const renderBoardwhilePlaceShips = function(coordinate, boardBound, shipBound, playerBoard) {
        firstBoard.innerHTML = ''
        firstBoard.appendChild( domBuilder.createColumnsNums() );
        firstBoard.appendChild( domBuilder.createLigneNums() );
        let x = 0, y;
        playerBoard.forEach((ligne) => {
            y = 0;
            ligne.forEach((value) => {                
                if(value != '') firstBoard.appendChild(domBuilder.createShipSquare(x, y));
                else {
                    let square = domBuilder.createSquare(x, y);
                    if(coordinate.direction === 'H') {
                        if(coordinate.x == x) {
                            if(y >= coordinate.y && y < boardBound && y <= shipBound) {
                                square.classList.add('hovered');
                            } 
                        }
                    } else {
                        if(coordinate.y == y) {
                            if(x >= coordinate.x && x < boardBound && x <= shipBound) {
                                square.classList.add('hovered');
                            } 
                        }
                    }
                    firstBoard.appendChild(square);
                }
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

    const renderFirstShipsPort = function(playersShipsObj) { 
        let  ships = Object.values(playersShipsObj) ;
        if(ships.length !== shipsByDefault.length) ships = shipsByDefault;
        firstShipPort.innerHTML = ''
        ships.forEach((ship) => {
            firstShipPort.appendChild(
                domBuilder.createShip(ship)
            )   
        })

    }

    const renderSecondShipsPort = function(playersShipsObj) {
        let  ships = Object.values(playersShipsObj) ;
        if(ships.length !== shipsByDefault.length) ships = shipsByDefault;
        secondShipPort.innerHTML = ''     
        ships.forEach((ship) => {
            secondShipPort.appendChild(
                domBuilder.createShip(ship)
            )
        })
    }

    const getRotateBtn = function() {
        const rotate = document.querySelector('#rotate');
        return rotate;
    }

    const getRandomBtn = function() {
        const random = document.querySelector('#randomize');
        return random;
    }

    const getUndoBtn = function() {
        const undo = document.querySelector('#undo');
        return undo;
    }

    const getStartBtn = function() {
        const start = document.querySelector('.get-ready .start');
        return start;
    }

    const isReady = function() {
        const startBtn = document.querySelector('.get-ready button');
        if(startBtn) startBtn.classList.remove('unclickable');
        domBuilder.changeGetReadyText('Your ships are ready ! click below to start enter battle');
    }

    const isNotReady = function() {
        const startBtn = document.querySelector('.get-ready button');
        if(startBtn) startBtn.classList.add('unclickable');
        domBuilder.changeGetReadyText('Place your ships to get started');
    }

    const appearComputerBoard = function() {
        const computersThings = document.querySelectorAll('.second');
        computersThings.forEach((thing) => thing.classList.remove('hide'));
        const getReadyPart = document.querySelector('.get-ready');
        getReadyPart.classList.add('hide');

        const gameboardsbtns = document.querySelector('.gameboard-btns');
        gameboardsbtns.classList.add('hide');

        const screen = document.querySelector('.screen');
        screen.classList.remove('hide');
    }

    const logPlayersTurn = function(turnAnnouncement) {
        const screen = document.querySelector('.screen');
        screen.textContent = turnAnnouncement;        
    }

    const pointToShip = function(numberOfShips, currentIndex = 0) {
        if(currentIndex < numberOfShips) {
            const ships = document.querySelectorAll('.ship');
            ships[currentIndex].appendChild(domBuilder.createArrow());
        } 
    }


    return {
        'first' : renderFirstPlayerGameboard,
        'second' : renderSecondPlayerGameboard,
        getRotateBtn,
        getRandomBtn,
        getUndoBtn,
        getStartBtn,
        isReady,
        isNotReady,
        appearComputerBoard,
        renderBoardwhilePlaceShips,
        logPlayersTurn,
        pointToShip
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
            eventHandler(e.target.dataset.x, 
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

    const changeGetReadyText = function(text) {
        const info = document.querySelector('.get-ready .info');
        info.textContent = text;
    }

    const createArrow = function() {
        const myDiv = document.createElement('div');
        myDiv.classList.add('arrow');
        
        const img = document.createElement('img');
        img.src = arrowIcon;
        img.alt = 'icon'

        myDiv.appendChild(img);
        return myDiv;
    }

    return {
        createSquare,
        createMissSquare,
        createHitSquare,
        createShip, 
        createColumnsNums,
        createLigneNums,
        createShipSquare,
        changeGetReadyText,
        createArrow
    }

})()

export { domHandler }