import { DimensionsType } from 'Types'
import { randomOnGrid } from './grid-helpers'

export const wallCheck = (
  position: number,
  upperBound: number,
  gridSize: number,
) => {
  switch (position) {
    case 0:
      return gridSize * 2
    case gridSize:
      return gridSize * 2
    case upperBound:
      return upperBound - gridSize * 3
    case upperBound - gridSize:
      return upperBound - gridSize * 3
    case upperBound - gridSize * 2:
      return upperBound - gridSize * 3
    default:
      return position
  }
}

export const createWallPos = (
  bounds: DimensionsType,
  horizontal: number,
  gridSize: number,
) => {
  const getMinMax = (limit: number) =>
    (bounds[horizontal ? 'height' : 'width'] * limit) / gridSize
  const min = Math.ceil(getMinMax(0.25))
  const max = Math.ceil(getMinMax(0.5))
  const x = horizontal
    ? 0
    : wallCheck(randomOnGrid(gridSize, max, min), bounds.width, gridSize)
  const y = !horizontal
    ? 0
    : wallCheck(randomOnGrid(gridSize, max, min), bounds.height, gridSize)

  return { x, y }
}
