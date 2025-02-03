import './styles/style.css';
import { domHandler } from './domHandler';
import { createPlayer } from './Player';

const player = createPlayer();
const player2 = createPlayer();
domHandler.renderFirstPlayerGameboard(player)
domHandler.renderSecondPlayerGameboard(player2)





