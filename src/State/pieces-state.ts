import { defaultPieces } from 'Config'
import { generateSpace } from 'Helpers'
import { atomFamily, selector, selectorFamily } from 'recoil'
import { PositionType, SideType } from 'Types'
import { v4 as uuid } from 'uuid'
import { gridCountSelector, gridSizeAtom } from './board-state'
import { hazardCountAtom } from './settings-state'
import { wallHorizontalAtom, wallPositionSelector } from './wall-state'

export const pieceHasItemAtom = atomFamily<boolean, SideType>({
  key: 'pieceHasItem',
  default: false,
})

export const pieceEntersHouseAtom = atomFamily<boolean, SideType>({
  key: 'pieceEntersHouse',
  default: false,
})

export const pieceEmojiAtom = atomFamily<string, string>({
  key: 'pieceEmoji',
  default: (emoji) => defaultPieces[emoji],
})

export const positionSelector = selectorFamily<() => PositionType, SideType>({
  key: 'positionSelector',
  get:
    (side) =>
    ({ get }) => {
      const heroSide = side === 'hero'
      const wallPosition = get(wallPositionSelector)
      const horizontalWall = get(wallHorizontalAtom)
      const gridSize = get(gridSizeAtom)
      const gridCount = get(gridCountSelector)
      const position = () =>
        generateSpace(
          heroSide,
          wallPosition,
          !!horizontalWall,
          gridSize,
          gridCount,
        )
      return position
    },
})

export const piecePositionAtom = atomFamily<
  PositionType,
  { kind: string; side: SideType }
>({
  key: 'piecePosition',
  default: { x: -1, y: -1 },
})

export const hazardPositionAtom = atomFamily<PositionType, string>({
  key: 'hazardPosition',
  default: { x: -2, y: -2 },
})

export const hazardRadiusSelector = selector({
  key: 'hazardRadius',
  get: ({ get }) => {
    const gridSize = get(gridSizeAtom)
    return gridSize * 5
  },
})

export const hazardIdsSelector = selector({
  key: 'hazardIdsSelector',
  get: ({ get }) => {
    const count = get(hazardCountAtom)
    const ids = Array.from({ length: count }, () => uuid())
    return ids
  },
})
