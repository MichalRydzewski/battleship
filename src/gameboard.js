import { randomizeCoords, randomizeSlope } from "./helper-functions.js"

export class Ship {
  constructor(length) {
    this.length = length
    this.timesHit = 0
    this.sunken = false
  }

  hit() {
    this.timesHit++
    this.sunken = this.timesHit >= this.length
  }
}

export class Gameboard {
  constructor() { 
    this.board = createBoard()
    this.shipsCoordinates = []
    this.validCoordsArr = []
    this.missedShots = []
    this.shotsOnTarget = []
  }

  placeShip(shipLength) {
    const newShipCoords = calculateCoordinates(
      randomizeCoords(),
      randomizeSlope(),
      shipLength,
    )
    if (isInBounds(newShipCoords) && this.validShipCoords(newShipCoords)) {
      this.shipsCoordinates.push(newShipCoords)
      this.validCoordsArr.push(...newShipCoords)
      const ship = new Ship(shipLength)
      newShipCoords.forEach(([X, Y]) => (this.board[X][Y] = ship))
      return newShipCoords
    } else {
      if (!this._attempts) this._attempts = 0
      this._attempts++
      if (this._attempts > 100) throw new Error("Too many attempts to place ship.")
      return this.placeShip(shipLength)
    }
  }

  setUpShips() {
    while (true) {
      try {
        this.validCoordsArr = []
        this.shipsCoordinates = []
        this._attempts = 0

        for (let i = 0; i < 10; i++) {
          let len = 1
          if (i >= 4 && i < 7) len = 2
          if (i >= 7 && i < 9) len = 3
          if (i === 9) len = 4
          this.placeShip(len)
        }
        break
      } catch (e){
        e 
      }
    }
  }

  receiveAttack([X, Y]) {
    const target = this.board[X][Y]

    if (target instanceof Ship) {
      target.hit()
      this.shotsOnTarget.push([X, Y])
      return target
    } else {
      this.missedShots.push([X, Y])
      return "Miss"
    }
  }

  validShipCoords(arr) {
    const xArr = [0, 0, 1, 1, 1, -1, -1, -1]
    const yArr = [1, -1, 0, 1, -1, 0, 1, -1]
    const neighbours = neighbourCoords(arr, xArr, yArr)

    if (arr.some((coords) => includesCoord(this.validCoordsArr, coords)))
      return false
    if (neighbours.some((coords) => includesCoord(this.validCoordsArr, coords)))
      return false
    return true
  }

  areAllSunk() {
    return this.shipsCoordinates.flat().length === this.shotsOnTarget.length
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

function calculateCoordinates([X, Y], slope, length) {
  const shipCoords = []

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

function neighbourCoords(shipCoords, diffXarr, diffYarr) {
  const calculatedCoords = []

  shipCoords.forEach(([x, y]) => {
    for (let i = 0; i < 8; i++) {
      const nx = x + diffXarr[i]
      const ny = y + diffYarr[i]
      if (!includesCoord(shipCoords, [nx, ny])) calculatedCoords.push([nx, ny])
    }
  })
  return calculatedCoords
}

function includesCoord(arr, coord) {
  return arr.some(([x, y]) => x === coord[0] && y === coord[1])
}

function isInBounds(arr) {
  return arr.every(([x, y]) => x >= 0 && x <= 9 && y >= 0 && y <= 9)
}
