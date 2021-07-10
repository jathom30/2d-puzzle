import { randomOnGrid, wallCheck } from 'Helpers'
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

export const wallPositionSelector = selector({
  key: 'wallPositionSelector',
  get: ({ get }) => {
    const horizontal = get(wallHorizontalAtom)
    const bounds = get(boundsSelector)
    const gridSize = get(gridSizeAtom)
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
  },
})

export const wallHolePositionAtom = atom({
  key: 'wallHolePosition',
  default: { x: 0, y: 0 },
})
