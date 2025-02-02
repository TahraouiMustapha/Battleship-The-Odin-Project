/* eslint-disable no-undef */
import { createGameboard } from "../src/Gameboard"; 
import { createShip } from "../src/Ship";


    describe('Gameboard should able to place a ship at specific coordinate.', () => {
        test('check whether the coordinate had placed at', () => {
            const myBoard = createGameboard();
            const ship1 = createShip(1, 'ship1');
            const coordinate = {x: 2,
                                y: 2,
                                direction: 'H'} // { horizental(H) or vertical(V) }

            expect(myBoard.placeShip(ship1, coordinate)).toEqual(true);
            const ship2 = createShip(2); 
            expect(myBoard.placeShip(ship2, coordinate)).toEqual(false);

        })

        test('Check whether the coordinate fits the ship\'s length with both directions.', () => {
            const myBoard = createGameboard();
            const ship1 = createShip(5, 'ship1');
            const fitCoordinate = {
                x: 1,
                y: 0,
                direction: 'H' 
            }

            const wrongCoordinate= {
                x: 6,
                y: 0,
                direction: 'H' 
            } 
            
            expect(myBoard.placeShip(ship1, fitCoordinate)).toEqual(true);
            expect(myBoard.placeShip(ship1, wrongCoordinate)).toEqual(false);

            const fitVerticalCoordinate = {
                x: 1,
                y: 7,
                direction: 'V' 
            }

            const wrongVerticalCoordinate = {
                x: 1,
                y: 3,
                direction: 'V' 
            }

            expect(myBoard.placeShip(ship1, fitVerticalCoordinate)).toEqual(true);
            expect(myBoard.placeShip(ship1, wrongVerticalCoordinate)).toEqual(false);
            
        })

        test('check whether the coordinate had placed at other ship\'s place ', () => {
            const myBoard = createGameboard();
            const ship1 = createShip(5, 'ship1');
            const fitCoordinate = {
                x: 1,
                y: 0,
                direction: 'H' 
            }

            expect(myBoard.placeShip(ship1, fitCoordinate)).toEqual(true);
            const ship2 = createShip(3, 'ship2');
            const wrongPlace = {
                x: 3,
                y: 0,
                direction: 'H' 
            }

            expect(myBoard.placeShip(ship2, wrongPlace)).toEqual(false);
            const wrongPlace2 = {
                x: 0,
                y: 0,
                direction: 'H' 
            }
            expect(myBoard.placeShip(ship2, wrongPlace2)).toEqual(false);

            const rightPlaceOnVertical = {
                x: 0,
                y: 2,
                direction: 'V' 
            }

            expect(myBoard.placeShip(ship2, rightPlaceOnVertical)).toEqual(true);
        })

        test('check whether the coordinate had placed at other ship\'s place (vertical)', ()=> {
            const myBoard = createGameboard();
            const ship1 = createShip(5, 'ship1');
            const fitCoordinate = {
                x: 1,
                y: 7,
                direction: 'V' 
            }

            expect(myBoard.placeShip(ship1, fitCoordinate)).toEqual(true);
            const ship2 = createShip(3, 'ship2');
            const wrongPlace = {
                x: 1,
                y: 5,
                direction: 'V' 
            }

            expect(myBoard.placeShip(ship2, wrongPlace)).toEqual(false);
        })
    })

    describe('receiveAttack ', () => {
        const myBoard = createGameboard();
        test('It determines wether or not the attack hit a ship.', () => {
            const ship = createShip(3, 'ship');
            const coordinate = {
                x: 2, 
                y: 2, 
                direction: 'H'
            }

            myBoard.placeShip(ship, coordinate);
            expect(myBoard.receiveAttack(7, 7)).toEqual(false);
            expect(myBoard.receiveAttack(1, 2)).toEqual(false);
            expect(myBoard.receiveAttack(2, 2)).toEqual(true);
            expect(myBoard.receiveAttack(4, 2)).toEqual(true);
        })

        test('sends the \'hit\' function to the correct ship', () => {
            const myHittedShip = createShip(4, 'myHittedShip');
            const coordinate = {
                x: 0, 
                y: 0, 
                direction: 'H'
            }

            myBoard.placeShip(myHittedShip, coordinate);
            expect(myHittedShip.getHitNumberTimes()).toBe(0);
            myBoard.receiveAttack(0, 0);
            expect(myHittedShip.getHitNumberTimes()).toBe(1);
            myBoard.receiveAttack(2, 0); // hit the ship along its length
            expect(myHittedShip.getHitNumberTimes()).toBe(2);
        })

        test('Can\'t shot on missed shot or hitted places', ()=> {
            const testBoard = createGameboard();
            const myHittedShip = createShip(4, 'myHittedShip');
            const coordinate = {
                x: 0, 
                y: 0, 
                direction: 'H'
            }

            testBoard.placeShip(myHittedShip, coordinate);
            expect(testBoard.receiveAttack(0, 0)).toEqual(true); 
            expect(testBoard.receiveAttack(0, 3)).toEqual(false);
            expect(testBoard.receiveAttack(0, 0)).toEqual(false); // shot on hitted place
            expect(testBoard.receiveAttack(0, 3)).toEqual(false); // shot on misssed shot
        })
    })

    describe('Gameboard reports whether or not all of their ships have been sunk.', () => {
        let myBoard;

        beforeEach(() => {
            myBoard = createGameboard(); // Create a fresh gameboard before each test
        });

        test('reports whether or not all of their ships have been sunk', () => {
            const ship1 = createShip(2, 'ship1'); 
            const ship2 = createShip(2, 'ship2'); 
    
            const coordinate1 = {
                x: 2,
                y: 6, 
                direction: 'V' 
            };
    
            const coordinate2 = {
                x: 4,
                y: 5, 
                direction: 'V' 
            }
    
            myBoard.placeShip(ship1, coordinate1);
            myBoard.placeShip(ship2, coordinate2);
            myBoard.receiveAttack(2, 6);
            myBoard.receiveAttack(2, 5); // ship1 have sunk
            expect(myBoard.isLoseAllShips()).toEqual(false);
            myBoard.receiveAttack(4, 5);
            myBoard.receiveAttack(4, 4); // ship2 have sunk
            expect(myBoard.isLoseAllShips()).toEqual(true);
        })

    })

