import { DimensionsType, DirectionType, PositionType } from 'Types'

export const checkBounds = (
  direction: DirectionType,
  prevPos: PositionType,
  bounds: DimensionsType,
  gridSize: number,
) => {
  const { width, height } = bounds
  const { x, y } = prevPos
  switch (direction) {
    case 'up':
      return y !== 0
    case 'down':
      return y !== height - gridSize
    case 'left':
      return x !== 0
    case 'right':
      return x !== width - gridSize
    default:
      return true
  }
}

export const checkVoidPoints = (
  direction: DirectionType,
  prevPos: PositionType,
  voidPos: PositionType[],
  gridSize: number,
) => {
  const { x, y } = prevPos
  switch (direction) {
    case 'up':
      return !voidPos.some((pos) => pos.y === y - gridSize && pos.x === x)
    case 'down':
      return !voidPos.some((pos) => pos.y === y + gridSize && pos.x === x)
    case 'left':
      return !voidPos.some((pos) => pos.y === y && pos.x === x - gridSize)
    case 'right':
      return !voidPos.some((pos) => pos.y === y && pos.x === x + gridSize)
    default:
      return true
  }
}
