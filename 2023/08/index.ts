const parseInput = (input) => {
  const [instruction, mapsStr] = input.split('\n\n')
  const maps = mapsStr.split('\n').reduce((o, line) => {
    const [a, aVal] = line.replace(/\s+/g, '').split('=')
    const [b, c] = aVal.replace(/[\(\)]/g, '').split(',')
    return {
      ...o,
      [a]: [b, c]
    }
  }, {})

  return [instruction, maps]
}

export const p1 = (input) => {
  const [instruction, maps] = parseInput(input)

  let steps = 0
  let pos = 'AAA'

  while (pos !== 'ZZZ') {
    const side = instruction[steps % instruction.length]
    pos = maps[pos][side === 'R' ? 1 : 0]
    steps += 1
  }

  return steps
}

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b)

export const p2 = (input) => {
  const [instruction, maps] = parseInput(input)

  let poss = Object.keys(maps).filter(k => k[2] === 'A')

  let steps = 0
  const possInfo = poss.map(_ => ({ visited: [], zIndex: 0, foundCycle: false }))

  while (poss.some(p => p[2] !== 'Z') && possInfo.some(i => !i.foundCycle)) {
    for (const [i, pos] of poss.entries()) {
      if (possInfo[i].foundCycle) {
        continue
      }
      const s = `${steps % instruction.length}${pos}`
      if (possInfo[i].visited.includes(s)) {
        possInfo[i].foundCycle = true
      }
      possInfo[i].visited.push(s)
      if (pos[2] === 'Z') {
        possInfo[i].zIndex = steps
      }
    }
    const side = instruction[steps % instruction.length]
    poss = poss.map(pos => maps[pos][side === 'R' ? 1 : 0])
    steps += 1
  }

  return possInfo.slice(1).reduce((acc, { zIndex }) => lcm(acc, zIndex), possInfo[0].zIndex)
}
