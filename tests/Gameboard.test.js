/* eslint-disable no-undef */
import { createGameboard } from "../src/Gameboard"; 
import { createShip } from "../src/Ship";

describe('Gameboad module', () => {
    describe('Gameboard should able to place a ship at specific coordinate.', () => {
        const myBoard = createGameboard();
        test('check whether the coordinate had placed at', () => {
            const ship1 = createShip(5);
            const coordinate = {x: 2,
                                y: 2,
                                direction: 'H'} // { horizental(H) or vertical(V) }

            expect(myBoard.placeShip(ship1, coordinate)).toEqual(true);
            const ship2 = createShip(2); 
            expect(myBoard.placeShip(ship2, coordinate)).toEqual(false);

        })

        test('Check whether the coordinate fits the ship\'s length.', () => {
            const ship1 = createShip(5);
            const fitCoordinate = {
                x: 1,
                y: 0,
                direction: 'H' 
            }

            const wrongCoordinate = {
                x: 6,
                y: 0,
                direction: 'H' 
            } 

            
            expect(myBoard.placeShip(ship1, fitCoordinate)).toEqual(true);
            expect(myBoard.placeShip(ship1, wrongCoordinate)).toEqual(false);
        })
    })
})