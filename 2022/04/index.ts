export function p1(input) {
  let total = 0

  for (const line of input.trim().split('\n')) {
    const [a, b] = line.split(',')
    const [a1, a2] = a.split('-').map(n => parseInt(n))
    const [b1, b2] = b.split('-').map(n => parseInt(n))
    if ((a1 <= b1 && a2 >= b2) || (a1 >= b1 && a2 <= b2)) {
      total++
    }
  }

  return total
}

export function p2(input) {
  let total = 0

  for (const line of input.trim().split('\n')) {
    const [a, b] = line.split(',')
    const [a1, a2] = a.split('-').map(n => parseInt(n))
    const [b1, b2] = b.split('-').map(n => parseInt(n))
    if (a2 >= b1 && a1 <= b2) {
      total++
    }
  }

  return total
}
