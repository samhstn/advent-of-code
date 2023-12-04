function getGrid(input) {
  return input
    .trim()
    .split('\n')
    .map(line => line.split('').map(s => parseInt(s)))
}

export function p1(input) {
  const grid = getGrid(input)
  let visible = 0

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i]
    for (let j = 0; j < row.length; j++) {
      const height = row[j]
      if (
        row.slice(0, j).every(k => k < height) ||
        row.slice(j + 1).every(k => k < height) ||
        grid.map(line => line[j]).slice(0, i).every(k => k < height) ||
        grid.map(line => line[j]).slice(i + 1).every(k => k < height)
      ) {
        visible ++
      }
    }
  }

  return visible
}

export function p2(input) {
  const grid = getGrid(input)
  let score = 0

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i]
    for (let j = 0; j < row.length; j++) {
      const height = row[j]
      let j1 = j - 1, j1Score = 1,
          j2 = j + 1, j2Score = 1,
          i1 = i - 1, i1Score = 1,
          i2 = i + 1, i2Score = 1
      if (i === 0 || i === grid.length - 1 || j === 0 || j === row.length - 1) {
        continue
      }
      const column = grid.map(line => line[j])
      while (i1 > 0 && column[i1] < height) {
        i1Score++
        i1--
      }
      while (j1 > 0 && row[j1] < height) {
        j1Score++
        j1--
      }
      while (j2 < row.length - 1 && row[j2] < height) {
        j2Score++
        j2++
      }
      while (i2 < column.length - 1 && column[i2] < height) {
        i2Score++
        i2++
      }

      score = Math.max(score, j1Score * j2Score * i1Score * i2Score)
    }
  }

  return score
}
