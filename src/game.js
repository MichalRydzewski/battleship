import { Gameboard } from "./gameboard.js"

class Player extends Gameboard {
  constructor(player) {
    super()
    this.playerType = player
  }
}

export const human = new Player("human")
export const computer = new Player("computer")
