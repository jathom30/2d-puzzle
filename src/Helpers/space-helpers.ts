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

export const inSameSpace = (pos1: PositionType, pos2: PositionType) =>
  pos1.x === pos2.x && pos1.y === pos2.y

export const withinRadius = (radius: number, distance: number) => {
  return distance < radius
}

export const getDistanceBetween = (pos1: PositionType, pos2: PositionType) =>
  Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2)
