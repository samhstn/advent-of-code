class PriorityQueue {
  constructor(coord, priority) {
    this.coords = coord ? [{ coord, priority }] : []
  }

  push(coord, priority) {
    this.coords.push({ coord, priority })
    this.bubbleUp()
  }

  pop() {
    const first = this.coords[0].coord
    const last = this.coords.pop()
    if (this.coords.length > 0) {
      this.coords[0] = last
      this.bubbleDown()
    }
    return first
  }

  isEmpty() {
    return this.coords.length === 0
  }

  bubbleUp() {
    let index = this.coords.length - 1
    const coord = this.coords[index]

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      const parent = this.coords[parentIndex]

      if (coord.priority >= parent.priority) {
        break
      }
      this.coords[index] = parent
      this.coords[parentIndex] = coord
      index = parentIndex
    }
  }

  bubbleDown() {
    let index = 0
    const length = this.coords.length
    const coord = this.coords[0]

    while (true) {
      let leftChildIndex = 2 * index + 1
      let rightChildIndex = 2 * index + 2
      let leftChild, rightChild
      let swap = null

      if (leftChildIndex < length) {
        leftChild = this.coords[leftChildIndex]
        if (leftChild.priority < coord.priority) {
          swap = leftChildIndex
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.coords[rightChildIndex]
        if ((swap === null && rightChild.priority < coord.priority) || 
            (swap !== null && rightChild.priority < leftChild.priority)) {
            swap = rightChildIndex
        }
      }

      if (swap === null) {
        break
      }
      this.coords[index] = this.coords[swap]
      this.coords[swap] = coord
      index = swap
    }
  }
}

const getMinHeatLoss = ({ turnCondition, maxBlocksBeforeTurn, minBlocksBeforeStop }) => (input) => {
  const grid = input.split('\n').map(line => line.split('').map(c => parseInt(c)))

  let seen = new Set()
  let pq = new PriorityQueue([0, 0, 0, 0, 0, 0], 0)

  while (!pq.isEmpty()) {
    const coord = pq.pop()
    const [hl, r, c, dr, dc, n] = coord

    if (r === grid.length - 1 && c === grid[0].length - 1 && n >= minBlocksBeforeStop) {
      return hl
    }

    const key = coord.slice(1).join(',')
    if (seen.has(key)) {
      continue
    }

    seen.add(key)

    if (n < maxBlocksBeforeTurn && (dr !== 0 || dc !== 0)) {
      let nr = r + dr
      let nc = c + dc
      if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
        pq.push([hl + grid[nr][nc], nr, nc, dr, dc, n + 1], hl + grid[nr][nc])
      }
    }

    if (turnCondition(n, dr, dc)) {
      for (let [ndr, ndc] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
        if ((ndr !== dr || ndc !== dc) && (ndr !== -dr || ndc !== -dc)) {
          let nr = r + ndr
          let nc = c + ndc
          if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
            pq.push([hl + grid[nr][nc], nr, nc, ndr, ndc, 1], hl + grid[nr][nc])
          }
        }
      }
    }
  }
}

export const p1 = getMinHeatLoss({
  turnCondition: () => true,
  maxBlocksBeforeTurn: 3,
  minBlocksBeforeStop: 0
})

export const p2 = getMinHeatLoss({
  turnCondition: (n, dr, dc) => n >= 4 || (dr === 0 && dc === 0),
    maxBlocksBeforeTurn: 10,
  minBlocksBeforeStop: 4
})
