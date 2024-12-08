import { readTextFile } from '../shared/shared'

type Point = {
  coord: number
  value: string
}

/*
Takes an array of strings. 
Loops through the strings and finds all the XMAS or SAMX occurences
*/
function findXmas(strings: string[]) {
  let matches = 0
  strings.forEach((string) => {
    matches += string.match(/XMAS/gm)?.length ?? 0
    matches += string.match(/SAMX/gm)?.length ?? 0
  })

  return matches
}

/*
This finds all the occurances of MAS or SAM from the diagonals.
It's pretty ugly as it goes through all the characters in pairs of three and checks if they match.
If they do, the original index of the "A" character is stored in an array and returned
This way the array of indexes can be compared between the two diagonals. If the original indexes match, we have an X-MAS
*/
function findMas(diag: Point[][]) {
  let indexes: number[] = []

  diag.forEach((row) => {
    row.forEach((val, index) => {
      if (row[index + 2]) {
        const target = val.value + row[index + 1].value + row[index + 2].value
        if (target === 'MAS' || target === 'SAM') {
          indexes.push(row[index + 1].coord)
        }
      }
    })
  })

  return indexes
}

/*
This creates the diagonal strings
forwards means it starts from the left
backwards means it starts from the right
This way we can get all the strings from both diagonal directions
*/
function loopDiagonals(
  forwards: boolean,
  allChars: string[],
  maxColumn: number
) {
  let column = forwards ? 0 : maxColumn
  let row = 0
  let diagonalText: string[] = []
  allChars.forEach((val) => {
    if ((column > maxColumn && forwards) || (column < 0 && !forwards)) {
      column = forwards ? 0 : maxColumn
      row++
    }
    const target = row + column
    diagonalText[target] = diagonalText[target] + val
    forwards ? column++ : column--
  })

  return diagonalText
}

/*
Same as function above, except it returns arrays of objects 
Objects contain the characters and their original coordinates in the matrix
*/
function loopDiagonalsWithCoords(
  forwards: boolean,
  allChars: string[],
  maxColumn: number
) {
  let row = 0
  let column = forwards ? 0 : maxColumn
  let diagonalText: Point[][] = []
  allChars.forEach((val, index) => {
    if ((column > maxColumn && forwards) || (column < 0 && !forwards)) {
      column = forwards ? 0 : maxColumn
      row++
    }
    let target = row + column
    if (diagonalText[target] === undefined) {
      diagonalText[target] = []
    }
    diagonalText[target].push({ coord: index, value: val })
    forwards ? column++ : column--
  })

  return diagonalText
}

function horizontalMatches(strings: string[]) {
  return findXmas(strings)
}

function verticalMatches(maxColumn: number, allChars: string[]) {
  let column = 0
  let verticalText: string[] = []
  allChars.forEach((val) => {
    verticalText[column] = verticalText[column] + val
    column++
    if (column > maxColumn) {
      column = 0
    }
  })
  return findXmas(verticalText)
}

function diagonalMatches(maxColumn: number, allChars: string[]) {
  let matches = 0
  const diagonalText1 = loopDiagonals(true, allChars, maxColumn)
  matches += findXmas(diagonalText1)

  const diagonalText2 = loopDiagonals(false, allChars, maxColumn)
  matches += findXmas(diagonalText2)

  return matches
}

function part2Diagonal(maxColumn: number, allChars: string[]) {
  let matches = 0
  const indexes: number[][] = []
  const diagonalText1 = loopDiagonalsWithCoords(true, allChars, maxColumn)
  indexes.push(findMas(diagonalText1))

  const diagonalText2 = loopDiagonalsWithCoords(false, allChars, maxColumn)
  indexes.push(findMas(diagonalText2))

  indexes[0].forEach((val) => {
    indexes[1].find((x) => x === val) && matches++
  })
  return matches
}

export async function Task4() {
  const input = await readTextFile('./src/task_4/input.txt')
  const rowSplit = input.split('\n')
  const maxColumn = rowSplit[0].length - 1
  const allChars = input.replace(/\n|\r/g, '').split('')

  const horizontal = horizontalMatches(rowSplit)
  const vertical = verticalMatches(maxColumn, allChars)
  const diagonal = diagonalMatches(maxColumn, allChars)
  console.log(horizontal + vertical + diagonal)
  const part2 = part2Diagonal(maxColumn, allChars)
  console.log(part2)
}
