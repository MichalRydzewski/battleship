import { human, computer } from "./game.js"

const board1 = document.querySelector(".board-1")
const board2 = document.querySelector(".board-2")

export function loadDOM() {
  renderShips(board1, human)
  renderShips(board2, computer)
}

function renderShips(board, player) {
  loadBoard(board)
  player.setUpShips()
  player.validCoordsArr.forEach(([x, y]) => {
    board.querySelector(`.cell-${x}-${y}`)?.classList.add("ship")
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
