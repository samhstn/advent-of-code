const getWinners = (line) => {
  const winning = line.match(/:(.*)\|/)[1].trim().replace(/\s+/g, ' ').split(' ')
  const numbers = line.match(/\|(.*)$/)[1].trim().replace(/\s+/g, ' ').split(' ')
  const winners = numbers.filter(n => winning.includes(n)).length

  return winners
}

export const p1 = (input) => {
  return input
    .split('\n')
    .map(getWinners)
    .reduce((total, winners) => {
      return total + (winners && 2 ** (winners - 1))
    }, 0)
}

export const p2 = (input) => {
  let total = 0
  const winners = input.split('\n').map(line => [getWinners(line), 1])

  while (winners.length > 0) {
    let [nextWinners, nextCount] = winners.shift()
    total += nextCount
    let i = 0
    while (i < nextWinners) {
      if (winners[i]) {
        winners[i][1] += nextCount
      }
      i += 1
    }
  }

  return total
}
