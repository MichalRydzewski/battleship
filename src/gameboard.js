import { Ship } from "./ship.js"

export class Gameboard {
  constructor() {
    this.board = createBoard()
    this.shipsCoordinates = []
    this.missedShots = []
    this.shotsOnTarget = []
  }

  placeShip(coordinates, slope, ship) {
    const shipCoords = calculateCoordinates(coordinates, slope, ship.length)
    this.shipsCoordinates.push(shipCoords)
    for (let i = 0; i < shipCoords.length; i++) {
      const thisCoord = shipCoords[i]
      this.board[thisCoord[0]][thisCoord[1]] = ship
    }
    return this.board
  }

  receiveAttack(coords) {
    const X = coords[0]
    const Y = coords[1]
    const attackCoords = this.board[X][Y]
    
    if (attackCoords instanceof Ship) {
      attackCoords.hit()
      this.shotsOnTarget.push(coords)
      return attackCoords
    } else {
      this.missedShots.push(attackCoords)
      return "Missed shots: " + JSON.stringify(this.missedShots)
    }
  }
  
  areAllSunk() {
    if (this.shipsCoordinates.flat(1).length === this.shotsOnTarget.length) return true
    else return false
  }
}

function createBoard() {
  let board = []
  for (let x = 0; x < 10; x++) {
    board[x] = []
    for (let y = 0; y < 10; y++) {
      board[x][y] = [x, y]
    }
  }
  return board
}

function calculateCoordinates(coordinates, slope, length) {
  const shipCoords = []
  const X = coordinates[0]
  const Y = coordinates[1]

  for (let i = 0; i < length; i++) {
    if (slope === "|") {
      const newCoords = [X, Y + i]
      shipCoords.push(newCoords)
    } else if (slope === "-") {
      const newCoords = [X + i, Y]
      shipCoords.push(newCoords)
    } else throw "Not a valid slope"
  }
  return shipCoords
}
