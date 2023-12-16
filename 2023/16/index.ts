const next = (coords, grid) => {
  // console.log(grid.map((row, y) => row.map((cell, x) => {
  //   const dirMap = {
  //     '1,0': '>',
  //     '0,-1': '^',
  //     '-1,0': '<',
  //     '0,1': 'v'
  //   }
  //   const c = coords.find((coord) => coord[0] === x && coord[1] === y)
  //   return c ? dirMap[c.slice(2).join(',')] : cell
  // }).join('')).join('\n'))
  // console.log(coords.join(' ') + '\n')

  const newCoords = []
  for (let [x, y, dx, dy] of coords) {
    x += dx
    y += dy
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
      continue
    }

    const cell = grid[y][x]
    if (cell === '/') {
      newCoords.push([x, y, dy * -1, dx * -1])
    } else if (cell === '\\') {
      newCoords.push([x, y, dy, dx])
    } else if (cell === '|' && (dx === 1 || dx === -1)) {
      newCoords.push([x, y, 0, 1], [x, y, 0, -1])
    } else if (cell === '-' && (dy === 1 || dy === -1)) {
      newCoords.push([x, y, 1, 0], [x, y, -1, 0])
    } else {
      newCoords.push([x, y, dx, dy])
    }
  }
  return newCoords
}

const getEnergized = (grid, coords) => {
  const energized = new Set()
  const visited = new Set()
  let count = 0
  while (coords.length > 0) {
    coords = next(coords, grid)
    coords = coords.filter(c => !visited.has(c.join(',')))
    coords.forEach((coord) => {
      const [x, y] = coord
      visited.add(coord.join(','))
      energized.add(`${x},${y}`)
    })
    count += 1
  }
  return energized
}

export const p1 = (input) => {
  const grid = input.split('\n').map(line => line.split(''))
  return getEnergized(grid, [[-1, 0, 1, 0]]).size
}

export const p2 = (input) => {
  const startingCoords = [] // [[3, -1, 0, 1]]
  const grid = input.split('\n').map(line => line.split(''))
  for (let i = 0; i < grid[0].length; i++) {
    startingCoords.push([i, -1, 0, 1])
    startingCoords.push([i, grid[0].length, 0, -1])
  }
  for (let j = 0; j < grid.length; j++) {
    startingCoords.push([-1, j, 1, 0])
    startingCoords.push([grid.length, j, -1, 0])
  }
  let maxEnergized = 0
  for (const coord of startingCoords) {
    maxEnergized = Math.max(getEnergized(grid, [coord]).size, maxEnergized)
  }
  return maxEnergized
}
