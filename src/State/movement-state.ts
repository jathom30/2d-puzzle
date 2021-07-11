import { selector } from 'recoil'
import { gridSizeAtom } from './board-state'
import {
  wallDimensionsSelector,
  wallHolePositionAtom,
  wallPositionSelector,
} from './wall-state'

export const voidPositionsSelector = selector({
  key: 'voidPositionsSelector',
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
    // console.log({ wallHolePos, wallPosFiltered })
    return wallPosFiltered
  },
})
