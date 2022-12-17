const isInt = Number.isInteger
const isArr = Array.isArray

function ordered(a, b) {
  if (isInt(a) && isInt(b) && a < b) {
    return 1
  } else if (isInt(a) && isInt(b) && b < a) {
    return -1
  } else if (isInt(a) && isArr(b)) {
    return ordered([a], b)
  } else if (isArr(a) && isInt(b)) {
    return ordered(a, [b])
  } else if (a === b && (isInt(a) || a === undefined)) {
    return 0
  } else if (a === undefined) {
    return 1
  } else if (b === undefined) {
    return -1
  }

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const result = ordered(a[i], b[i])
    if (result !== 0) {
      return result
    }
  }

  return 0
}

export function p1(input) {
  const pairs = input
    .split('\n\n')
    .map(line => line.split('\n'))
    .map(([a, b]) => [JSON.parse(a), JSON.parse(b)])

  let total = 0

  for (const [index, [a, b]] of pairs.entries()) {
    if (ordered(a, b) === 1) {
      total += index + 1
    }
  }

  return total
}

export function p2(input) {
  const signals = input
    .split('\n')
    .filter(line => line !== '')
    .map((line) => JSON.parse(line))
    .concat([[[2]], [[6]]])
    .sort((a, b) => ordered(b, a))

  const twoIndex = signals.findIndex(p => JSON.stringify(p) === '[[2]]')
  const sixIndex = signals.findIndex(p => JSON.stringify(p) === '[[6]]')

  return (twoIndex + 1) * (sixIndex + 1)
}
