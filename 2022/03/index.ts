const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const getPriority = (c) => (alphabet + alphabet.toUpperCase()).indexOf(c) + 1

export function p1(input) {
  let total = 0

  for (const line of input.split('\n')) {
    const firstHalf = line.slice(0, line.length / 2)
    const secondHalf = line.slice(line.length / 2)
    for (const c of firstHalf.split('')) {
      if (secondHalf.includes(c)) {
        total += getPriority(c)
        break
      }
    }
  }

  return total
}

export function p2(input) {
  let total = 0
  const groupings = []
  let groups = []

  for (const line of input.split('\n')) {
    if (groups.length === 2) {
      groupings.push(groups.concat(line))
      groups = []
    } else {
      groups.push(line)
    }
  }

  for (const group of groupings) {
    const first = group[0]
    for (const c of first.split('')) {
      if (group[1].includes(c) && group[2].includes(c)) {
        total += getPriority(c)
        break
      }
    }
  }

  return total
}
