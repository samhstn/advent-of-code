const format = (line) => {
  const [charStr, numbStr] = line.split(' ')
  return [charStr, numbStr.split(',').map(c => parseInt(c))]
}

const unfoldFormat = (line) => {
  const [charStr, numbStr] = line.split(' ')
  return [
    new Array(5).fill(charStr).join('?'),
    new Array(5).fill(numbStr).join(',').split(',').map(c => parseInt(c))
  ]
}

const cache = new Map();
const dp = (chars, numbs, n = null) => {
  const s = `${chars}-${numbs.join(',')}-${n}`

  if (cache.has(s)) {
    return cache.get(s)
  }

  const [head, tail] = [chars[0], chars.substring(1)]

  let res
  if (numbs.length === 0 && n === null) {
    res = !chars.includes('#')
  } else if (!head) {
    res = n ? 0 : numbs.length === 0
  } else if (head === '?' && n === null) {
    res = dp(tail, numbs) + dp(chars, numbs.slice(1), numbs[0])
  } else if (head === '?' && n === 0) {
    res = dp(tail, numbs)
  } else if (head === '?') {
    res = dp(tail, numbs, n - 1)
  } else if (head === '#' && n === null) {
    res = dp(chars, numbs.slice(1), numbs[0])
  } else if (head === '#' && n === 0) {
    res = 0
  } else if (head === '#') {
    res = dp(tail, numbs, n - 1)
  } else if (head === '.' && !n) {
    res = dp(tail, numbs)
  } else if (head === '.') {
    res = 0
  } else {
    throw `unknown s ${s}`
  }

  cache.set(s, res)
  return res
}

export const p1 = (input) => {
  let total = 0
  for (const [charStr, numbs] of input.split('\n').map(format)) {
    total += dp(charStr, numbs)
  }
  return total
}

export const p2 = (input) => {
  let total = 0
  for (const [charStr, numbs] of input.split('\n').map(unfoldFormat)) {
    total += dp(charStr, numbs)
  }
  return total
}
