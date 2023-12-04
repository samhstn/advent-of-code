function getCoords(grid, char) {
  const coords = []
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i]
    for (let j = 0; j < line.length; j++) {
      if (line[j] === char) {
        coords.push([j, i])
      }
    }
  }
  return coords
}

function getAdjacent([x, y]) {
  return [[x - 1, y], [x, y - 1], [x + 1, y], [x, y + 1]]
}

function inVisited(coord, visited) {
  for (const visitedCoord of visited) {
    if (visitedCoord[0] === coord[0] && visitedCoord[1] === coord[1]) {
      return true
    }
  }
  return false
}

function isAscendable([a1, a2], [b1, b2], grid) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  return alphabet.indexOf(grid[b2][b1]) - alphabet.indexOf(grid[a2][a1]) < 2
}

const run = (char) => (input) => {
  const grid = input.split('\n')
  const endingCoord = getCoords(grid, 'E')[0]

  let positions = getCoords(grid, char)
  const visited = getCoords(grid, char)
  let steps = 1

  while (positions.length > 0) {
    steps++
    const nextPositions = []

    for (const position of positions) {
      for (const adjacent of getAdjacent(position)) {
        if (adjacent[0] === endingCoord[0] && adjacent[1] === endingCoord[1]) {
          return steps + 1
        }
        if (
          (grid[adjacent[1]] || {})[adjacent[0]]
          && !inVisited(adjacent, visited)
          && isAscendable(position, adjacent, grid)) {
          nextPositions.push(adjacent)
          visited.push(adjacent)
        }
      }
    }
    positions = nextPositions
  }
  return steps
}

export const p1 = run('S')
export const p2 = run('a')
