import { readTextFile } from '../shared/shared'

function checkIfCorrect(
  beforeDict: { [key: number]: number[] },
  toCheck: number[]
) {
  const checked: number[] = []
  for (let i = 0; i < toCheck.length; i++) {
    if (beforeDict[toCheck[i]] === undefined) {
      if (checked.length !== toCheck.length - 1) return false
    } else if (
      beforeDict[toCheck[i]].find((val) => checked.find((x) => x === val))
    ) {
      return false
    }
    checked.push(toCheck[i])
  }
  return toCheck[(toCheck.length - 1) / 2]
}

// use bubble sort to sort the numbers correctly
function orderNumbers(
  beforeDict: { [key: number]: number[] },
  toFix: number[]
) {
  const arr: number[] = toFix
  for (var i = 0; i < arr.length; i++) {
    for (let u = 0; u < arr.length - 1 - i; u++) {
      // If the next number isn't included in the beforeDict, it shouldn't be ahead of the current number
      if (beforeDict[arr[u + 1]] === undefined) {
        continue
      }
      // if the next element includes the current one, it should come before it, so swap them
      // Also applies if the beforeDict doesn't include the current number. That means it shouldn't be ahead of anything
      if (
        beforeDict[arr[u]] === undefined ||
        beforeDict[arr[u + 1]].includes(arr[u])
      ) {
        let temp = arr[u]
        arr[u] = arr[u + 1]
        arr[u + 1] = temp
      }
    }
  }
  return arr[(arr.length - 1) / 2]
}

export async function Task5() {
  const input = await readTextFile('./src/task_5/input.txt')

  const before =
    input.match(/\d{2}\|/g)?.map((val) => parseInt(val[0] + val[1])) ?? []
  const after =
    input.match(/\|\d{2}/g)?.map((val) => parseInt(val[1] + val[2])) ?? []

  // This is a dictionary where the key should always come before the values in the number lists
  const beforeDict: { [key: number]: number[] } = {}

  before.forEach((val, index) => {
    beforeDict[val] === undefined
      ? (beforeDict[val] = [after[index]])
      : beforeDict[val].push(after[index])
  })

  const toCheck =
    input
      .match(/\d{2},.*/g)
      ?.map((x) => x.split(',').map((val) => parseInt(val))) ?? []

  let result = 0
  const failed: number[][] = []
  toCheck.forEach((val) => {
    const correct = checkIfCorrect(beforeDict, val)
    if (correct !== false) {
      result += correct
    } else {
      failed.push(val)
    }
  })
  console.log(result)
  let part2Result = 0
  failed.forEach((x) => {
    part2Result += orderNumbers(beforeDict, x)
  })
  console.log(part2Result)
}
