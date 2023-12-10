const pairs = (arr) => {
  return arr.reduce(([a, next], e) => {
    return next ? [a.concat([[next, e]]), null] : [a, e]
  }, [[], null])[0]
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
  const [seeds, mapsArr] = parseInput(input)

  for (const maps of mapsArr) {
    for (const [index, seed] of seeds.entries()) {
      for (const [dest, source, len] of maps) {
        if (seed >= source && seed < source + len) {
          seeds[index] += dest - source
          break
        }
      }
    }
  }

  return Math.min(...seeds)
}

export const p2 = (input) => {
  let [seeds, mapsArr] = parseInput(input)

  let seedPairs = pairs(seeds)
  for (const maps of mapsArr) {
    let newSeeds = []
    while (seedPairs.length > 0) {
      const [seedStart, seedLen] = seedPairs.shift()
      let mapped = false
      for (const [dest, mapStart, mapLen] of maps) {
        if (seedStart + seedLen <= mapStart || seedStart >= mapStart + mapLen) {
          continue
        } else if (seedStart >= mapStart && seedStart + seedLen <= mapStart + mapLen) {
          mapped = true
          newSeeds.push([seedStart + dest - mapStart, seedLen])
        } else if (seedStart >= mapStart && seedStart + seedLen > mapStart + mapLen) {
          mapped = true
          seedPairs.push([mapStart + mapLen, seedStart + seedLen - (mapStart + mapLen)])
          newSeeds.push([seedStart + dest - mapStart, mapStart - seedStart + mapLen])
        } else if (mapStart > seedStart && mapStart + mapLen >= seedStart + seedLen) {
          mapped = true
          seedPairs.push([seedStart, mapStart - seedStart])
          newSeeds.push([dest, seedLen - (mapStart - seedStart)])
        } else if (mapStart > seedStart && mapStart + mapLen < seedStart + seedLen) {
          mapped = true
          seedPairs.push(
            [seedStart, mapStart - seedStart],
            [mapStart + mapLen, seedStart + seedLen - (mapStart + mapLen)]
          )
          newSeeds.push([dest, mapLen])
        } else {
          console.log('unknown')
          return []
        }
      }

      if (!mapped) {
        newSeeds.push([seedStart, seedLen])
      }
    }
    seedPairs = newSeeds
  }

  return Math.min(...seedPairs.map(s => s[0]))
}
