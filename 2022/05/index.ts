function parse(input) {
  const [crates, instructions] = input.split('\n\n')

  const crateLines = crates.split('\n')
  crateLines.pop()

  const cratesArr = []

  for (const crateLine of crateLines) {
    for (let i = 0; i < crateLine.length; i++) {
      if (i % 4 === 1 && crateLine[i] !== ' ') {
        if (cratesArr[(i - 1) / 4]) {
          cratesArr[(i - 1) / 4].push(crateLine[i])
        } else {
          cratesArr[(i - 1) / 4] = [crateLine[i]]
        }
      }
    }
  }

  return [
    cratesArr.map(row => row || []),
    instructions
      .trim()
      .split('\n')
      .map(line => {
        return line
          .match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/)
          .map(n => parseInt(n))
          .slice(1)
      })
  ]
}

export function p1(input) {
  const [crates, instructions] = parse(input)
  for (let [move, from, to] of instructions) {
    while (move > 0) {
      const crate = crates[from - 1].shift()
      crates[to - 1].unshift(crate)
      move--
    }
  }
  return crates.map(row => row[0]).join('')
}

export function p2(input) {
  const [crates, instructions] = parse(input)
  for (let [move, from, to] of instructions) {
    const shiftingCrates = []
    while (move > 0) {
      const crate = crates[from - 1].shift()
      shiftingCrates.push(crate)
      move--
    }
    crates[to - 1].unshift(...shiftingCrates)
  }
  return crates.map(row => row[0]).join('')
}
