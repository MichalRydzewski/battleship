import { calculateCoordinates, Gameboard } from "./gameboard.js"
import { Ship } from "./gameboard.js"
import { randomizeCoords, randomizeSlope } from "./helper-functions.js"

export const validCoordsArr = []

export function setUpShips() {
  for (let i = 0; i < 10; i++) {
    let shipCoords = setShip(1)
    if (i >= 4 && i < 7) shipCoords = setShip(2)
    if (i >= 7 && i < 9) shipCoords = setShip(3)
    if (i === 9) shipCoords = setShip(4)
    shipCoords.forEach((coord) => validCoordsArr.push(coord))
  }
}

function setShip(shipLength) {
  const newShipCoords = calculateCoordinates(
    randomizeCoords(),
    randomizeSlope(),
    new Ship(shipLength).length,
  )

  if (isInBounds(newShipCoords) && validShipCoords(newShipCoords))
    return newShipCoords
  else return setShip(shipLength)
}

function validShipCoords(arr) {
  const xArr = [0, 0, 1, 1, 1, -1, -1, -1]
  const yArr = [1, -1, 0, 1, -1, 0, 1, -1]

  const neighbours = neighbourCoords(arr, xArr, yArr)

  if (arr.some((coords) => includesCoord(validCoordsArr, coords))) return false
  if (neighbours.some((coords) => includesCoord(validCoordsArr, coords))) return false

  return true
}

function neighbourCoords(shipCoords, diffXarr, diffYarr) {
  const calculatedCoords = []

  shipCoords.forEach(([x,y]) => {
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

export class Player {
  constructor(player) {
    this.playerType = player
    this.gameboard = new Gameboard()
  }
}
