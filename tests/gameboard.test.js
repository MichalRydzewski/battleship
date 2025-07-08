import { Gameboard } from "../src/gameboard.js"

const testGameboard = new Gameboard
test("takes boards coordinates and returnes them printed", () => {
  expect(testGameboard.createBoard()[3][3]).toBe("[3][3]")
  expect(testGameboard.createBoard()[0][2]).toBe("[0][2]")
})
test("flattens boards coordinates arrays into one and returns its length", () => {
  expect(testGameboard.createBoard().flat(2).length).toBe(100)
})