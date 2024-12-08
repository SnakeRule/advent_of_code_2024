import { readTextFile } from '../shared/shared'

function multiply(a: number, b: number) {
  return a * b
}

function part1(content: string) {
  let result = 0
  const functions = content.match(/mul\(\d+,\d+\)/g)
  functions?.forEach((val) => {
    const numbers = val.match(/\d+/g)?.map((val) => parseInt(val))
    if (numbers && numbers.length >= 2) {
      result += multiply(numbers[0], numbers[1])
    }
  })
  return result
}

function part2(content: string) {
  let result = 0
  let shouldDo = true
  const functions = content.match(/do\(\)|don't\(\)|mul\(\d+,\d+\)/g)
  functions?.forEach((val) => {
    if (val === 'do()') shouldDo = true
    if (val === "don't()") shouldDo = false
    const numbers = val.match(/\d+/g)?.map((val) => parseInt(val))
    if (shouldDo && numbers && numbers.length >= 2) {
      result += multiply(numbers[0], numbers[1])
    }
  })
  return result
}

export async function Task3() {
  const content = await readTextFile('./src/task_3/input.txt')
  console.log(part1(content))
  console.log(part2(content))
}
