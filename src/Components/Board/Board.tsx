import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  boundsSelector,
  gridSizeAtom,
  hazardIdsSelector,
  pieceEntersHouseAtom,
  pieceHasItemAtom,
  resetGameAtom,
  wallHolePositionAtom,
  wallHorizontalAtom,
  wallPositionAtom,
} from 'State'
import {
  WallPiece,
  CharacterPiece,
  WallHolePiece,
  ItemPiece,
  GoalPiece,
  HazardPiece,
} from 'Components'
import './Board.scss'
import { useMove, useResizeBounds } from 'Hooks'
import { createWallPos, randomOnGrid } from 'Helpers'

export const Board = () => {
  const reset = useRecoilValue(resetGameAtom)
  const bounds = useRecoilValue(boundsSelector)
  const gridSize = useRecoilValue(gridSizeAtom)
  const backgroundStyles = {
    backgroundSize: `${gridSize * 2}px ${gridSize * 2}px`,
    backgroundPosition: `0px 0px, 0px ${gridSize}px, ${gridSize}px ${
      gridSize * -1
    }px, ${gridSize * -1}px 0px`,
  }

  const hazardIds = useRecoilValue(hazardIdsSelector)

  const heroHasItem = useRecoilValue(pieceHasItemAtom('hero'))
  const oppositeHasItem = useRecoilValue(pieceHasItemAtom('opposite'))
  const heroInHouse = useRecoilValue(pieceEntersHouseAtom('hero'))
  const oppositeInHouse = useRecoilValue(pieceEntersHouseAtom('opposite'))

  const horizontalWall = useRecoilValue(wallHorizontalAtom)
  const setWallPos = useSetRecoilState(wallPositionAtom)
  const setWallHolePos = useSetRecoilState(wallHolePositionAtom)

  useEffect(() => {
    const wallPos = createWallPos(bounds, horizontalWall, gridSize)
    setWallPos(wallPos)
    setWallHolePos(() => {
      const max = (horizontalWall ? bounds.width : bounds.height) / gridSize
      const coord = randomOnGrid(gridSize, max, 0)
      const position = horizontalWall
        ? { x: coord, y: wallPos.y }
        : { x: wallPos.x, y: coord }
      return position
    })
  }, [reset])

  useMove()
  useResizeBounds()

  return (
    <div
      className="Board"
      style={{
        height: bounds.height,
        width: bounds.width,
        ...backgroundStyles,
      }}
    >
      <WallPiece />
      <WallHolePiece />
      <GoalPiece side="hero" />
      <GoalPiece side="opposite" />
      {!heroInHouse && <CharacterPiece side="hero" />}
      {!oppositeInHouse && <CharacterPiece side="opposite" />}
      {!heroHasItem && <ItemPiece side="opposite" />}
      {!oppositeHasItem && <ItemPiece side="hero" />}
      {hazardIds.map((id) => (
        <HazardPiece id={id} key={id} />
      ))}
    </div>
  )
}

// TODO: resize board on resize
// TODO: touch controls on mobile
