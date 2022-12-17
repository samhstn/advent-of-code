function move(coord, direction) {
  const directionMap = {
    R: [1, 0],
    U: [0, 1],
    L: [-1, 0],
    D: [0, -1]
  }
  return [
    coord[0] + directionMap[direction][0],
    coord[1] + directionMap[direction][1]
  ]
}

function follow(rope) {
  for (let i = 0; i < rope.length - 1; i++) {
    if (rope[i][0] - rope[i + 1][0] > 1 && rope[i][1] - rope[i + 1][1] > 1) {
      rope[i + 1] = [rope[i][0] - 1, rope[i][1] - 1]
    } else if (rope[i][0] - rope[i + 1][0] < -1 && rope[i][1] - rope[i + 1][1] < -1) {
      rope[i + 1] = [rope[i][0] + 1, rope[i][1] + 1]
    } else if (rope[i][0] - rope[i + 1][0] > 1 && rope[i][1] - rope[i + 1][1] < -1) {
      rope[i + 1] = [rope[i][0] - 1, rope[i][1] + 1]
    } else if (rope[i][0] - rope[i + 1][0] < -1 && rope[i][1] - rope[i + 1][1] > 1) {
      rope[i + 1] = [rope[i][0] + 1, rope[i][1] - 1]
    } else if (rope[i][0] - rope[i + 1][0] > 1) {
      rope[i + 1] = [rope[i][0] - 1, rope[i][1]]
    } else if (rope[i][0] - rope[i + 1][0] < -1) {
      rope[i + 1] = [rope[i][0] + 1, rope[i][1]]
    } else if (rope[i][1] - rope[i + 1][1] > 1) {
      rope[i + 1] = [rope[i][0], rope[i][1] - 1]
    } else if (rope[i][1] - rope[i + 1][1] < -1) {
      rope[i + 1] = [rope[i][0], rope[i][1] + 1]
    }
  }
}

function run(rope, input) {
  const visited = new Set(['0,0'])

  for (const line of input.split('\n')) {
    const [direction, countString] = line.split(' ')
    let count = parseInt(countString)
    while (count > 0) {
      rope[0] = move(rope[0], direction)
      follow(rope)
      visited.add(rope[rope.length - 1].join(','))
      count--
    }
  }
  return visited.size
}

export function p1(input) {
  const rope = [[0, 0], [0, 0]]
  return run(rope, input)
}

export function p2(input) {
  const rope = [
    [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
    [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]
  ]
  return run(rope, input)
}
