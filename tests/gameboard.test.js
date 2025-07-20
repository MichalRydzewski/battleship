import { Gameboard } from "../src/gameboard.js"
import { Ship } from "../src/ship.js"

const testGameboard = new Gameboard()

test("takes board coordinates and returnes them printed", () => {
  expect(testGameboard.board[3][3]).toEqual([3, 3])
  expect(testGameboard.board[3][4]).toEqual([3, 4])
})
test("flattens board coordinates arrays into one and returns its length", () => {
  expect(testGameboard.board.flat(1)).toHaveLength(100)
})

const testShipL4 = new Ship(4)
const testShipL3 = new Ship(3)

test("input first coordinates field, slope (|) / (-), and ship - than places it at assigned coords", () => {
  testGameboard.placeShip([5, 5], "-", testShipL4)
  expect(testGameboard.board[5][5]).toBeInstanceOf(Ship)
  expect(testGameboard.board[6][5]).toBeInstanceOf(Ship)
  expect(testGameboard.board[7][5]).toBeInstanceOf(Ship)
  expect(testGameboard.board[8][5]).toBeInstanceOf(Ship)

  testGameboard.placeShip([3, 3], "|", testShipL3)
  expect(testGameboard.board[3][3]).toBeInstanceOf(Ship)
  expect(testGameboard.board[3][4]).toBeInstanceOf(Ship)
  expect(testGameboard.board[3][5]).toBeInstanceOf(Ship)

  expect(testGameboard.shipsCoordinates.flat(1)).toHaveLength(7)

  expect(testGameboard.board[2][2]).not.toBeInstanceOf(Ship)
})

test("takes board coordinates, than determines whether it's a hit or miss - if hit send hit() to proper ship, if miss record missed shot", () => {
  expect(testGameboard.receiveAttack([3, 3])).toHaveProperty("timesHit")
  expect(testGameboard.receiveAttack([3, 4])).toHaveProperty("timesHit")
  expect(testGameboard.receiveAttack([3, 5])).toHaveProperty("timesHit")
  expect(testShipL3.sunken).toBe(true)

  expect(testGameboard.receiveAttack([0, 0])).toBe("Missed shots: [[0,0]]")
  expect(testGameboard.receiveAttack([9, 9])).toBe(
    "Missed shots: [[0,0],[9,9]]",
  )
  expect(testGameboard.receiveAttack([0, 1])).toBe(
    "Missed shots: [[0,0],[9,9],[0,1]]",
  )
})

test("determines whether all ships are sunk", () => {
  testGameboard.receiveAttack([5, 5])
  testGameboard.receiveAttack([6, 5])
  testGameboard.receiveAttack([7, 5])
  testGameboard.receiveAttack([8, 5])
  expect(testGameboard.areAllSunk()).toBe(true)

  const testShipL2 = new Ship(2)
  testGameboard.placeShip([1, 1], "-", testShipL2)
  expect(testGameboard.areAllSunk()).toBe(false)
})
