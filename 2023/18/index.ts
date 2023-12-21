const parseLine = (line) => {
  const [dir, n] = line.split(' ')
  return [dir, parseInt(n)]
}

const parseHexLine = (line) => {
  const hex = line.match(/\(#(.*)\)/)[1]
  return [
    'RDLU'[parseInt(hex[hex.length - 1])],
    parseInt(hex.substring(0, hex.length - 1), 16)
  ]
}

const calcArea = (parser) => (input) => {
  const dirs = {
    R: [1, 0],
    D: [0, 1],
    L: [-1, 0],
    U: [0, -1]
  }
  const points = [[0, 0]]
  let b = 0
  for (const [dir, n] of input.split('\n').map(parser)) {
    const [lastDx, lastDy] = points[points.length - 1]
    const [dx, dy] = dirs[dir]
    b += n
    points.push([lastDx + dx * n, lastDy + dy * n])
  }
  let total = 0
  for (let i = 0; i < points.length; i++) {
    total += points[i][0] * (
      points[(i > 0 ? i : points.length) - 1][1]
        - points[(i + 1) % points.length ][1]
    )
  }
  const interiorArea = Math.abs(total) / 2
  return interiorArea - b / 2 + 1 + b
}

export const p1 = calcArea(parseLine)
export const p2 = calcArea(parseHexLine)
