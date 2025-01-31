/* eslint-disable no-undef */
import { createShip } from "../src/Ship";

describe('Ship factory', () => {
    test('increase the number of the hits in ship', ()=> {
        const myShip = createShip(2);
        expect(myShip.getHitNumberTimes()).toBe(0);
        myShip.hit();
        myShip.hit();
        expect(myShip.getHitNumberTimes()).toBe(2);
    })

    test('calculate whether a ship is considerd sunk or not', () => {
        const myShip = createShip(3);
        myShip.hit();
        myShip.hit();
        expect(myShip.isSunk()).toEqual(false);
        myShip.hit();
        expect(myShip.isSunk()).toEqual(true);
    })
})