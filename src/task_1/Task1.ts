import { readFile } from 'fs'

function readTextFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data.toString())
    })
  })
}

export async function Task1() {
  const content = await readTextFile('./src/task_1/input.txt')
  const cutContent = content.split(/\s+/)
  const content1: number[] = []
  const content2: number[] = []
  cutContent.forEach((val, index) =>
    index % 2 == 0 ? content1.push(parseInt(val)) : content2.push(parseInt(val))
  )
  console.log(content1.length)
  console.log(content2.length)
  console.log(content1[3])
  console.log(content2[3])
}
