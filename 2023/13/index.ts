const transpose = (m) => m[0].split('').map((x, i) => m.map((x) => x[i]).join(''))

const reflectionPoint = (pattern, excludeRow) => {
  outer:
  for (let i = 1; i < pattern[0].length; i++) {
    if (i === excludeRow) {
      continue
    }
    for (let j = 0; j < pattern.length; j++) {
      const first = pattern[j].substring(0, i)
      const last = pattern[j].substring(i)
      const minLen = Math.min(first.length, last.length)
      if (first.slice(-1 * minLen) !== last.substring(0, minLen).split('').reverse().join('')) {
        continue outer
      }
    }
    return i
  }
}

export const p1 = (input) => {
  let total = 0

  for (const pattern of input.split('\n\n').map(pattern => pattern.split('\n'))) {
    const verticalPoint = reflectionPoint(pattern)
    const horizontalPoint = reflectionPoint(transpose(pattern))

    total += verticalPoint ? verticalPoint : horizontalPoint * 100
  }

  return total
}

const smudgedPatterns = (pattern) => {
  const ps = []
  for (let j = 0; j < pattern.length; j++) {
    for (let i = 0; i < pattern[0].length; i++) {
      ps.push(pattern.map((row, y) => {
        return row.split('').map((col, x) => {
          return j === y && x === i ? col === '#' ? '.' : '#' : col
        }).join('')
      }))
    }
  }
  return ps
}

export const p2 = (input) => {
  let total = 0

  for (const pattern of input.split('\n\n').map(pattern => pattern.split('\n'))) {
    const originalVerticalPoint = reflectionPoint(pattern)
    const originalHorizontalPoint = reflectionPoint(transpose(pattern))

    for (const smudgedPattern of smudgedPatterns(pattern)) {
      const verticalPoint = reflectionPoint(smudgedPattern, originalVerticalPoint)
      const horizontalPoint = reflectionPoint(transpose(smudgedPattern), originalHorizontalPoint)

      if (verticalPoint && verticalPoint !== originalVerticalPoint) {
        total += verticalPoint
        break
      } else if (horizontalPoint && horizontalPoint !== originalHorizontalPoint) {
        total += 100 * horizontalPoint
        break
      }
    }
  }

  return total
}
