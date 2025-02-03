import { createGameboard } from "./Gameboard"

const createPlayer = (name) => {
    return { 
        name,
        gameboard: createGameboard()
    }
}



export { createPlayer };