import { checkBounds, checkVoidPoints, inSameSpace } from 'Helpers'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  boundsSelector,
  gridSizeAtom,
  moveCountAtom,
  pieceEntersHouseAtom,
  pieceHasItemAtom,
  piecePositionAtom,
  voidPositionsSelector,
  loseConditionSelector,
  winConditionSelector,
  readyGameSelector,
} from 'State'
import { DirectionType, PositionType } from 'Types'

export const useMove = () => {
  const gameIsReady = useRecoilValue(readyGameSelector)
  const [lastDirection, setLastDirection] = useState<DirectionType>()
  const voidHeroPos = useRecoilValue(voidPositionsSelector('hero'))
  const voidOppositePos = useRecoilValue(voidPositionsSelector('opposite'))
  const setMoveCount = useSetRecoilState(moveCountAtom)
  const [heroPos, setHeroPos] = useRecoilState(
    piecePositionAtom({ kind: 'character', side: 'hero' }),
  )
  const heroGoalPos = useRecoilValue(
    piecePositionAtom({ kind: 'goal', side: 'hero' }),
  )
  const oppositeGoalPos = useRecoilValue(
    piecePositionAtom({ kind: 'goal', side: 'opposite' }),
  )
  const setHeroInHouse = useSetRecoilState(pieceEntersHouseAtom('hero'))
  const setOppositeInHouse = useSetRecoilState(pieceEntersHouseAtom('opposite'))
  const [oppositePos, setOppositePos] = useRecoilState(
    piecePositionAtom({ kind: 'character', side: 'opposite' }),
  )
  const heroItemPos = useRecoilValue(
    piecePositionAtom({ kind: 'item', side: 'opposite' }),
  )
  const oppositeItemPos = useRecoilValue(
    piecePositionAtom({ kind: 'item', side: 'hero' }),
  )
  const setHeroHasItem = useSetRecoilState(pieceHasItemAtom('hero'))
  const setOppositeHasItem = useSetRecoilState(pieceHasItemAtom('opposite'))
  const winCondition = useRecoilValue(winConditionSelector)
  const loseCondition = useRecoilValue(loseConditionSelector)
  const gridSize = useRecoilValue(gridSizeAtom)
  const bounds = useRecoilValue(boundsSelector)

  const moveInDirection = (direction: DirectionType, prevPos: PositionType) => {
    const axis = direction === 'up' || direction === 'down' ? 'y' : 'x'
    const offAxis = axis === 'x' ? 'y' : 'x'
    const increase = direction === 'down' || direction === 'right'
    const increaseBy = increase ? gridSize : -gridSize
    const newCoord = prevPos[axis] + increaseBy
    const newPos = {
      [offAxis]: prevPos[offAxis],
      [axis]: newCoord,
    }
    return newPos as PositionType
  }

  useEffect(() => {
    const handleMove = (e: KeyboardEvent) => {
      if (!(winCondition && loseCondition)) {
        setMoveCount((prevCount) => prevCount + 1)
      }
      const getDirection = (char: 'hero' | 'opposite') => {
        const hero = char === 'hero'
        switch (e.key) {
          case 'w':
            return hero ? 'up' : 'down'
          case 's':
            return hero ? 'down' : 'up'
          case 'a':
            return hero ? 'left' : 'right'
          case 'd':
            return hero ? 'right' : 'left'
          default:
            return hero ? 'down' : 'up'
        }
      }
      setLastDirection(getDirection('hero'))
      setHeroPos((prevPos) => {
        // check if they can move, then move
        // bounds, void spaces
        const direction = getDirection('hero')
        const isWithinBounds = checkBounds(direction, prevPos, bounds, gridSize)
        const isNotVoid = checkVoidPoints(
          direction,
          prevPos,
          voidHeroPos,
          gridSize,
        )
        if (isWithinBounds && isNotVoid) {
          return moveInDirection(direction, prevPos)
        }
        return prevPos
      })
      setOppositePos((prevPos) => {
        const direction = getDirection('opposite')
        const isWithinBounds = checkBounds(direction, prevPos, bounds, gridSize)
        const isNotVoid = checkVoidPoints(
          direction,
          prevPos,
          voidOppositePos,
          gridSize,
        )
        if (isWithinBounds && isNotVoid) {
          return moveInDirection(direction, prevPos)
        }
        return prevPos
      })
    }
    document.addEventListener('keypress', handleMove)
    return () => document.removeEventListener('keypress', handleMove)
  }, [voidHeroPos, voidOppositePos])

  // characters cannot move into same space as one another...
  // ...they also will clip into each other
  useEffect(() => {
    if (lastDirection) {
      if (inSameSpace(heroPos, oppositePos)) {
        switch (lastDirection) {
          case 'up':
            setHeroPos((prevPos) => moveInDirection('down', prevPos))
            setOppositePos((prevPos) => moveInDirection('up', prevPos))
            break
          case 'down':
            setHeroPos((prevPos) => moveInDirection('up', prevPos))
            setOppositePos((prevPos) => moveInDirection('down', prevPos))
            break
          case 'left':
            setHeroPos((prevPos) => moveInDirection('right', prevPos))
            setOppositePos((prevPos) => moveInDirection('left', prevPos))
            break
          case 'right':
            setHeroPos((prevPos) => moveInDirection('left', prevPos))
            setOppositePos((prevPos) => moveInDirection('right', prevPos))
            break
          default:
            break
        }
      }
    }
  }, [heroPos, oppositePos])

  // check if character stands in same spot as its item
  useEffect(() => {
    const atZeroZero =
      inSameSpace(heroPos, { x: 0, y: 0 }) &&
      inSameSpace(heroItemPos, { x: 0, y: 0 })
    if (!atZeroZero && inSameSpace(heroPos, heroItemPos)) {
      setHeroHasItem(true)
    }
  }, [heroPos, heroItemPos])

  useEffect(() => {
    const atZeroZero =
      inSameSpace(oppositePos, { x: 0, y: 0 }) &&
      inSameSpace(oppositeItemPos, { x: 0, y: 0 })
    if (!atZeroZero && inSameSpace(oppositePos, oppositeItemPos)) {
      setOppositeHasItem(true)
    }
  }, [oppositePos, oppositeItemPos])

  // check if character enters house
  useEffect(() => {
    if (gameIsReady && inSameSpace(heroPos, heroGoalPos)) {
      setHeroInHouse(true)
    }
  }, [heroPos])
  useEffect(() => {
    if (gameIsReady && inSameSpace(oppositePos, oppositeGoalPos)) {
      setOppositeInHouse(true)
    }
  }, [oppositePos])
}
