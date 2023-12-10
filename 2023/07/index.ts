const groups = str => {
  const o = {}
  for (const c of str.split('')) {
    o[c] = (o[c] ?? 0) + 1
  }
  return Object.values(o).sort((a, b) => b - a).join(',')
}

const maxCard = str => {
  const o = {}
  for (const c of str.replace(/J/g, '').split('')) {
    o[c] = (o[c] ?? 0) + 1
  }
  return Object.entries(o).sort(([ak, av], [bk, bv]) => bv - av)[0]?.[0] ?? 'A'
}

const handOrder = [
  '5',
  '4,1',
  '3,2',
  '3,1,1',
  '2,2,1',
  '2,1,1,1',
  '1,1,1,1,1'
]

export const p1 = (input) => {
  const cardOrder = 'AKQJT98765432'
  return input
    .split('\n')
    .map(line => line.split(' '))
    .sort(([aHand], [bHand]) => {
      const ao = handOrder.indexOf(groups(aHand))
      const bo = handOrder.indexOf(groups(bHand))
      if (ao === bo) {
        for (let i = 0; i < 5; i++) {
          const aco = cardOrder.indexOf(aHand[i])
          const bco = cardOrder.indexOf(bHand[i])
          if (aco !== bco) {
            return bco - aco
          }
        }
      } else {
        return bo - ao
      }
    })
    .reduce((total, [hand, score], i) => total + parseInt(score) * (i + 1), 0)
}

export const p2 = (input) => {
  const cardOrder = 'AKQT98765432J'
  return input
    .split('\n')
    .map(line => line.split(' '))
    .sort(([aHand], [bHand]) => {
      const ao = handOrder.indexOf(groups(aHand.replace(/J/g, maxCard(aHand))))
      const bo = handOrder.indexOf(groups(bHand.replace(/J/g, maxCard(bHand))))

      if (ao === bo) {
        for (let i = 0; i < 5; i++) {
          const aco = cardOrder.indexOf(aHand[i])
          const bco = cardOrder.indexOf(bHand[i])
          if (aco !== bco) {
            return bco - aco
          }
        }
      } else {
        return bo - ao
      }
    })
    .reduce((total, [hand, score], i) => total + parseInt(score) * (i + 1), 0)
}
