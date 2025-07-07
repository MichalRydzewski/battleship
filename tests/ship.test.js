import { Ship } from "../src/ship.js"

const testShip = new Ship(3)

test("increases the number of hits in ship", () => {
  testShip.hit()
  testShip.hit()
  testShip.hit()
  testShip.hit()
  expect(testShip.timesHit).toBeGreaterThan(0)
})

test("ship is sunk when number of hits equals or is greater than its length", () => {
  testShip.isSunk()
  expect(testShip.sunken).toBe(true)
})
