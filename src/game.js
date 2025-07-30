import { calculateCoordinates } from "./gameboard.js"
import { Ship } from "./ship.js"
import { randomizeCoords, randomizeSlope } from "./helper-functions.js"

export const validCoordsArr = []

// const gameboard = new Gameboard()

function setShip(shipLength) {
  const newShipCoords = calculateCoordinates(
    randomizeCoords(),
    randomizeSlope(),
    new Ship(shipLength).length,
  )
  const coordsFlat = newShipCoords.flat()

  if (
    !coordsFlat.some((el) => el > 9 || el < 0) &&
    validShipCoords(newShipCoords)
  )
    return newShipCoords
  else return setShip(shipLength)
}

function validShipCoords(arr) {
  if (!arr.every((coords) => !validCoordsArr.includes(JSON.stringify(coords)))) {
    return false
  }
  const xArr = [0, 0, 1, 1, 1, -1, -1, -1]
  const yArr = [1, -1, 0, 1, -1, 0, 1, -1]
  return !neighbourCoords(arr, xArr, yArr).includes(arr) ? true : false
}

function neighbourCoords(shipCoords, diffXarr, diffYarr) {
  const calculatedCoords = []
  shipCoords.forEach(coord => {
    for (let i = 0; i < 8; i++) {
      calculatedCoords.push([coord[0] + diffXarr[i], coord[1] + diffYarr[i]])
    }
  })
  return [...new Set(calculatedCoords)]
}

function setUpShips() {
  for (let i = 0; i < 10; i++) {
    let shipCoords = setShip(1)
    if (i >= 4 && i < 7) shipCoords = setShip(2)
    if (i >= 7 && i < 9) shipCoords = setShip(3)
    if (i === 9) shipCoords = setShip(4)
    shipCoords.forEach((coord) => validCoordsArr.push(JSON.stringify(coord)))
  }
}

setUpShips()
console.log(validCoordsArr);