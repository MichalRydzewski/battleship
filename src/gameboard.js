export class Gameboard {
  createBoard() {
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr[i] = []
      for (let j = 0; j < 10; j++) {
        arr[i][j] = `[${i}][${j}]`
      }
    }
    return arr
  }

  placeShip() {
    
  }

  receiveAttack() {
    // takes a pair of coords, determines whether or not the attack hit a ship
    // and then sends the hit function to correct ship/records coords of missed shot
  }

  // gameboards should keep track of missed shots so they can display them properly

  // gameboards should be able to report whether or not all their ships have been sunk
}
