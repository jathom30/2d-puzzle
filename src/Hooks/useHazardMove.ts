import { checkVoidPoints, get5050 } from 'Helpers'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  gridSizeAtom,
  nearestCharacterSelector,
  pieceEntersHouseAtom,
  piecePositionAtom,
  voidWallSpaceSelector,
} from 'State'
import { PositionType, SideType } from 'Types'

export const useHazardMove = () => {
  const gridSize = useRecoilValue(gridSizeAtom)
  const [heroHazardPos, setHeroHazardPos] = useRecoilState(
    piecePositionAtom({ kind: 'hazard', side: 'hero' }),
  )
  const [oppositeHazardPos, setOppositeHazardPos] = useRecoilState(
    piecePositionAtom({ kind: 'hazard', side: 'opposite' }),
  )
  const heroPos = useRecoilValue(
    piecePositionAtom({ kind: 'character', side: 'hero' }),
  )
  const heroItemPos = useRecoilValue(
    piecePositionAtom({ kind: 'item', side: 'hero' }),
  )
  const oppositeItemPos = useRecoilValue(
    piecePositionAtom({ kind: 'item', side: 'opposite' }),
  )
  const heroInHouse = useRecoilValue(pieceEntersHouseAtom('hero'))
  const oppositePos = useRecoilValue(
    piecePositionAtom({ kind: 'character', side: 'opposite' }),
  )
  const oppositeInHouse = useRecoilValue(pieceEntersHouseAtom('opposite'))
  const heroHazardAggro = useRecoilValue(nearestCharacterSelector('hero'))
  const oppositeHazardAggro = useRecoilValue(
    nearestCharacterSelector('opposite'),
  )
  const heroGoalPos = useRecoilValue(
    piecePositionAtom({ kind: 'goal', side: 'hero' }),
  )
  const oppositeGoalPos = useRecoilValue(
    piecePositionAtom({ kind: 'goal', side: 'opposite' }),
  )
  const wallSpaces = useRecoilValue(voidWallSpaceSelector)
  const voidSpaces = [
    heroGoalPos,
    oppositeGoalPos,
    ...wallSpaces,
    heroItemPos,
    oppositeItemPos,
  ]

  const stepTowards = (delta: number, coord: number) => {
    if (delta < 0) {
      return coord + gridSize
    }
    if (delta > 0) {
      return coord - gridSize
    }
    return coord
  }

  // find which char is closer to hazard that is not in a house
  const targetPos = (aggro: SideType) => {
    if (aggro === 'hero') {
      return heroInHouse ? oppositePos : heroPos
    }
    return oppositeInHouse ? heroPos : oppositePos
  }

  const moveHazard = (
    prevPos: PositionType,
    otherVoided: PositionType[],
    aggro: SideType,
  ) => {
    const { x, y } = prevPos
    const xDelta = x - targetPos(aggro).x
    const yDelta = y - targetPos(aggro).y
    const stepX = get5050()
    const xDirection = xDelta < 0 ? 'right' : 'left'
    const yDirection = yDelta < 0 ? 'down' : 'up'
    if (
      stepX &&
      checkVoidPoints(
        xDirection,
        prevPos,
        [...voidSpaces, ...otherVoided],
        gridSize,
      )
    ) {
      return {
        x: stepTowards(xDelta, x),
        y,
      }
    }
    if (
      checkVoidPoints(
        yDirection,
        prevPos,
        [...voidSpaces, ...otherVoided],
        gridSize,
      )
    ) {
      return {
        x,
        y: stepTowards(yDelta, y),
      }
    }
    return prevPos
  }

  useEffect(() => {
    setHeroHazardPos((prevPos) =>
      moveHazard(prevPos, [oppositeHazardPos], heroHazardAggro),
    )
  }, [heroPos, oppositePos])

  useEffect(() => {
    setOppositeHazardPos((prevPos) =>
      moveHazard(prevPos, [heroHazardPos], oppositeHazardAggro),
    )
  }, [heroPos, oppositePos])
}
