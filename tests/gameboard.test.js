import { Gameboard } from "../src/gameboard.js"
import { Ship } from "../src/ship.js"

const testGameboard = new Gameboard()

test("takes boards coordinates and returnes them printed", () => {
  expect(testGameboard.board[3][3]).toEqual([3, 3])
})
test("flattens boards coordinates arrays into one and returns its length", () => {
  expect(testGameboard.board.flat(1)).toHaveLength(100)
})

const testShipL4 = new Ship(4)
const testShipL3 = new Ship(3)

test("input coordinates, slope (|) / (-), and ship - than places it on these coords and returns information about it", () => {
  testGameboard.placeShip([5, 5], "-", testShipL4)
  expect(testGameboard.board[5][5]).toHaveProperty("sunken")
  expect(testGameboard.board[6][5]).toHaveProperty("sunken")
  expect(testGameboard.board[7][5]).toHaveProperty("sunken")
  expect(testGameboard.board[8][5]).toHaveProperty("sunken")

  testGameboard.placeShip([3, 3], "|", testShipL3)
  expect(testGameboard.board[3][3]).toHaveProperty("sunken")
  expect(testGameboard.board[3][4]).toHaveProperty("sunken")
  expect(testGameboard.board[3][5]).toHaveProperty("sunken")

  expect(testGameboard.board[2][2]).not.toHaveProperty("sunken")
})
