/* eslint-disable no-undef */
import { createGameboard } from "../src/Gameboard"; 
import { createShip } from "../src/Ship";

describe('Gameboad module', () => {
    describe('gameboard should able to place a ship at specific coordinate', () => {
        test('check whether the coordinate had placed at', () => {
            const ship1 = createShip(5);
            const myBoard = createGameboard();
            const coordinate = {2, 2, 'H'} // {x, y, horizental(H) or vertical(V) }

            expect(myBoard.placeShip(ship1), coordinate).toEqual(true);
            const ship2 = createShip(2); 
            expect(myBoard.placeShip(ship2, coordinate)).toEqual(false);

        })
    })
})