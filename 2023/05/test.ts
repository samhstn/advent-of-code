import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

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
    ].filter(([a, b]) => b !== 0)
  } else if (mapStart > seedStart && mapStart + mapLen >= seedStart + seedLen) {
    return [
      [seedStart, mapStart - seedStart],
      [destination, seedLen - (mapStart - seedStart)]
    ]
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

// Deno.test('getUnmappedRanges #1', () => {
//   const seed = [5, 6]
//   const mappedRanges = [
//     [1, 2],
//     [6, 3],
//   ]
//   const actual = getUnmappedRanges(seed, mappedRanges)
//   const expected = [[5, 1], [9, 2]]
//   assertEquals(actual, expected)
// })
// 
// Deno.test('getUnmappedRanges #2', () => {
//   const seed = [5, 6]
//   const mappedRanges = [
//     [4, 2],
//     [8, 6]
//   ]
//   const actual = getUnmappedRanges(seed, mappedRanges)
//   const expected = [[6, 2]]
//   assertEquals(actual, expected)
// })
// 
// Deno.test('getUnmappedRanges #3', () => {
//   const seed = [5, 6]
//   const actual = getUnmappedRanges(seed, [])
//   const expected = [[5, 6]]
//   assertEquals(actual, expected)
// })
// 
// Deno.test('genSeedRanges #1', () => {
//   const seedRange = [79, 14] // 79, 80, ..., 91, 92
//   const seedMapsArr = [
//     { seedMap: [50, 98, 2], expected: [[79, 14]] }, // include none
//     { seedMap: [52, 50, 48], expected: [[81, 14]] }, // include all
//     { seedMap: [5, 78, 5], expected: [[6, 4], [83, 10]] }, // include start 
//     { seedMap: [5, 90, 5], expected: [[79, 11], [5, 3]] }, // include end 
//     { seedMap: [5, 82, 5], expected: [[79, 3], [5, 5], [87, 6]] }, // include middle 
//   ]
// 
//   for (const {seedMap, expected} of seedMapsArr) {
//     assertEquals(genSeedRanges(seedRange, seedMap), expected)
//   }
// })
// 
// Deno.test('genSeedRanges #2', () => {
//   const seedRange = [78, 3]
//   const seedMap = [56, 93, 4]
//   const mappedRanges = [[60, 37]]
//   const expected = [[78, 3]]
// 
//   assertEquals(genSeedRanges(seedRange, seedMap, mappedRanges), expected)
// })

Deno.test('genSeedRanges #3', () => {
  const seedRange = [81, 14]
  const seedMap = [18, 25, 70]
  const expected = [[74, 14]]

  assertEquals(genSeedRanges(seedRange, seedMap), expected)
})
