import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  boundsSelector,
  gridSizeAtom,
  pieceEntersHouseAtom,
  pieceHasItemAtom,
  sparkSideAtom,
  wallHolePositionAtom,
  wallHorizontalAtom,
  wallPositionSelector,
} from 'State'
import {
  WallPiece,
  HeroPiece,
  WallHolePiece,
  HeroItem,
  OppositeItem,
  HeroGoalPiece,
  OppositeGoalPiece,
  HeroHazardPiece,
  OppositeHazardPiece,
  // SparkPiece,
} from 'Components'
import './Board.scss'
import { OppositePiece } from 'Components/Pieces'
import { useMove, usePlacePiece } from 'Hooks'
import { randomOnGrid } from 'Helpers'
import { useHazardMove } from 'Hooks/useHazardMove'

export const Board = () => {
  const bounds = useRecoilValue(boundsSelector)
  const gridSize = useRecoilValue(gridSizeAtom)
  const backgroundStyles = {
    backgroundSize: `${gridSize * 2}px ${gridSize * 2}px`,
    backgroundPosition: `0px 0px, 0px ${gridSize}px, ${gridSize}px ${
      gridSize * -1
    }px, ${gridSize * -1}px 0px`,
  }

  const heroHasItem = useRecoilValue(pieceHasItemAtom('hero'))
  const oppositeHasItem = useRecoilValue(pieceHasItemAtom('opposite'))
  const heroInHouse = useRecoilValue(pieceEntersHouseAtom('hero'))
  const oppositeInHouse = useRecoilValue(pieceEntersHouseAtom('opposite'))

  const [heroPos, setHeroPos] = usePlacePiece('character', 'hero')
  const [oppositePos, setOppositePos] = usePlacePiece('character', 'opposite')
  const [, setHeroItemPos] = usePlacePiece('item', 'hero')
  const [, setOppositeItemPos] = usePlacePiece('item', 'opposite')
  const [, setHeroGoalPos] = usePlacePiece('goal', 'hero')
  const [, setOppositeGoalPos] = usePlacePiece('goal', 'opposite')
  const [, setHeroHazardPos] = usePlacePiece('hazard', 'hero')
  const [, setOppositeHazardPos] = usePlacePiece('hazard', 'opposite')
  const sparkSide = useRecoilValue(sparkSideAtom)
  const [, setSparkPos] = usePlacePiece('spark', sparkSide)

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
    setHeroHazardPos()
    setOppositeHazardPos()
    setSparkPos()
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
  useHazardMove()

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
      <HeroGoalPiece />
      <OppositeGoalPiece />
      {!heroInHouse && <HeroPiece />}
      {!oppositeInHouse && <OppositePiece />}
      {!heroHasItem && <HeroItem />}
      {!oppositeHasItem && <OppositeItem />}
      <HeroHazardPiece />
      <OppositeHazardPiece />
      {/* <SparkPiece /> */}
    </div>
  )
}

// TODO: Hazard tracking/movement?
// TODO: second wall and hole?
