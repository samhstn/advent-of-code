const last = (arr) => arr[arr.length - 1]

const dedupe = (a) => [...new Set(a.map(a => JSON.stringify(a)))].map(a => JSON.parse(a))

const sameStepCount = (path) => {
  let count = 1
  let dir = last(path)
  for (let i = path.length - 2; i >= 0; i--) {
    if (path[i] === dir) {
      dir = path[i]
      count += 1
    } else {
      return count
    }
  }
  return count
}

const next = (coords, grid) => {
  console.log(grid.map((row, y) => row.map((cell, x) => {
    const c = coords.find((coord) => coord[0] === x && coord[1] === y)
    return c?.[3] ? last(c[3]) : cell
  }).join('')).join('\n'))
  console.log(coords.map((coord) => JSON.stringify(coord)).join(' ') + '\n')

  const dirMap = {
    '<': [-1, 0],
    '>': [1, 0],
    '^': [0, -1],
    'v': [0, 1]
  }

  const oppositeDir = {
    '>': '<',
    '<': '>',
    '^': 'v',
    'v': '^'
  }

  const newCoords = []
  for (const [x, y, heatLoss, path] of coords) {
    const correctPath = [
      [1, 0, 4, '>'],
      [2, 0, 5, '>>'],
      [2, 1, 6, '>>v'],
      [3, 1, 11, '>v>'],
      [4, 1, 15, 'v>>'],
      [5, 1, 20, '>>>'],
      [5, 0, 23, '>>^'],
      [6, 0, 25, '>^>'],
      [7, 0, 28, '^>>'],
      [8, 0, 29, '>>>'],
      [8, 1, 32, '>>v'],
      [8, 2, 37, '>vv'],
      [9, 2, 41, 'vv>'],
      [10, 2, 43, 'v>>'],
      [10, 3, 47, '>>v'],
      [10, 4, 52, '>vv'],
    ]
    if (correctPath.map(p => JSON.stringify(p)).includes(JSON.stringify([x, y, heatLoss, path]))) {
      console.log('ccccccccccc', JSON.stringify([x, y, heatLoss, path]))
    }
    for (const dir of ['<', '>', '^', 'v']) {
      const [newX, newY] = [x + dirMap[dir][0], y + dirMap[dir][1]]
      if ( newX < 0 || newX >= grid[0].length
        || newY < 0 || newY >= grid.length
        || dir === oppositeDir[last(path)]
        || path === dir.repeat(3)) {
        continue
      }
      const cell = grid[newY][newX]
      if (heatLoss === 37) {
        // console.log('pushing', [newX, newY, heatLoss + cell, `${path}${dir}`.slice(-3)])
      }
      newCoords.push([newX, newY, heatLoss + cell, `${path}${dir}`.slice(-3)])
    }
  }
  return newCoords
}

export const p1 = (input) => {
  const grid = input.split('\n').map(line => line.split('').map(c => parseInt(c)))
  const visited = new Map()
  let coords = [[0, 0, 0, '']]
  let count = 0
  while (coords.length > 0 && count < 20) {
    console.log(`count ${count}`)
    coords = next(coords, grid)
    coords = dedupe(coords)
    const toRemove = new Set()
    for (const [x, y, heatLoss, path] of coords) {
      const key = `${x},${y},${path}`
      if (visited.has(key)) {
        const visitedHeatLoss = visited.get(key)
        if (visitedHeatLoss > heatLoss) {
          visited.set(key, heatLoss)
        } else {
          toRemove.add(key)
        }
      } else {
        visited.set(key, heatLoss)
      }
    }
    coords = coords.filter(([x, y, _, path]) => !toRemove.has(`${x},${y},${path}`))
    count += 1
  }
  let minHeatLoss = Infinity
  for (const [path, heatLoss] of visited) {
    if (path.split(',').slice(0, 2).join(',') === `${grid[0].length - 1},${grid.length - 1}`) {
      console.log('pppppp', path.split(',').slice(0, 2).join(','), `${grid[0].length - 1},${grid.length - 1}`)
      minHeatLoss = Math.min(heatLoss, minHeatLoss)
    }
  }
  // console.log(JSON.stringify(paths, null, 2))
  return minHeatLoss
}

export const p2 = (input) => {
}
