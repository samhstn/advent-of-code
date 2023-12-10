import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

const mapSeeds = (seeds: number[][], maps: number[][][]) => {
  let newSeeds: number[][] = []
  maps.forEach(m => {
    let ranges = m.map(([a, b, c]) => [Array.from({length: c}, (_, i) => a + i), Array.from({length: c}, (_, i) => b + i)]);
    let tempSeeds = []

    for (const r of seeds) {
      let added = false
      // let newSeeds = [] // [[seedStart, seedLen]]
      for (const [tr, fr] of ranges) {
        const offset = tr[0] - fr[0];
        if (r[1] <= fr[0] || fr[fr.length - 1] < r[0]) {
          continue
        }
        const irStart = Math.max(r[0], fr[0])
        const irEnd = Math.min(r[1], fr[fr.length - 1] + 1)
        const ir = [irStart, irEnd]
        const lr = r[0] < irStart ? [r[0], irStart] : null
        const rr = irEnd < r[1] ? [irEnd, r[1]] : null
        if (lr) {
          tempSeeds.push(lr)
        }
        if (rr) {
          tempSeeds.push(rr)
        }
        newSeeds.push([irStart + offset, irEnd + offset])
        added = true
        break
      }
      if (!added) {
        newSeeds.push(r);
      }
    }
    seeds = tempSeeds.concat(newSeeds);
    newSeeds = []
  })

  return seeds
}

Deno.test('mapSeeds #1', () => {
  const seeds = [[5, 6]] // 5, 6, 7, 8, 9, 10
  const maps = [[
    [0, 1, 2], // 1, 2
    [106, 6, 3], // 6, 7, 8
  ]]
  const actual = mapSeeds(seeds, maps)
  const expected = [[5, 106, 107, 108, 9, 10]]
  assertEquals(actual, expected)
})

// const seeds = [[79, 14], [55, 13]]
// const maps = [
//   [[ 50, 98, 2], [ 52, 50, 48]],
//   [[ 0, 15, 37], [ 37, 52, 2], [ 39, 0, 15]],
//   [[ 49, 53, 8], [ 0, 11, 42], [ 42, 0, 7], [ 57, 7, 4]],
//   [[ 88, 18, 7], [ 18, 25, 70]],
//   [[ 45, 77, 23], [ 81, 45, 19], [ 68, 64, 13]],
//   [[ 0, 69, 1], [ 1, 0, 69]],
//   [[ 60, 56, 37], [ 56, 93, 4]]
// ]

