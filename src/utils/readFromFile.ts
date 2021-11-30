import fs from 'fs'

const readFromFile = (fileName: string) => {
  const data: string = fs.readFileSync(`data/${fileName}`, 'utf-8')
  const lines = data.split('\n')
  const dimension = lines[0].split(' ')
  const n = Number(dimension[0])

  const matrix: number[][] = []

  for (let i = 0; i < n; i++) {
    const cells = lines[i + 1].split(' ')
    const row: number[] = []

    for (const cell of cells) {
      row.push(Number(cell))
    }

    matrix.push(row)
  }

  return matrix
}

export default readFromFile
