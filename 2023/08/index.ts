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

// 22199 too low

export const p2 = (input) => {
  const [instruction, maps] = parseInput(input)

  let poss = Object.keys(maps).filter(k => k[2] === 'A')
  console.log(poss)

  // possLengths = poss.map(pos => {
  //   let initialPos = pos
  //   let started = false
  //   let steps = 0
  //   while (!started || initialPos !== pos) {
  //     const side = instruction[steps % instruction.length]
  //     pos = maps[pos][side === 'R' ? 1 : 0]
  //     steps += 1
  //   }
  //   return steps
  // })

  // console.log(possLengths)

  // while (poss.some(p => p[2] !== 'Z')) {
  //   poss = poss.map(p => {
  //     const side = instruction[steps % instruction.length]
  //     return maps[p][side === 'R' ? 1 : 0]
  //   })
  //   steps += 1
  // }

  // return steps
}
