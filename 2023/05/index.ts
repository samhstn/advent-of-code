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
  const [seeds, mapsArr] = parseInput(input)

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

const getUnmappedRanges = ([seedStart, seedLen]: number[], mappedRanges: number[][]): number[][] => {
  const unmappedRanges = []
  let lastEnd = 0
  for (const [mappedStart, mappedLen] of mappedRanges) {
    const start = Math.max(seedStart, lastEnd)

    if (mappedStart > seedStart && start < mappedStart) {
      unmappedRanges.push([start, mappedStart - start])
    }
    lastEnd = mappedStart + mappedLen
  }
  if (lastEnd < seedStart) {
    unmappedRanges.push([seedStart, seedLen])
  } else if (lastEnd < seedStart + seedLen) {
    unmappedRanges.push([lastEnd, seedStart + seedLen - lastEnd])
  }
  return unmappedRanges
}

const mapSeed = (
  [seedStart, seedLen]: number[],
  [destination, mapStart, mapLen]: number[]
) => {
  if (seedStart + seedLen < mapStart || seedStart > mapStart + mapLen) {
    return [[seedStart, seedLen]]
  } else if (seedStart >= mapStart && seedStart + seedLen < mapStart + mapLen) {
    return [[seedStart + destination - mapStart, seedLen]]
  } else if (seedStart >= mapStart && seedStart + seedLen >= mapStart + mapLen) {
    return [
      [seedStart + destination - mapStart, mapStart - seedStart + mapLen],
      [mapStart + mapLen, seedStart + seedLen - (mapStart + mapLen)]
    ]
  } else if (mapStart > seedStart && mapStart + mapLen >= seedStart + seedLen) {
    return [
      [seedStart, mapStart - seedStart],
      [destination, seedLen - (mapStart - seedStart)]
    ].filter(([a, b]) => b !== 0)
  } else if (mapStart > seedStart && mapStart + mapLen < seedStart + seedLen) {
    return [
      [seedStart, mapStart - seedStart],
      [destination, mapLen],
      [mapStart + mapLen, seedStart + seedLen - (mapStart + mapLen)]
    ]
  } else {
    console.log('unknown')
    return []
  }
}

const genSeedRanges = ([seedStart, seedLen]: number[], map: number[], mappedRanges: number[][] = []) => {
  const unmappedRanges = getUnmappedRanges([seedStart, seedLen], mappedRanges)
  const ranges = []

  for (const unmappedRange of unmappedRanges) {
    ranges.push(...mapSeed(unmappedRange, map))
  }

  return ranges.length > 0 ? ranges : [[seedStart, seedLen]]
}

export const p2 = (input) => {
  const [seeds, mapsArr] = parseInput(input)
  let seedRanges = pairs(seeds)

  for (const maps of mapsArr) {
    // console.log('maps', maps)
    const newSeedRanges = []
    for (const seedRange of seedRanges) {
      let newSeedRange
      const mappedRanges = []
      console.log('sssssss', seedRange)
      for (const map of maps) {
        const [destination, _mapStart, mapLen] = map
        newSeedRange = genSeedRanges(seedRange, map, mappedRanges)
        console.log({ newSeedRange, seedRange, map, mappedRanges })
        mappedRanges.push([destination, mapLen])
      }
      newSeedRanges.push(...newSeedRange)
    }
    console.log(seedRanges)
    seedRanges = JSON.parse(JSON.stringify(newSeedRanges))
  }
  console.log(seedRanges)

  return Math.min(...seedRanges.map(s => s[0]))
}
