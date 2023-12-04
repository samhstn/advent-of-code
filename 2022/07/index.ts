import * as path from "https://deno.land/std/path/mod.ts";

function getDirs(input) {
  let cwd = '/'
  const dirs = {}

  for (const line of input.split('\n')) {
    if (/\$ cd .*/.test(line)) {
      const dir = line.match(/\$ cd (.*)/)[1]
      cwd = path.resolve(cwd, dir)
    } else if (/^\d+/.test(line)) {
      const [_, sizeStr, file] = line.match(/^(\d+) (\S+)/)
      const size = parseInt(sizeStr)
      let tempCwd = cwd

      while (true) {
        if (!dirs[tempCwd]) {
          dirs[tempCwd] = 0
        }
        dirs[tempCwd] += size
        if (tempCwd === '/') {
          break
        }
        tempCwd = path.resolve(tempCwd, '..')
      }
    }
  }

  return dirs
}

export function p1(input) {
  const dirs = getDirs(input)

  return Object.values(dirs)
    .filter(size => size <= 100000)
    .reduce((a, b) => a + b, 0)
}

export function p2(input) {
  const dirs = getDirs(input)

  return Math.min(
    ...Object.values(dirs).filter(size => {
      return dirs['/'] - size <= 40000000
    })
  )
}
