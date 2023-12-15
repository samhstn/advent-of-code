const combinations = arr => {
  if (arr.length === 2) {
    return [arr]
  } else {
    const [first, ...last] = arr
    return last.map(e => [first, e]).concat(combinations(last))
  }
}

const getDists = (input, factor) => {
  const grid = input.split('\n').map(line => line.split(''))
  const galaxyCoords = []
  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[0].length; i++) {
      if (grid[j][i] === '#') {
        galaxyCoords.push([i, j])
      }
    }
  }

  const doubleI = [...Array(grid[0].length).keys()].filter(i => !galaxyCoords.some(([x, _]) => x === i));
  const doubleJ = [...Array(grid.length).keys()].filter(j => !galaxyCoords.some(([_, y]) => y === j));

  const newGalaxyCoords = galaxyCoords.map(([x, y]) => {
    return [
      doubleI.filter(i => i < x).length * factor + x,
      doubleJ.filter(j => j < y).length * factor + y
    ]
  })

  let total = 0

  for (const [[ax, ay], [bx, by]] of combinations(newGalaxyCoords)) {
    total += Math.abs(bx - ax) + Math.abs(by - ay)
  }

  return total
}

export const p1 = (input) => {
  return getDists(input, 1)
}

export const p2 = (input) => {
  return getDists(input, 999999)
}
