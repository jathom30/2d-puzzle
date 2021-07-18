import { atom, selector } from 'recoil'
import { boundsSelector, gridSizeAtom } from './board-state'

export const wallHorizontalAtom = atom({
  key: 'wallOrientation',
  default: Math.floor(Math.random() * 2),
})

export const wallDimensionsSelector = selector({
  key: 'wallDimensionsSelector',
  get: ({ get }) => {
    const gridSize = get(gridSizeAtom)
    const bounds = get(boundsSelector)
    const horizontal = get(wallHorizontalAtom)
    if (horizontal) {
      return {
        width: bounds.width,
        height: gridSize,
      }
    }
    return {
      width: gridSize,
      height: bounds.height,
    }
  },
})

export const wallPositionAtom = atom({
  key: 'wallPosition',
  default: { x: 0, y: 0 },
})

export const wallHolePositionAtom = atom({
  key: 'wallHolePosition',
  default: { x: 0, y: 0 },
})
