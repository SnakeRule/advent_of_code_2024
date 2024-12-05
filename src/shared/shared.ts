import { readFile } from "fs"

export function readTextFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      readFile(path, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data.toString())
      })
    })
  }