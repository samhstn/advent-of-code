const year = Deno.args[0]
const day = Deno.args[1]

const pad = (s) => {
  const n = parseInt(s)
  return n > 9 ? s : `0${n}`
}

const folder = `./${year}/${pad(day)}`

const input = await Deno.readTextFile(`${folder}/input.txt`)

const { p1, p2 } = await import(`${folder}/index.ts`)

const startTime = performance.now()

const p1Answer = p1(input.trim())

const halfTime = performance.now()

const p2Answer = p2(input.trim())

const endTime = performance.now()

function readableTime(ms) {
  return ms < 1 ?  ms.toFixed(4) : ms.toFixed(2)
}

console.log(
  `Day ${day}
  Problem 1: ${p1Answer} in ${readableTime(halfTime - startTime)}ms
  Problem 2: ${p2Answer} in ${readableTime(endTime - halfTime)}ms`
)
