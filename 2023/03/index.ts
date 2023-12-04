const getCoords = (input, symbolRe) => {
  const symbolCoords = []
  const numberWithCoords = []

  input.split('\n').forEach((line, lineIndex) => {
    line.split('').forEach((char, charIndex) => {
      if (symbolRe.test(char)) {
        symbolCoords.push([charIndex, lineIndex])
      }
    })

    let numberIndexCount = 0
    line.replace(/[^\d]/g, ' ').split(' ').forEach((nStr) => {
      if (nStr === '') {
        numberIndexCount += 1
      } else {
        numberWithCoords.push([nStr, numberIndexCount, lineIndex])
        numberIndexCount += nStr.length + 1
      }
    })
  })

  return [symbolCoords, numberWithCoords]
}

export const p1 = (input) => {
  const [symbolCoords, numberWithCoords] = getCoords(input, /[^\d\.]/)
  let total = 0

  numberLoop:
  for (const [nStr, x, y] of numberWithCoords) {
    for (const [sx, sy] of symbolCoords) {
      if (Math.abs(y - sy) <= 1) {
        for (let i = 0; i < nStr.length; i++) {
          if (Math.abs(x + i - sx) <= 1) {
            total += parseInt(nStr)
            continue numberLoop
          }
        }
      }
    }
  }

  return total
}

export const p2 = (input) => {
  const [symbolCoords, numberWithCoords] = getCoords(input, /\*/)
  let total = 0

  for (const [sx, sy] of symbolCoords) {
    const neighbours = []
    numberLoop:
    for (const [nStr, x, y] of numberWithCoords) {
      if (Math.abs(y - sy) <= 1) {
        for (let i = 0; i < nStr.length; i++) {
          if (Math.abs(x + i - sx) <= 1) {
            neighbours.push(parseInt(nStr))
            continue numberLoop
          }
        }
      }
    }
    if (neighbours.length === 2) {
      total += neighbours[0] * neighbours[1]
    }
  }

  return total
}
