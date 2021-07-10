import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gridSizeAtom, piecePositionAtom, voidPositionsSelector } from 'State'
import { PositionType } from 'Types'

const checkMove = (
  key: 'w' | 's' | 'd' | 'a',
  charPos: PositionType,
  voidPos: PositionType[],
  gridSize: number,
) => {
  switch (key) {
    case 'w':
      return voidPos.some(
        (pos) => pos.y === charPos.y - gridSize && pos.x === charPos.x,
      )
    case 's':
      return voidPos.some(
        (pos) => pos.y === charPos.y + gridSize && pos.x === charPos.x,
      )
    case 'a':
      return voidPos.some(
        (pos) => pos.x === charPos.x - gridSize && pos.y === charPos.y,
      )
    case 'd':
      return voidPos.some(
        (pos) => pos.x === charPos.x + gridSize && pos.y === charPos.y,
      )
    default:
      return true
  }
}

const canMove = (voidPos: PositionType[], attemptedPos: PositionType) => {
  return voidPos.every(
    (pos) => pos.x !== attemptedPos.x && pos.y !== attemptedPos.y,
  )
}

export const useMove = () => {
  const voidPos = useRecoilValue(voidPositionsSelector)
  const [heroPos, setHeroPos] = useRecoilState(
    piecePositionAtom({ kind: 'character', side: 'hero' }),
  )
  const gridSize = useRecoilValue(gridSizeAtom)
  useEffect(() => {
    const handleMove = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
          setHeroPos({ x: 0, y: 0 })
          break
        default:
          return { x: 100, y: 100 }
      }
      return null
    }
    document.addEventListener('keypress', handleMove)
    return () => document.removeEventListener('keypress', handleMove)
  }, [])
}
