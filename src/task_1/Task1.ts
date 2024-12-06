import { readTextFile } from '../shared/shared'

function calculateDistances(arr1: number[], arr2: number[]) {
  arr1 = arr1.sort()
  arr2 = arr2.sort()

  let result = 0
  for (let i = 0; i < arr1.length; i++) {
    result += Math.max(arr1[i], arr2[i]) - Math.min(arr1[i], arr2[i])
  }
  return result
}

function calculateSimilarityScore(arr1: number[], arr2: number[]) {
  let result = 0
  arr1.forEach((arr1Val) => {
    result += arr1Val * arr2.filter((arr2Val) => arr1Val === arr2Val).length
  })

  return result
}

export async function Task1() {
  const content = (await readTextFile('./src/task_1/input.txt')).split(/\s+/)
  let content1: number[] = []
  let content2: number[] = []
  content.forEach((val, index) =>
    index % 2 == 0 ? content1.push(parseInt(val)) : content2.push(parseInt(val))
  )

  console.log(calculateDistances(content1, content2))
  console.log(calculateSimilarityScore(content1, content2))
}
