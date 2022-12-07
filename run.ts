const day = Deno.args[0]

const pad = (n) => parseInt(n) > 9 ? `${parseInt(n)}` : `0${parseInt(n)}`

const input = await Deno.readTextFile(`${pad(day)}/input.txt`)

const { p1, p2 } = await import(`./${pad(day)}/index.ts`)

const startTime = performance.now()

const p1Answer = p1(input)

const halfTime = performance.now()

const p2Answer = p2(input)

const endTime = performance.now()

function readableTime(ms) {
  return ms < 1 ?  ms.toFixed(4) : ms.toFixed(2)
}

console.log(
  `Day ${day}
  Problem 1: ${p1Answer} in ${readableTime(halfTime - startTime)}ms
  Problem 2: ${p2Answer} in ${readableTime(endTime - halfTime)}ms`
)
