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

board2.addEventListener("click", e => {
  const cell = e.target
  if (cell.matches(".ship")) {
    cell.classList.add("shot")
  } 
  if (cell.matches(".cell") && !cell.matches(".ship") && !cell.matches(".missed")) {
    cell.classList.add("missed")
    const div = document.createElement("div")
    div.classList.add("missed-shot")
    cell.appendChild(div)
  } 
})
