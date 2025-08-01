import { setUpShips, validCoordsArr } from "./game.js"

export function loadDOM() {
  const board1 = document.querySelector(".board-1")
  loadBoard(board1)
  const board2 = document.querySelector(".board-2")
  loadBoard(board2)

  setUpShips()
  const sortedShipsCoordsArr = validCoordsArr.sort((a, b) => a[0] - b[0])
  sortedShipsCoordsArr.forEach(coord => {
    board1.querySelector(`.cell-${coord[0]}-${coord[1]}`).classList.add("ship")
  })
}

function loadBoard(board) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div")
      cell.classList.add("cell", `cell-${i}-${j}`)
      board.appendChild(cell)
    }
  }
}
