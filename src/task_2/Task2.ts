import { readTextFile } from '../shared/shared'

function isDecreasingOrIncreasing(report: number[]) {
  let increasing = true
  let decreasing = true
  for (let i = 1; i < report.length; i++) {
    if (report[i] > report[i - 1]) {
      decreasing = false
    } else {
      increasing = false
    }

    if (!increasing && !decreasing) return false
  }
  return true
}

function isWithinThreshold(report: number[]) {
  for (let i = 1; i < report.length; i++) {
    const diff = Math.abs(report[i] - report[i - 1])
    if (diff < 1 || diff > 3) {
      return false
    }
  }
  return true
}

function isReportSafe(report: number[]) {
  const direction = isDecreasingOrIncreasing(report)
  if (direction === false) {
    return false
  }
  if (!isWithinThreshold(report)) {
    return false
  }

  return true
}

export async function Task2() {
  const content = (await readTextFile('./src/task_2/input.txt')).split(/[\n]+/)
  let result = 0

  content.forEach((val) => {
    const report = val.split(/\s/).map((val) => parseInt(val))
    if (isReportSafe(report)) {
      result++
    }
    // This else block is for the second part of the task. Comment to get 1st part result
    else {
      for (let i = 0; i < report.length; i++) {
        if (isReportSafe(report.filter((_val, index) => i !== index))) {
          result++
          break
        }
      }
    }
  })
  console.log(result)
}
