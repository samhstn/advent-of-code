# Advent of Code

https://adventofcode.com/

To generate the solution for a particular `<day>`, run:

```
deno run --allow-read --allow-hrtime --allow-net run.ts <year> <day>
```

When building a solution, add the watch flag:

```
deno run --allow-read --allow-hrtime --allow-net --watch run.ts <year> <day>
```

## Run all solutions

```bash
for i in {1..25};do
  deno run --allow-read --allow-hrtime --allow-net run.ts 2023 $i
  echo "  Lines of code in solution: $(wc -l < $(printf "2023/%02d/index.ts" $i) | xargs)"
done
```
