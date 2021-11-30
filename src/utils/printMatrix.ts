import { Matrix } from 'types'

const printMatrix = (matrix: Matrix): void => {
  for (const row of matrix) {
    for (const cell of row) {
      process.stdout.write(`${cell} `)
    }

    console.log()
  }
}

export default printMatrix
