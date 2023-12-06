const pairs = (arr) => {
  const newArr = []
  let next = null
  for (const a of arr) {
    if (next) {
      newArr.push([next, a])
      next = null
    } else {
      next = a
    }
  }
  return newArr
}

const parseInput = (input) => {
  const [[seedStr], ...mapStr] = input
    .split('\n\n')
    .map(l => l.replace(/.*:\s/, '')
               .split('\n')
               .map(m => m.split(' ')))
  const seeds = seedStr.map(s => parseInt(s))
  const mapsArr = mapStr.map(l => l.map(m => m.map(n => parseInt(n))))
  return [seeds, mapsArr]
}

export const p1 = (input) => {
  let [seeds, mapsArr] = parseInput(input)

  for (const maps of mapsArr) {
    for (const [index, seed] of seeds.entries()) {
      for (const [destination, source, len] of maps) {
        if (seed >= source && seed < source + len) {
          seeds[index] += destination - source
          break
        }
      }
    }
  }

  return Math.min(...seeds)
}

export const p2 = (input) => {
  let [seeds, mapsArr] = parseInput(input)
  let seedRanges = pairs(seeds)

  console.log('ssssssss', seedRanges)
  console.log('ssssssss', mapsArr)

  for (const maps of mapsArr) {
    for (const [start, end] of seedRanges) {
      for (const [destination, source, len] of maps) {
        if (seed >= source && seed < source + len) {
          seeds[index] += destination - source
          break
        }
      }
    }
  }

  return Math.min(...seeds)
}
