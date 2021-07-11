import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  boundsSelector,
  gridSizeAtom,
  piecePositionAtom,
  voidPositionsSelector,
} from 'State'
import { PositionType } from 'Types'

export const useMove = () => {
  const voidPos = useRecoilValue(voidPositionsSelector)
  const setHeroPos = useSetRecoilState(
    piecePositionAtom({ kind: 'character', side: 'hero' }),
  )
  const setOppositePos = useSetRecoilState(
    piecePositionAtom({ kind: 'character', side: 'opposite' }),
  )
  const gridSize = useRecoilValue(gridSizeAtom)
  const bounds = useRecoilValue(boundsSelector)

  const checkBounds = (
    direction: 'up' | 'down' | 'left' | 'right',
    prevPos: PositionType,
  ) => {
    const { width, height } = bounds
    const { x, y } = prevPos
    switch (direction) {
      case 'up':
        return y !== 0
      case 'down':
        return y !== height - gridSize
      case 'left':
        return x !== 0
      case 'right':
        return x !== width - gridSize
      default:
        return true
    }
  }

  const checkVoidPoints = (
    direction: 'up' | 'down' | 'left' | 'right',
    prevPos: PositionType,
  ) => {
    const { x, y } = prevPos
    switch (direction) {
      case 'up':
        return !voidPos.some((pos) => pos.y === y - gridSize && pos.x === x)
      case 'down':
        return !voidPos.some((pos) => pos.y === y + gridSize && pos.x === x)
      case 'left':
        return !voidPos.some((pos) => pos.y === y && pos.x === x - gridSize)
      case 'right':
        return !voidPos.some((pos) => pos.y === y && pos.x === x + gridSize)
      default:
        return true
    }
  }

  const moveInDirection = (
    direction: 'up' | 'down' | 'left' | 'right',
    prevPos: PositionType,
  ) => {
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
      setHeroPos((prevPos) => {
        // check if they can move, then move
        // bounds, void spaces
        const direction = getDirection('hero')
        const isWithinBounds = checkBounds(direction, prevPos)
        const isNotVoid = checkVoidPoints(direction, prevPos)
        if (isWithinBounds && isNotVoid) {
          return moveInDirection(direction, prevPos)
        }
        return prevPos
      })
      setOppositePos((prevPos) => {
        const direction = getDirection('opposite')
        const isWithinBounds = checkBounds(direction, prevPos)
        const isNotVoid = checkVoidPoints(direction, prevPos)
        if (isWithinBounds && isNotVoid) {
          return moveInDirection(direction, prevPos)
        }
        return prevPos
      })
    }
    document.addEventListener('keypress', handleMove)
    return () => document.removeEventListener('keypress', handleMove)
  }, [voidPos])
}
