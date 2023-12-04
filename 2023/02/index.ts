const parseSubset = (subset) => {
  const greenStr = subset.match(/(\d+) green/)?.[1] ?? '0'
  const blueStr = subset.match(/(\d+) blue/)?.[1] ?? '0'
  const redStr = subset.match(/(\d+) red/)?.[1] ?? '0'

  return [greenStr, blueStr, redStr].map(s => parseInt(s))
}

export const p1 = (input) => {
  let total = 0

  for (const line of input.split('\n')) {
    const gameN = parseInt(line.split(':')[0].split(' ')[1])
    const subsets = line.split(':')[1].trim().split(';')
    let valid = true
    for (const [green, blue, red] of subsets.map(parseSubset)) {
      if (green > 13 || blue > 14 || red > 12) {
        valid = false
        break
      }
    }
    if (valid) {
      total += gameN
    }
  }

  return total
}

export const p2 = (input) => {
  let total = 0

  for (const line of input.split('\n')) {
    const gameN = parseInt(line.split(':')[0].split(' ')[1])
    const subsets = line.split(':')[1].trim().split(';')
    let minGreen = 0,
        minBlue = 0,
        minRed = 0
    for (const [green, blue, red] of subsets.map(parseSubset)) {
      minGreen = Math.max(green, minGreen)
      minBlue = Math.max(blue, minBlue)
      minRed = Math.max(red, minRed)
    }
    total += minGreen * minBlue * minRed
  }

  return total
}
