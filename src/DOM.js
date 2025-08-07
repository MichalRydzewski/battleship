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
  if (board === board1) {
    player.validCoordsArr.forEach(([x, y]) => {
      board.querySelector(`.cell-${x}-${y}`)?.classList.add("ship")
    })
  }
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

board2.addEventListener("click", shoot)

function shoot(e) {
  const target = e.target
  if (
    !target.classList.contains("cell") ||
    target.classList.contains("shot") ||
    target.classList.contains("missed")
  ) return

  const cellClass = [...target.classList].find((cls) => cls.startsWith("cell-"))
  if (!cellClass) return

  const [x, y] = cellClass.split("-").slice(1).map(Number)

  const isHit = computer.validCoordsArr.some(([dx, dy]) => dx === x && dy === y)
  if (isHit) {
    target.classList.add("shot")
    computer.receiveAttack([x,y])
    console.log(computer.shotsOnTarget);
  } else {
    target.classList.add("missed")
    const div = document.createElement("div")
    div.classList.add("missed-shot")
    target.appendChild(div)
  }
  if (computer.areAllSunk()) {
    endScreen("win")
    return
  }
  // enemyTurn()
}

function endScreen(endResult) {
  const winScreen = document.createElement("div")
  winScreen.classList.add(`you-${endResult}`)
  winScreen.textContent = `YOU ${endResult.toUpperCase()}!`

  const restartBtn = document.createElement("button")
  restartBtn.textContent = "Play again"
  restartBtn.classList.add("restart-btn")
  restartBtn.addEventListener("click", () => {
    location.reload() 
  })

  winScreen.appendChild(restartBtn)
  document.body.appendChild(winScreen)
}