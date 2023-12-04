const operations = {
  'old \\* old': (n) => n ** 2,
  'old \\* (\\d+)': (n) => (d) => n * d,
  'old \\+ (\\d+)': (n) => (d) => n + d
}

function run(input, decreaseWorryFunc, totalRounds) {
  let monkeys = [], rounds = 0

  for (const line of input.split('\n\n')) {
    const lines = line.split('\n')

    const startingItems = lines[1]
      .trim()
      .split('Starting items: ')[1]
      .split(', ')
      .map(s => parseInt(s))

    let operation
    for (const [key, val] of Object.entries(operations)) {
      const operationStr = lines[2]
        .trim()
        .split('Operation: new = ')[1]
      if (new RegExp(key).test(operationStr)) {
        const match = operationStr.match(key)
        operation
          = match.length > 1
          ? val(parseInt(match[1]))
          : val
        break
      }
    }

    const test = [
      lines[3].trim().split('Test: divisible by ')[1],
      lines[4].trim().split('If true: throw to monkey ')[1],
      lines[5].trim().split('If false: throw to monkey ')[1]
    ].map(s => parseInt(s))

    monkeys.push({ startingItems, operation, test, inspections: 0 })
  }

  while (rounds < totalRounds) {
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i]
      while (monkey.startingItems.length > 0) {
        const item = monkey.startingItems.shift()
        const worry = decreaseWorryFunc(monkeys)(monkey.operation(item))
        monkey.inspections++
        if (worry % monkey.test[0] === 0) {
          monkeys[monkey.test[1]].startingItems.push(worry)
        } else {
          monkeys[monkey.test[2]].startingItems.push(worry)
        } 
      }
    }
    rounds++
  }

  return monkeys
    .map(monkey => monkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1)
}

export function p1(input) {
  const decreaseWorryFunc = () => (level) => Math.floor(level / 3)
  return run(input, decreaseWorryFunc, 20)
}

export function p2(input) {
  const decreaseWorryFunc = (monkeys) => (level) => {
    const mod = monkeys.reduce((acc, m) => acc * m.test[0], 1)
    return level % mod
  }
  return run(input, decreaseWorryFunc, 10000)
}
