import { getDistanceBetween } from 'Helpers'
import { atom, selector, selectorFamily } from 'recoil'
import { PositionType, SideType } from 'Types'
import { gridSizeAtom } from './board-state'
import {
  hazardPositionAtom,
  pieceHasItemAtom,
  piecePositionAtom,
} from './pieces-state'
import {
  wallDimensionsSelector,
  wallHolePositionAtom,
  wallPositionSelector,
} from './wall-state'

export const moveCountAtom = atom({
  key: 'moveCount',
  default: 0,
})

export const voidWallSpaceSelector = selector({
  key: 'voidWallSpaceSelector',
  get: ({ get }) => {
    const wallPos = get(wallPositionSelector)
    const wallDims = get(wallDimensionsSelector)
    const gridSize = get(gridSizeAtom)
    const getWallCoords = () => {
      const yUnits = wallDims.height / gridSize
      const xUnits = wallDims.width / gridSize
      const yVoids = Array.from({ length: yUnits }, (v, i) => i).map(
        (u) => u * gridSize + wallPos.y,
      )
      const xVoids = Array.from({ length: xUnits }, (v, i) => i).map(
        (u) => u * gridSize + wallPos.x,
      )
      const voidCoords = yVoids
        .map((y) => {
          return xVoids.map((x) => {
            return { x, y }
          })
        })
        .flat()
      return voidCoords
    }
    const wallHolePos = get(wallHolePositionAtom)
    // filter wall hole pos from wall coords so char does not clip
    const wallPosFiltered = getWallCoords().filter((pos) => {
      const xMatch = pos.x === wallHolePos.x
      const yMatch = pos.y === wallHolePos.y
      return !(xMatch && yMatch)
    })
    return wallPosFiltered
  },
})

export const voidPositionsSelector = selectorFamily<PositionType[], SideType>({
  key: 'voidPositionsSelector',
  get:
    (side) =>
    ({ get }) => {
      const wallSpaces = get(voidWallSpaceSelector)
      const heroPos = get(
        piecePositionAtom({ kind: 'character', side: 'hero' }),
      )
      const oppositePos = get(
        piecePositionAtom({ kind: 'character', side: 'opposite' }),
      )

      const hasHeroItem = get(pieceHasItemAtom('hero'))
      const hasOppositeItem = get(pieceHasItemAtom('opposite'))
      const hasItem = hasHeroItem && hasOppositeItem
      const goalPos = get(piecePositionAtom({ kind: 'goal', side }))
      const otherSide = side === 'hero' ? 'opposite' : 'hero'
      const otherGoalPos = get(
        piecePositionAtom({ kind: 'goal', side: otherSide }),
      )
      return [
        ...wallSpaces,
        heroPos,
        oppositePos,
        otherGoalPos,
        ...(hasItem ? [] : [goalPos]),
      ]
    },
})

export const nearestCharacterSelector = selectorFamily<SideType, string>({
  key: 'nearestCharacterSelector',
  get:
    (id) =>
    ({ get }) => {
      const hazardPos = get(hazardPositionAtom(id))
      // const hazardPos = get(piecePositionAtom({ kind: 'hazard', side }))
      const heroPos = get(
        piecePositionAtom({ kind: 'character', side: 'hero' }),
      )
      const oppositePos = get(
        piecePositionAtom({ kind: 'character', side: 'opposite' }),
      )
      const heroDistance = getDistanceBetween(heroPos, hazardPos)
      const oppositeDistance = getDistanceBetween(oppositePos, hazardPos)
      if (heroDistance <= oppositeDistance) {
        return 'hero'
      }
      return 'opposite'
    },
})
