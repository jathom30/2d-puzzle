import { checkBounds, checkVoidPoints, get5050 } from 'Helpers'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  gridSizeAtom,
  nearestCharacterSelector,
  piecePositionAtom,
  voidWallSpaceSelector,
} from 'State'

export const useHazardMove = () => {
  const gridSize = useRecoilValue(gridSizeAtom)
  const setHeroHazardPos = useSetRecoilState(
    piecePositionAtom({ kind: 'hazard', side: 'hero' }),
  )
  const setOppositeHazardPos = useSetRecoilState(
    piecePositionAtom({ kind: 'hazard', side: 'opposite' }),
  )
  const heroPos = useRecoilValue(
    piecePositionAtom({ kind: 'character', side: 'hero' }),
  )
  const oppositePos = useRecoilValue(
    piecePositionAtom({ kind: 'character', side: 'opposite' }),
  )
  const heroHazardAggro = useRecoilValue(nearestCharacterSelector('hero'))
  const oppositeHazardAggro = useRecoilValue(
    nearestCharacterSelector('opposite'),
  )
  const wallSpaces = useRecoilValue(voidWallSpaceSelector)

  const stepTowards = (delta: number, coord: number) => {
    if (delta < 0) {
      return coord + gridSize
    }
    if (delta > 0) {
      return coord - gridSize
    }
    return coord
  }

  useEffect(() => {
    // find which char is closer to which hazard
    const targetPos = heroHazardAggro === 'hero' ? heroPos : oppositePos
    setHeroHazardPos((prevPos) => {
      const { x, y } = prevPos
      const xDelta = x - targetPos.x
      const yDelta = y - targetPos.y
      const stepX = get5050()
      const xDirection = xDelta < 0 ? 'right' : 'left'
      const yDirection = yDelta < 0 ? 'down' : 'up'
      if (stepX && checkVoidPoints(xDirection, prevPos, wallSpaces, gridSize)) {
        return {
          x: stepTowards(xDelta, x),
          y,
        }
      }
      if (checkVoidPoints(yDirection, prevPos, wallSpaces, gridSize)) {
        return {
          x,
          y: stepTowards(yDelta, y),
        }
      }
      return prevPos
    })
  }, [heroPos, oppositePos])

  useEffect(() => {
    // find which char is closer to which hazard
    const targetPos = oppositeHazardAggro === 'hero' ? heroPos : oppositePos
    setOppositeHazardPos((prevPos) => {
      const { x, y } = prevPos
      const xDelta = x - targetPos.x
      const yDelta = y - targetPos.y
      const stepX = get5050()
      const xDirection = xDelta < 0 ? 'right' : 'left'
      const yDirection = yDelta < 0 ? 'down' : 'up'
      if (stepX && checkVoidPoints(xDirection, prevPos, wallSpaces, gridSize)) {
        return {
          x: stepTowards(xDelta, x),
          y,
        }
      }
      if (checkVoidPoints(yDirection, prevPos, wallSpaces, gridSize)) {
        return {
          x,
          y: stepTowards(yDelta, y),
        }
      }
      return prevPos
    })
  }, [heroPos, oppositePos])
}
