const reverse = s => s.split('').reverse().join('')

export function p1(input) {
  let total = 0
  for (const line of input.split('\n')) {
    const [s1] = line.match(/\d/)
    const [s2] = reverse(line).match(/\d/)
    total += parseInt(s1) * 10 + parseInt(s2)
  }
  return total
}

export function p2(input) {
  const numberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  }

  const reverseNumberMap = Object.entries(numberMap)
    .reduce((o, [k, v]) => ({ ...o, [reverse(k)]: v }), {})

  let total = 0
  for (const line of input.trim().split('\n')) {
    const re = new RegExp(['\\d', ...Object.keys(numberMap)].join('|'))
    const reverseRe = new RegExp(['\\d', ...Object.keys(reverseNumberMap)].join('|'))
    const [s1] = line.match(re)
    const [s2] = reverse(line).match(reverseRe)
    const d1 = parseInt(numberMap[s1] ?? s1)
    const d2 = parseInt(reverseNumberMap[s2] ?? s2)
    total += d1 * 10 + d2
  }
  return total
}
