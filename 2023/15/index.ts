const hash = (str) => {
  let total = 0
  for (let i = 0; i < str.length; i++) {
    total += str.charCodeAt(i)
    total *= 17
    total = total % 256
  }
  return total
}

export const p1 = (input) => {
  return input.split(',').reduce((total, str) => total + hash(str), 0)
}

export const p2 = (input) => {
  const hashMap = []

  for (const str of input.split(',')) {
    if (str.includes('=')) {
      const [label, n] = str.split('=')
      const i = hash(label)

      if (hashMap[i]) {
        if (hashMap[i].find(([l]) => l === label)) {
          hashMap[i] = hashMap[i].map(([l, len]) => l === label ? [l, parseInt(n)] : [l, len])
        } else {
          hashMap[i].push([label, parseInt(n)])
        }
      } else {
        hashMap[i] = [[label, parseInt(n)]]
      }
    } else {
      const label = str.replace(/-/, '')
      const i = hash(label)
      if (hashMap[i]) {
        hashMap[i] = hashMap[i].filter(([l]) => l !== label)
      }
    }
  }

  let total = 0
  for (const [i, box] of hashMap.entries()) {
    if (box && box.length > 0) {
      for (const [slot, [_, len]] of box.entries()) {
        total += (i + 1) * (slot + 1) * len
      }
    }
  }
  return total
}
