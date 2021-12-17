import { multiply, det, inv } from 'mathjs'
import { printMatrix, readFromFile, computeCovariance } from 'utils'
import express from 'express'

console.log('\nReading from file:')
printMatrix(readFromFile('matrix.txt'))

console.log('\nCovariance:')
printMatrix(computeCovariance([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]))

console.log(
  '\nDeterminant:',
  det([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
)

console.log('\nMultiplication:')
printMatrix(multiply([[1, 2]], [[1], [3]]))

console.log('\nInverse:')
printMatrix(
  inv([
    [1, 2],
    [3, 4],
  ])
)

const app = express()

app.listen(5000, () => console.log(`Server listening on port ${5000}`))
