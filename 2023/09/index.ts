const diffs = (arr) => {
  const a = []
  for (let i = 0; i < arr.length - 1; i++) {
    a.push(arr[i + 1] - arr[i])
  }
  return a
}

export const p1 = (input) => {
  let total = 0
  for (const line of input.split('\n')) {
    let ns = line.split(' ').map(c => parseInt(c))
    const hist = [ns]
    while (ns.some(n => n !== 0)) {
      ns = diffs(ns)
      hist.push(ns)
    }
    total += hist.reduce((t, a) => t + a[a.length - 1], 0)
  }
  return total
}

export const p2 = (input) => {
  let total = 0
  for (const line of input.split('\n')) {
    let ns = line.split(' ').map(c => parseInt(c))
    const hist = [ns]
    while (ns.some(n => n !== 0)) {
      ns = diffs(ns)
      hist.push(ns)
    }
    total += hist.reverse().reduce((t, a) => a[0] - t, 0)
  }
  return total
}
