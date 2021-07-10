import { atom, selector } from 'recoil'

export const gridSizeAtom = atom({
  key: 'gridSize',
  default: 40,
})

export const boundsSelector = selector({
  key: 'boundsSelector',
  get: ({ get }) => {
    const gridSize = get(gridSizeAtom)
    const gridSpan = (dim: number) => Math.floor(dim / gridSize) * gridSize
    const spacer = gridSize * 2
    return {
      width: gridSpan(document.documentElement.clientWidth - spacer),
      height: gridSpan(document.documentElement.clientHeight - spacer),
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
