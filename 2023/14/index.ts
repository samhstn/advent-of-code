const move = (grid) => {
  const g = [...grid]
  let moved = false
  for (let j = 1; j < g.length; j++) {
    for (let i = 0; i < g[0].length; i++) {
      if (g[j][i] === 'O' && g[j - 1][i] === '.') {
        g[j - 1][i] = 'O'
        g[j][i] = '.'
        moved = true
      }
    }
  }

  return [moved, grid]
}

const turn = (grid) => {
  const rotated = grid[0].map(_ => [])

  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[0].length; i++) {
      rotated[i][grid.length - 1 - j] = grid[j][i]
    }
  }

  return rotated
}

export const p1 = (input) => {
  let moved = true
  let grid = input.split('\n').map(line => line.split(''))
  while (moved) {
    [moved, grid] = move(grid)
  }
  return grid.reduce((total, row, i) => {
    return total + row.filter(c => c === 'O').length * (grid.length - i)
  }, 0)
}

export const p2 = (input) => {
  let moved = true
  let grid = input.split('\n').map(line => line.split(''))
  let count = 0
  const patterns = []
  const total = 1000000000
  while (count < total) {
    const pattern = grid.map(l => l.join('')).join('')
    if (patterns.includes(pattern)) {
      const cycle = count - patterns.indexOf(pattern)
      const offset = (total - patterns.indexOf(pattern)) % cycle
      count = total - offset
    }
    patterns.push(pattern)
    while (moved) {
      [moved, grid] = move(grid)
    }
    moved = true
    grid = turn(grid)
    while (moved) {
      [moved, grid] = move(grid)
    }
    moved = true
    grid = turn(grid)
    while (moved) {
      [moved, grid] = move(grid)
    }
    moved = true
    grid = turn(grid)
    while (moved) {
      [moved, grid] = move(grid)
    }
    moved = true
    grid = turn(grid)
    count += 1
  }
  return grid.reduce((total, row, i) => {
    return total + row.filter(c => c === 'O').length * (grid.length - i)
  }, 0)
}
