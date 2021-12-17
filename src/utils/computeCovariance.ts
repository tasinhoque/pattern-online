/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import cov from 'compute-covariance'

const computeCovariance = (
  x: number[][]
  // @ts-ignore
) => cov(x) as number[][]

export default computeCovariance
