import { DimensionsType, PositionType } from 'Types'
import { randomOnGrid } from './grid-helpers'

export const generateSpace = (
  heroSide: boolean,
  wallPosition: PositionType,
  horizontalWall: boolean,
  gridSize: number,
  gridCount: DimensionsType,
) => {
  if (heroSide) {
    return horizontalWall
      ? {
          x: randomOnGrid(gridSize, gridCount.width),
          y: randomOnGrid(gridSize, wallPosition.y / gridSize),
        }
      : {
          x: randomOnGrid(gridSize, wallPosition.x / gridSize),
          y: randomOnGrid(gridSize, gridCount.height),
        }
  }
  const x = randomOnGrid(gridSize, gridCount.width, wallPosition.x / gridSize)
  const y = randomOnGrid(gridSize, gridCount.height, wallPosition.y / gridSize)
  return horizontalWall
    ? {
        x: randomOnGrid(gridSize, gridCount.width),
        y: y === wallPosition.y ? y + gridSize : y,
      }
    : {
        x: x === wallPosition.x ? x + gridSize : x,
        y: randomOnGrid(gridSize, gridCount.height),
      }
}

export const checkSpace = (
  dontBeHeres: PositionType[],
  createItem: () => PositionType,
): PositionType => {
  const item = createItem()
  const sameSpace = dontBeHeres.some(
    (location) => location.x === item.x && location.y === item.y,
  )
  return sameSpace ? checkSpace(dontBeHeres, createItem) : item
}
