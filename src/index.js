import './styles/style.css';
import { domHandler } from './domHandler';
import { createPlayer } from './Player';
import { createShip } from './Ship';

const player = createPlayer();
const ship = createShip(3, 'ship');
const coordinate = {
    x: 0,
    y: 0,
    direction: 'H'
}

player.gameboard.placeShip(ship, coordinate);
player.gameboard.receiveAttack(0, 0)
player.gameboard.receiveAttack(0, 1)
player.gameboard.receiveAttack(0, 3)
console.log(player.gameboard.getBoard())

const player2 = createPlayer();
domHandler.renderFirstPlayerGameboard(player)
domHandler.renderSecondPlayerGameboard(player2)
domHandler.populateShipsPort();





