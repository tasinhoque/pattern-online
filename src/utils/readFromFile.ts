import fs from 'fs'

export interface Sample {
  features: number[]
  classCode: number
}

const readFromFile = (fileName: string) => {
  const data: string = fs.readFileSync(`data/${fileName}`, 'utf-8')
  const lines = data.split('\r\n')
  const firstLine = lines[0].split(/\s+/)
  const featureCount = Number(firstLine[0])
  const classCount = Number(firstLine[1])
  const sampleCount = Number(firstLine[2])
  const samples: Sample[] = []
  const classCodes = new Set()

  for (let i = 1; i <= sampleCount; i++) {
    const values = lines[i].trim().split(/\s+/)
    const features = values.slice(0, featureCount).map(val => Number(val))
    const classCode = Number(values[featureCount])

    samples.push({ features, classCode })
    classCodes.add(classCode)
  }

  return {
    featureCount,
    classCount,
    classCodes: Array.from(classCodes) as number[],
    sampleCount,
    samples,
  }
}

export const readFromFile2 = (fileName: string) => {
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
