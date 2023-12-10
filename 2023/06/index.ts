const numbs = (line) => line
  .replace(/\s+/g, ' ')
  .split(': ')[1]
  .split(' ')
  .map(s => parseInt(s))

const numb = (line) => parseInt(
  line
    .replace(/\s+/g, '')
    .split(':')[1]
)

const getCount = (time, dist) => {
  let count = 0
  for (let hold = 1; hold < time; hold++) {
    if ((time - hold) * hold > dist) {
      count += 1
    }
  }
  return count
}

export const p1 = (input) => {
  const [times, dists] = input.split('\n').map(numbs)

  let total = 1

  for (let i = 0; i < times.length; i++) {
    total *= getCount(times[i], dists[i])
  }

  return total
}

export const p2 = (input) => {
  const [time, dist] = input.split('\n').map(numb)

  return getCount(time, dist)
}
