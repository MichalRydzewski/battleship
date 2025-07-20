export class Ship {
  constructor(length) {
    this.length = length
    this.timesHit = 0
    this.sunken = isSunk(this)
  }

  hit() {
    this.timesHit++
    this.sunken = isSunk(this)
  }
}

function isSunk(ship) {
  if (ship.timesHit >= ship.length) return true
  else return false
}
