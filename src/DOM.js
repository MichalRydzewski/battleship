import { setUpShips, validCoordsArr } from "./game.js"

setUpShips()
console.log(validCoordsArr)

export function loadDOM() {
  const board1 = document.querySelector(".board-1")
  loadBoard(board1)
  const board2 = document.querySelector(".board-2")
  loadBoard(board2)
}

function loadBoard(board) {
  for (let i = 1; i <= 100; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell", `cell-${i}`)
    board.appendChild(cell)
  }
}