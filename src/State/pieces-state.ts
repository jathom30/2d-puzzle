import { defaultPieces } from 'Config'
import { generateSpace, get5050 } from 'Helpers'
import { atom, atomFamily, selectorFamily } from 'recoil'
import { PositionType, SideType } from 'Types'
import { gridCountSelector, gridSizeAtom } from './board-state'
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
  default: { x: 0, y: 0 },
})

export const sparkSideAtom = atom<'hero' | 'opposite'>({
  key: 'sparkPositionSelector',
  default: get5050() ? 'hero' : 'opposite',
})
