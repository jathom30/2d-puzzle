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
  wallPositionSelector,
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
import { useMove, usePlacePiece } from 'Hooks'
import { randomOnGrid } from 'Helpers'

export const Board = () => {
  // const reset = useRecoilValue(resetGameAtom)
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

  const [heroPos, setHeroPos] = usePlacePiece({
    kind: 'character',
    side: 'hero',
  })
  const [oppositePos, setOppositePos] = usePlacePiece({
    kind: 'character',
    side: 'opposite',
  })
  const [, setHeroItemPos] = usePlacePiece({ kind: 'item', side: 'hero' })
  const [, setOppositeItemPos] = usePlacePiece({
    kind: 'item',
    side: 'opposite',
  })
  const [, setHeroGoalPos] = usePlacePiece({ kind: 'goal', side: 'hero' })
  const [, setOppositeGoalPos] = usePlacePiece({
    kind: 'goal',
    side: 'opposite',
  })

  const horizontalWall = useRecoilValue(wallHorizontalAtom)
  const wallPos = useRecoilValue(wallPositionSelector)
  const axis = horizontalWall ? 'x' : 'y'
  const setWallHolePos = useSetRecoilState(wallHolePositionAtom)

  // initial piece placement
  useEffect(() => {
    setHeroPos()
    setOppositePos()
    setHeroItemPos()
    setOppositeItemPos()
    setHeroGoalPos()
    setOppositeGoalPos()
    setWallHolePos(() => {
      const posTest = (test: boolean) =>
        test ? heroPos[axis] : oppositePos[axis]
      const min = posTest(heroPos[axis] >= oppositePos[axis]) / gridSize
      const max = posTest(heroPos[axis] <= oppositePos[axis]) / gridSize
      const coord = randomOnGrid(gridSize, max, min)
      const position = horizontalWall
        ? { x: coord, y: wallPos.y }
        : { x: wallPos.x, y: coord }
      return position
    })
  }, [])

  useMove()

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
      {/* <HazardPiece side="hero" />
      <HazardPiece side="opposite" /> */}
    </div>
  )
}

// TODO: resize board on resize
// TODO: reset fix
