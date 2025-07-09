export class Gameboard {
  constructor() {
    this.board = createBoard()
  }

  placeShip(coordinates, slope, ship) {
    const shipCoords = calculateCoordinates(coordinates, slope, ship.length)
    for (let i = 0; i < shipCoords.length; i++) {
      const thisCoord = shipCoords[i]
      this.board[thisCoord[0]][thisCoord[1]] = "test"
    }
    return shipCoords
  }

  receiveAttack() {
    // takes a pair of coords, determines whether or not the attack hit a ship
    // and then sends the hit function to correct ship/records coords of missed shot
  }

  // gameboards should keep track of missed shots so they can display them properly

  // gameboards should be able to report whether or not all their ships have been sunk
}

function createBoard() {
  let board = []
  for (let i = 0; i < 10; i++) {
    board[i] = []
    for (let j = 0; j < 10; j++) {
      board[i][j] = [j, i]
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
    } else throw "Wrong slope"
  }
  return shipCoords
}
