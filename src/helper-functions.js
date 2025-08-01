export function randomizeCoords() {
  const coords = [randomizeNumber(10), randomizeNumber(10)]
  return coords
}

function randomizeNumber(max, extra = 0) {
  return Math.floor(Math.random() * max) + extra
}

export function randomizeSlope() {
  const randomNum = randomizeNumber(101)
  if (randomNum % 2 === 0) return "|"
  else return "-"
}
