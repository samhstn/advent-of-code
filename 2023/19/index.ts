const parseInput = (input) => {
  const [workflows, ratings] = input.split('\n\n')

  return [
    workflows.split('\n').reduce((o, line) => {
      const [k, v] = line.split('{')
      return { ...o, [k]: v.replace('}', '').split(',') }
    }, {}),
    ratings
      .split('\n')
      .map(line => {
        return line
          .replace(/[{}]/g, '')
          .split(',')
          .map(r => parseInt(r.split('=')[1]))
      })
  ]
}

const runCheck = (check, rating) => {
  const [c, comp, ...ns] = check.split('')
  const n = parseInt(ns.join(''))
  const compMap = {
    '>': (a, b) => a > b,
    '<': (a, b) => a < b
  }
  return compMap[comp](rating['xmas'.indexOf(c)], n)
}

const accepted = (rating, workflows) => {
  let name = 'in'
  while (!['A', 'R'].includes(name)) {
    for (const rule of workflows[name]) {
      if (rule.includes(':')) {
        const [check, dest] = rule.split(':')
        if (runCheck(check, rating)) {
          name = dest
          break
        }
      } else {
        name = rule
      }
    }
  }
  return name === 'A'
}

export const p1 = (input) => {
  const [workflows, ratings] = parseInput(input)
  let total = 0

  for (const rating of ratings) {
    if (accepted(rating, workflows)) {
      total += rating.reduce((a, b) => a + b, 0)
    }
  }
  return total
}

const clone = o => JSON.parse(JSON.stringify(o))

const merge = (a, b) => {
  for (const [k, v] of Object.entries(b)) {
    const av = a[k]
    if (av) {
      const newV = []
      for (let i = 0; i < 4; i++) {
        newV.push([Math.min(av[i][0], v[i][0]), Math.max(av[i][1], v[i][1])])
      }
      a[k] = newV
    } else {
      a[k] = v
    }
  }
}

// ex ans 167409079868000
export const p2 = (input) => {
  const [workflows] = parseInput(input)
  const acceptedRanges = []
  let paths = {
    in: [[1, 4000], [1, 4000], [1, 4000], [1, 4000]]
  }

  while (Object.keys(paths).length > 0) {
    let newPaths = {}
    for (const [name, ranges] of Object.entries(paths)) {
      if (name === 'A') {
        acceptedRanges.push(ranges)
      } else if (name === 'R') {
        continue
      } else {
        let rangesAgg = clone(ranges)
        for (const rule of workflows[name]) {
          // console.log('rule', rule)
          // console.log('paths', paths)
          // console.log('newPaths', newPaths)
          // console.log('rangesAgg', rangesAgg)
          // console.log('')
          if (rule.includes(':')) {
            const [c, comp, ...rest] = rule.split('')
            const [nStr, dest] = rest.join('').split(':')
            const n = parseInt(nStr)
            const index = 'xmas'.indexOf(c)
            if (comp === '>') {
              merge(newPaths, {[dest]: clone(rangesAgg).map(([start, end], i) => i === index ? [n + 1, end] : [start, end])})
              rangesAgg[index] = [rangesAgg[index][0], n]
            } else {
              merge(newPaths, {[dest]: clone(rangesAgg).map(([start, end], i) => i === index ? [start, n - 1] : [start, end])})
              rangesAgg[index] = [n, rangesAgg[index][1]]
            }
          } else {
            merge(newPaths, {[rule]: rangesAgg})
          }
        }
      }
    }
    console.log('ppppppp', newPaths)
    paths = newPaths
  }

  console.log('aaaaaa', acceptedRanges)
}
