import { atom, selector } from 'recoil'

export const gridSizeAtom = atom({
  key: 'gridSize',
  default: 50,
})

export const windowBoundsAtom = atom({
  key: 'windowBounds',
  default: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
})

export const boundsSelector = selector({
  key: 'boundsSelector',
  get: ({ get }) => {
    const gridSize = get(gridSizeAtom)
    const gridSpan = (dim: number) => Math.floor(dim / gridSize) * gridSize
    const spacer = gridSize * 2
    const window = get(windowBoundsAtom)
    return {
      width: gridSpan(window.width - spacer),
      height: gridSpan(window.height - spacer),
    }
  },
})

export const gridCountSelector = selector({
  key: 'gridHeightSelector',
  get: ({ get }) => {
    const bounds = get(boundsSelector)
    const gridSize = get(gridSizeAtom)
    return {
      width: bounds.width / gridSize,
      height: bounds.height / gridSize,
    }
  },
})
