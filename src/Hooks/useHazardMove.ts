import {
  checkVoidPoints,
  get5050,
  getDistanceBetween,
  inSameSpace,
  withinRadius,
} from 'Helpers'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  gridSizeAtom,
  hazardPositionAtom,
  hazardRadiusSelector,
  nearestCharacterSelector,
  pieceEntersHouseAtom,
  piecePositionAtom,
  voidWallSpaceSelector,
} from 'State'
import { PositionType, SideType } from 'Types'

export const useHazardMove = (id: string) => {
  const gridSize = useRecoilValue(gridSizeAtom)
  const hazardRadius = useRecoilValue(hazardRadiusSelector)
  const setHazardPos = useSetRecoilState(hazardPositionAtom(id))
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
  const hazardAggro = useRecoilValue(nearestCharacterSelector(id))

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
    const xDirection = xDelta < 0 ? 'right' : 'left'
    const yDirection = yDelta < 0 ? 'down' : 'up'
    const canStepX = checkVoidPoints(
      xDirection,
      prevPos,
      [...voidSpaces, ...otherVoided],
      gridSize,
    )
    const canStepY = checkVoidPoints(
      yDirection,
      prevPos,
      [...voidSpaces, ...otherVoided],
      gridSize,
    )
    const nextStep = {
      x: canStepX ? stepTowards(xDelta, x) : prevPos.x,
      y: canStepY ? stepTowards(yDelta, y) : prevPos.y,
    }
    // if nextStep will be a voided space...
    // ...only move along one axis or the other so step stays valid
    const inVoidSpace = voidSpaces.some((space) => inSameSpace(space, nextStep))
    if (inVoidSpace) {
      if (get5050()) {
        return {
          x: prevPos.x,
          y: nextStep.y,
        }
      }
      return {
        x: nextStep.x,
        y: prevPos.y,
      }
    }
    // if nextStep is not to a void space, 50/50 chance of successful step
    // ! remove or greaten chance to make harder
    return get5050() ? nextStep : prevPos
  }

  const handleMove = (
    prevPos: PositionType,
    aggro: SideType,
    voidCoords: PositionType[],
  ) => {
    const delta = getDistanceBetween(targetPos(aggro), prevPos)
    const isClose = withinRadius(hazardRadius, delta)
    if (isClose) {
      return moveHazard(prevPos, voidCoords, aggro)
    }
    return prevPos
  }

  useEffect(() => {
    setHazardPos((prevPos) => handleMove(prevPos, hazardAggro, []))
  }, [heroPos, oppositePos])
}
