export class Ship {
  constructor(length) {
    this.length = length
    this.timesHit = 0
    this.sunken = false
  }

  hit() {
    this.timesHit++
  }

  isSunk() {
    if (this.timesHit >= this.length) return (this.sunken = true)
    else return (this.sunken = false)
  }
}
