function calculate(scoreMap, input) {
  let total = 0

  for (const line of input.split('\n')) {
    total += scoreMap[line] ?? 0
  }

  return total
}

export function p1(input) {
  const scoreMap = {
    'A X': 4,
    'A Y': 8,
    'A Z': 3,
    'B X': 1,
    'B Y': 5,
    'B Z': 9,
    'C X': 7,
    'C Y': 2,
    'C Z': 6
  }

  return calculate(scoreMap, input)
}

export function p2(input) {
  const scoreMap = {
    'A X': 3,
    'A Y': 4,
    'A Z': 8,
    'B X': 1,
    'B Y': 5,
    'B Z': 9,
    'C X': 2,
    'C Y': 6,
    'C Z': 7
  }

  return calculate(scoreMap, input)
}
