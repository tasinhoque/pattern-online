import { computeCovariance, readFromFile } from 'utils'
import { det, inv, multiply } from 'mathjs'
import { Sample } from 'utils/readFromFile'

const data = readFromFile('Train.txt')

const priors: Record<number, number> = {}

data.classCodes.forEach(classCode => {
  priors[classCode] = 0
})

for (const sample of data.samples) {
  priors[sample.classCode] += 1
}

const globalMean: Record<
  number,
  { featureMatrix: number[][]; means: number[] }
> = {}

data.classCodes.forEach(classCode => {
  priors[classCode] /= data.sampleCount

  const means: number[] = []
  const featureMatrix: number[][] = []
  let classCount = 0

  for (let i = 0; i < data.featureCount; i++) {
    means.push(0)
    featureMatrix.push([])
  }

  data.samples.forEach(sample => {
    if (sample.classCode === classCode) {
      for (let i = 0; i < sample.features.length; i++) {
        means[i] += sample.features[i]
        featureMatrix[i].push(sample.features[i])
      }

      classCount += 1
    }
  })

  for (let i = 0; i < data.featureCount; i++) {
    means[i] /= classCount
  }

  globalMean[classCode] = { means, featureMatrix }
})

console.log('Priors:', priors)

console.log('Means:', globalMean)

const sample: Sample = {
  classCode: 1,
  features: [2.4661, 3.9251],
}

console.log('Sample:', sample)

const func = (i: number) => {
  const covarianceMatrix = computeCovariance(globalMean[i].featureMatrix)

  // console.log('The covariance matrix:', covarianceMatrix)

  // console.log('Determinant of the covariance matrix:', det(covarianceMatrix))
  // console.log('Inverse of the covariance matrix:', inv(covarianceMatrix))

  const prefixConstant =
    1 /
    (Math.pow(2 * Math.PI, data.featureCount / 2) *
      Math.pow(det(covarianceMatrix), 0.5))

  const arraySubtraction = (a: number[], b: number[]) => {
    const result: number[] = []

    for (let i = 0; i < a.length; i++) {
      result.push(a[i] - b[i])
    }

    return result
  }

  let matrixInExponentTerm: number[][] = arraySubtraction(
    sample.features,
    globalMean[i].means
  ).map(elem => [elem])

  matrixInExponentTerm = multiply(inv(covarianceMatrix), matrixInExponentTerm)
  matrixInExponentTerm = [multiply(sample.features, matrixInExponentTerm)]

  const exponent = Math.pow(Math.E, -0.5 * matrixInExponentTerm[0][0])
  const probability = prefixConstant * exponent

  return probability
}

let predictedClassCode = -1
let highestProb = 0

data.classCodes.forEach(code => {
  const p = func(code)
  const prob = p * priors[code]
  console.log(`Probability for class ${code}:`, prob)
  console.log(`Posterior probability:`, p)

  if (prob > highestProb) {
    predictedClassCode = code
    highestProb = prob
  }
})

console.log('The predicted class is', predictedClassCode)
