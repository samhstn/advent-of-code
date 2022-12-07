function sorted(input) {
  return input
    .split('\n\n')
    .map(group => {
      return group
        .split('\n')
        .map(s => parseInt(s))
        .reduce((a, b) => a + b, 0)
    })
    .filter(total => !isNaN(total))
    .sort((a, b) => b - a)
}

export function p1(input) {
  return sorted(input)[0]
}

export function p2(input) {
  return sorted(input)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0)
}
