import {
  Gameboard,
  isInBounds,
  calculateCoordinates,
  neighbourCoords,
  Ship,
} from "../src/gameboard.js"

describe("isInBounds()", () => {
  test("returns true for proper coordinates", () => {
    expect(
      isInBounds([
        [0, 0],
        [5, 5],
        [9, 9],
      ]),
    ).toBe(true)
  })

  test("returns false for wrong coordinates", () => {
    expect(
      isInBounds([
        [10, 0],
        [5, 5],
      ]),
    ).toBe(false)
  })
})

describe("Gameboard class", () => {
  let testGameboard 

  beforeEach(() => {
    testGameboard = new Gameboard()
  })

  test("has coordinates [3,3] at position 3,3", () => {
    expect(testGameboard.board[3][3]).toEqual([3, 3])
  })

  test("has total of 100 fields", () => {
    expect(testGameboard.board.flat()).toHaveLength(100)
  })

  test("receives attacks correctly", () => {
    const testShip = new Ship(2)
    testGameboard.board[1][1] = testShip
    testGameboard.receiveAttack([1, 1])

    expect(testGameboard.shotsOnTarget).toEqual([[1, 1]])
  })

  test("checks if all ships are sunk", () => {
    testGameboard.setUpShips()
    const shipCoords = testGameboard.shipsCoordinates
    let arr = []
    for (let i = 0; i < 10; i++) {
      shipCoords[i].forEach((el) => {
        arr.push(el)
      })
    }
    arr.forEach((el) => testGameboard.receiveAttack(el))
    expect(testGameboard.areAllSunk()).toBe(true)
  })
})

describe("calculateCoords()", () => {
  test("calculates coordinates vertically", () => {
    const result = calculateCoordinates([2, 3], "|", 3)
    expect(result).toEqual([
      [2, 3],
      [2, 4],
      [2, 5],
    ])
  })
  test("calculates coordinates in horizontally", () => {
    const result = calculateCoordinates([4, 1], "-", 2)
    expect(result).toEqual([
      [4, 1],
      [5, 1],
    ])
  })
})

test("returns neighbour coordinates", () => {
  const xArr = [0, 0, 1, 1, 1, -1, -1, -1]
  const yArr = [1, -1, 0, 1, -1, 0, 1, -1]

  const neighbourCoordinates = neighbourCoords([[1,1],[2,1]], xArr, yArr)
  const expected = [
    [1, 2], [1, 0], [2, 2], [2, 0],
    [3, 1], [3, 2], [3, 0], [0, 1],
    [0, 2], [0, 0]
  ]

  expected.forEach((coord) => {
    expect(neighbourCoordinates).toContainEqual(coord)
  })
})

describe("Ship class", () => {
  test("increases the number of hits", () => {
    const ship = new Ship(3)
    ship.hit()
    ship.hit()
    expect(ship.timesHit).toBe(2)
    expect(ship.sunken).toBe(false)
  })

  test("ship is sunk when hits equal its length", () => {
    const ship = new Ship(2)
    ship.hit()
    ship.hit()
    expect(ship.sunken).toBe(true)
  })

  test("ship is not sunk when hits are less than length", () => {
    const ship = new Ship(4)
    ship.hit()
    ship.hit()
    expect(ship.sunken).toBe(false)
  })
})
