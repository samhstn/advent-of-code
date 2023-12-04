export function p1(input) {
  let X = 1, t = 0, signal = 0

  function tick() {
    t += 1
    if ([20, 60, 100, 140, 180, 220].includes(t)) {
      signal += t * X
    }
  }

  for (const line of input.trim().split('\n')) {
    if (line === 'noop') {
      tick()
    } else {
      const [_addx, str] = line.split(' ')
      const n = parseInt(str)

      tick()
      tick()

      X += n
    }
  }

  return signal
}

export function p2(input) {
  let str = '\n', X = 1, t = 0

  function tick() {
    if ([X - 1, X, X + 1].includes(t % 40)) {
      str += '#'
    } else {
      str += '.'
    }
    t += 1
    if (t % 40 === 0) {
      str += '\n'
    }
  }

  for (const line of input.trim().split('\n')) {
    if (line === 'noop') {
      tick()
    } else {
      const [_addx, str] = line.split(' ')
      const n = parseInt(str)

      tick()
      tick()

      X += n
    }
  }

  return str
}
