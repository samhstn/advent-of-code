const getLoop = (grid) => {
  const loop = []

  let startCoord

  outer:
  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[0].length; i++) {
      if (grid[j][i] === 'S') {
        startCoord = [i, j, 'S']
        break outer
      }
    }
  }

  let chosenBlock, chosenAdj

  const next = ([cx, cy, b], [lx, ly]) => {
    const adj = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    const validBlocks = [
      ['|', 'L', 'J', 'S'],
      ['-', 'J', '7', 'S'],
      ['|', '7', 'F', 'S'],
      ['-', 'L', 'F', 'S']
    ]
    const validDirections = {
      '|': [[0, 1], [0, -1]],
      '-': [[1, 0], [-1, 0]],
      'L': [[1, 0], [0, -1]],
      'J': [[-1, 0], [0, -1]],
      '7': [[-1, 0], [0, 1]],
      'F': [[1, 0], [0, 1]],
      'S': [[0, 1], [1, 0], [0, -1], [-1, 0]]
    }

    for (const [i, [x, y]] of adj.entries()) {
      if (!validDirections[b].map(v => v.join(',')).includes([x, y].join(','))) {
        continue
      }
      const block = grid[cy + y]?.[cx + x]
      const newCoord = [cx + x, cy + y, block]
      if (!block) {
        continue
      }
      if (newCoord.slice(0, 2).join(',') === [lx, ly].join(',')) {
        continue
      }
      if (validBlocks[i].includes(block)) {
        chosenBlock = block
        chosenAdj = [x, y]
        return newCoord
      }
    }
  }

  let lastCoord = [...startCoord]
  let coord = next(startCoord, lastCoord)
  let count = 1
  loop.push(coord.slice(0, 2).join(','))

  while (coord.join(',') !== startCoord.join(',')) {
    const prevCoord = [...coord]
    coord = next(coord, lastCoord)
    loop.push(coord.slice(0, 2).join(','))
    lastCoord = prevCoord
    count += 1
  }
  return loop
}

export const p1 = (input) => {
  const grid = input.split('\n').map(line => line.split(''))
  return getLoop(grid).length / 2
}

export const p2 = (input) => {
  const grid = input.split('\n').map(line => line.split(''))
  const loop = getLoop(grid)
  const maxX = Math.max(...loop.map(c => parseInt(c.split(',')[0])))
  const maxY = Math.max(...loop.map(c => parseInt(c.split(',')[1])))

  const enclosed = []
  let enclosedCount = 0
  for (let j = 0; j < maxY; j++) {
    for (let i = 0; i < maxX; i++) {
      if (loop.includes([i, j].join(','))) {
        continue
      }

      let intersectionCount = 0
      for (let k = 0; k < i; k++) {
        const block = grid[j][k]
        if (loop.includes([k, j].join(',')) && ['L', 'J', '|'].includes(block)) {
          intersectionCount += 1
        }
      }
      if (intersectionCount % 2 === 1) {
        enclosed.push([i, j].join(','))
        enclosedCount += 1
      }
    }
  }

  // log grid
  // console.log(grid.map((row, rowI) => {
  //   return row.map((col, colI) => {
  //     return enclosed.includes([colI, rowI].join(',')) ? '■' : loop.includes([colI, rowI].join(',')) ? col : ' '
  //   }).join('')
  // }).join('\n'))

  return enclosedCount
}

