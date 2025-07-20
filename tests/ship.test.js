import { Ship } from "../src/ship.js"

const testShip = new Ship(3)
const testShip2 = new Ship(2)

testShip.hit()
testShip.hit()

testShip2.hit()
testShip2.hit()

test("increases the number of hits in ship", () => {
  expect(testShip.timesHit).toBeGreaterThan(0)
})

test("ship is sunk when number of hits equals or is greater than its length", () => {
  expect(testShip.sunken).toBe(false)

  expect(testShip2.sunken).toBe(true)
})
