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

const count = (ranges, name, workflows) => {
  if (name === 'R') {
    return 0
  } else if (name === 'A') {
    let total = 1
    for (const [a, b] of ranges) {
      total *= b - a + 1
    }
    return total
  }

  let total = 0

  for (const rule of workflows[name]) {
    if (rule.includes(':')) {
      const [check, dest] = rule.split(':')
      const [c, comp, ...ns] = check.split('')
      const n = parseInt(ns.join(''))
      const [a, b] = ranges['xmas'.indexOf(c)]
      let t, f
      if (comp === "<") {
        t = [a, Math.min(n - 1, b)]
        f = [Math.max(n, a), b]
      } else {
        t = [Math.max(n + 1, a), b]
        f = [a, Math.min(n, b)]
      }

      if (t[0] <= t[1]) {
        const newRanges = ranges.map((r, i) => i === 'xmas'.indexOf(c) ? t : r)
        total += count(newRanges, dest, workflows)
      }

      if (f[0] <= f[1]) {
        ranges['xmas'.indexOf(c)] = f
      } else {
        break
      }
    } else {
      total += count(ranges, rule, workflows)
    }
  }
  return total
}

export const p2 = (input) => {
  const [workflows] = parseInput(input)
  return count([[1, 4000], [1, 4000], [1, 4000], [1, 4000]], 'in', workflows)
}
