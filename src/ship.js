export class Ship {
  constructor(length) {
    this.length = length
    this.timesHit = 0
    this.isSunk = false
  }

  hit() {}

  isSunk() {}
}

// ONLY TEST PUBLIC INTERFACE (methods/properties that are used outside of class)
